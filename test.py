from middlewares.cors_middleware import setup_cors
from fastapi import APIRouter, FastAPI
from db.database import DB_NAME, db, client
from routes.admin_routes import router as admin_router
from datetime import datetime, timedelta    

app = FastAPI()

setup_cors(app)

sample_reviews = [
    {"review_id": "r1", "user_id": "u1", "menuitem_id": "m1", "rating": 5, "comment": "Delicious pizza!", "review_date": datetime.now()},
    {"review_id": "r2", "user_id": "u2", "menuitem_id": "m2", "rating": 4, "comment": "Great service!", "review_date": datetime.now()},
]

sample_users = [
    {"user_id": "u1", "name": "John Doe", "email": "john@example.com", "password": "hashed_password1",
     "phone_number": "1234567890", "address": "123 Main St", "created_at": datetime.now(), "role": "customer"},
    {"user_id": "u2", "name": "Jane Smith", "email": "jane@example.com", "password": "hashed_password2",
     "phone_number": "0987654321", "address": "456 Elm St", "created_at": datetime.now(), "role": "customer"},
]

sample_vouchers = [
    {"code": "DISCOUNT10", "discount_percentage": 10.0, "start_date": datetime.now(),
     "end_date": datetime.now() + timedelta(days=30), "minimum_order_amount": 50.0, "total_usage_limit": 100, "used": 0},
]

sample_orders = [
    {"order_id": "o1", "user_id": "u1", "order_date": datetime.now(), "total_amount": 100.0, "status": "accepted",
     "note": "Leave at the door", "voucher_id": "v1", "discount_applied": 10.0,
     "order_items": [{"menuitem_id": "m1", "quantity": 2, "subtotal": 40.0}]},
]

sample_payments = [
    {"payment_id": "p1", "order_id": "o1", "payment_method": "credit_card", "amount": 90.0,
     "created_at": datetime.now(), "status": "success"},
]

sample_menu_items = [
    {"_id": "m1", "name": "Pizza", "description": "Delicious cheese pizza", "price": 20.0,
     "category": "Main Course", "average_rating": 4.5, "discount": None, "is_active": True,
     "image_url": "http://example.com/pizza.jpg"},
]

sample_order_deliveries = [
    {"delivery_id": "d1", "order_id": "o1", "shipper_id": "s1", "delivery_status": "delivered"},
]

sample_shippers = [
    {"shipper_id": "s1", "name": "Fast Delivery", "phone_number": "9876543210", "total_amount": 5000.0},
]



router = APIRouter()
router.include_router(admin_router, prefix="/admin", tags=["admin"])

@app.on_event("startup")
async def startup_event():
    # Create collections and insert sample data
    await db["voucher"].insert_many(sample_vouchers)
    await db["user"].insert_many(sample_users)
    await db["review"].insert_many(sample_reviews)
    await db["order"].insert_many(sample_orders)
    await db["payment"].insert_many(sample_payments)
    await db["menuitem"].insert_many(sample_menu_items)
    await db["order_delivery"].insert_many(sample_order_deliveries)
    await db["shipper"].insert_many(sample_shippers)
    # Ensure to insert sample data for other collections as necessary

@app.on_event("shutdown")
async def shutdown_event():
    # Drop the database on server shutdown
    await client.drop_database(DB_NAME)

app.include_router(router)