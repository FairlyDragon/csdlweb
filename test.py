from middlewares.auth_middleware import setup_auth_middleware
from middlewares.cors_middleware import setup_cors
from fastapi import APIRouter, FastAPI
from db.database import DB_NAME, db, client
from routes.admin_routes import router as admin_router
from routes.auth_routes import router as auth_router
from routes.shipper_routes import router as shipper_router
from routes.user_routes import router as customer_router
from datetime import datetime, timedelta    

from models.voucher import Voucher # to test
from models.review import Review # to test
from models.user import GenderEnum, User # to test
from services.auth_service import hash_password # to test
from utils.rbac import oauth2_scheme # to test
# from middlewares.error_middleware import error_handler
from fastapi.openapi.utils import get_openapi

from logging_config import logger  # to test

app = FastAPI()


# setup cors
setup_cors(app)

# setup auth middleware
setup_auth_middleware(app)

# setup error handling middleware
# app.middleware("http")(error_handler)

router = APIRouter()
router.include_router(admin_router, prefix="/admin", tags=["admin"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(shipper_router, prefix="/shipper", tags=["shipper"])
router.include_router(customer_router, prefix="/customer", tags=["customer"])

app.include_router(router)

#### Config Swagger UI to render "Authorization" button
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Your API",
        version="1.0.0",
        description="API description",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
#####


sample_reviews = [
    {"user_id": "u1", "menuitem_id": "m1", "rating": 5, "comment": "Delicious pizza!", "review_date": datetime.now()},
    {"user_id": "u2", "menuitem_id": "m1", "rating": 4, "comment": "Great service!", "review_date": datetime.now()},
    {"user_id": "u2", "menuitem_id": "m1", "rating": 4, "comment": "Excellent taste!", "review_date": "2025-01-09T16:03:32.532738"},
    {"user_id": "u2", "menuitem_id": "m2", "rating": 5, "comment": "Fast delivery!", "review_date": "2025-01-09T16:03:32.532747"},
    {"user_id": "u1", "menuitem_id": "m1", "rating": 2, "comment": "Delicious food!", "review_date": "2025-01-09T16:03:32.532751"},
    {"user_id": "u2", "menuitem_id": "m1", "rating": 1, "comment": "Could be better.", "review_date": "2025-01-09T16:03:32.532754"},
    {"user_id": "u2", "menuitem_id": "m1", "rating": 5, "comment": "Fast delivery!", "review_date": "2025-01-09T16:03:32.532758"},
    {"user_id": "u2", "menuitem_id": "m1", "rating": 4, "comment": "Not bad!", "review_date": "2025-01-09T16:03:32.532761"},
    {"user_id": "u2", "menuitem_id": "m1", "rating": 3, "comment": "Could be better.", "review_date": "2025-01-09T16:03:32.532765"},
    {"user_id": "u2", "menuitem_id": "m1", "rating": 5, "comment": "Will order again!", "review_date": "2025-01-09T16:03:32.532768"},
]
sample_reviews = [Review(**review).model_dump(by_alias=True) for review in sample_reviews]

sample_users = [
    {"_id": "u1", "name": "John Doe", "email": "cus1@gmail.com", "password": hash_password("cus1"), "gender": GenderEnum.MALE, "date_of_birth": "1990-01-01",
     "phone_number": "1234567890", "address": "123 Main St", "created_at": datetime.now(), "role": "customer", "avatar_url": "https://drive.google.com/thumbnail?id=1IJtNeDhOc8MhoILEqXZXqr7HhbEehPeA"},
    {"_id": "u2", "name": "Jane Smith", "email": "cus2@gmail.com", "password": hash_password("cus2"), "gender": GenderEnum.FEMALE, "date_of_birth": "1999-06-01",
     "phone_number": "0987654321", "address": "456 Elm St", "created_at": datetime.now(), "role": "customer", "avatar_url": "https://drive.google.com/thumbnail?id=1cPevppEiYK5OViXtAZOTJqN9IfW3X6eq"},
    {"_id": "u3", "name": "I AM ADMIN", "email": "admin@admin.com", "password": hash_password("admin"), "gender": GenderEnum.MALE, "date_of_birth": "1999-06-01",
     "phone_number": "0987654321", "address": "456 Elm St", "created_at": datetime.now(), "role": "admin", "avatar_url": "https://drive.google.com/thumbnail?id=1cPevppEiYK5OViXtAZOTJqN9IfW3X6eq"},
]

sample_vouchers = [
    {"_id": "v1", "code": "DISCOUNT10", "discount_percentage": 10.0, "start_date": datetime.now(),
     "end_date": datetime.now() + timedelta(days=30), "minimum_order_amount": 50.0, "total_usage_limit": 100, "used": 0},
    {"_id": "v2", "code": "SUMMER10", "discount_percentage": 8.0, "start_date": datetime.now(),
     "end_date": datetime.now() + timedelta(days=30), "minimum_order_amount": 45.0, "total_usage_limit": 60, "used": 0},
]
sample_voucherss = [Voucher(**voucher).model_dump(by_alias=True) for voucher in sample_vouchers]

sample_orders = [
    {"_id": "o1", "user_id": "u1", "order_date": datetime.now(), "total_amount": 100.0, "status": "completed",
     "note": "Leave at the door", "voucher_id": "v1", "discount_applied": 10.0, "delivery_fee": 1.0,
     "order_items": [{"menuitem_id": "m1", "quantity": 2, "subtotal": 40.0}]},
    
    {"_id": "o2", "user_id": "u2", "order_date": datetime.now(), "total_amount": 50.0, "status": "pending", "note": "You are my destiny", "voucher_id": "v1", "discount_applied": 5.0, "delivery_fee": 2.0, "order_items": [{"menuitem_id": "m1", "quantity": 1, "subtotal": 20.0}, {"menuitem_id": "m2", "quantity": 1, "subtotal": 20.0}]},
    
    {"_id": "o3", "user_id": "u1", "order_date": datetime.now(), "total_amount": 70.0, "status": "canceled", "note": "This is a note", "voucher_id": "v1", "discount_applied": 5.0, "delivery_fee": 2.5, "order_items": [{"menuitem_id": "m1", "quantity": 1, "subtotal": 20.0}]},
    
    {"_id": "o4", "user_id": "u3", "order_date": datetime.now(), "total_amount": 70.0, "status": "processing", "note": "You are hehe", "voucher_id": "v2", "discount_applied": 5.0, "delivery_fee": 2.5, "order_items": [{"menuitem_id": "m1", "quantity": 1, "subtotal": 20.0}]},
]

sample_payments = [
    {"_id": "p1", "order_id": "o1", "payment_method": "cod", "amount": 90.0,
     "created_at": datetime.now(), "status": "success"},
    {"_id": "p2", "order_id": "o2", "payment_method": "stripe", "amount": 100.0,
     "created_at": datetime.now(), "status": "success"},
    {"_id": "p3", "order_id": "o3", "payment_method": "cod", "amount": 100.0,
     "created_at": datetime.now(), "status": "success"},
    {"_id": "p4", "order_id": "o4", "payment_method": "cod", "amount": 100.0,
     "created_at": datetime.now(), "status": "success"},
]

sample_menu_items = [
    {"_id": "m1", "name": "Pizza", "description": "Delicious cheese pizza", "price": 20.0,
     "category": "Main Course", "average_rating": 4.5, "discount": None, "is_active": True,
     "image_url": "https://drive.google.com/thumbnail?id=18Szt2GUkFNpRcSEtIo0VGJa5jbIY5Jux"},
]

sample_order_deliveries = [
    {"_id": "d1", "order_id": "o1", "shipper_id": "s1", "delivery_status": "delivered"},
    {"_id": "d2", "order_id": "o2", "shipper_id": "s2", "delivery_status": "delivering"},
    {"_id": "d3", "order_id": "o3", "shipper_id": "s1", "delivery_status": "delivering"},
]

sample_shippers = [
    {"_id": "s1", "name": "Fast Delivery", "phone_number": "9876543210", "total_amount": 5000.0, "email": "fastdeliverys1@gmail.com", "password": "hashed_password1", "address": "123 Main St", "created_at": datetime.now(), "date_of_birth": datetime.now(), "gender": "Male", "avatar_url": "https://drive.google.com/thumbnail?id=1IJtNeDhOc8MhoILEqXZXqr7HhbEehPeA", "role": "shipper", "account_status": "active"},
    {"_id": "s2", "name": "Fast Delivery2", "phone_number": "0987654321", "total_amount": 5099.0, "email": "fastdeliverys2@gmail.com", "password": "hashed_password2", "address": "456 Elm St", "created_at": datetime.now(), "date_of_birth": datetime.now(), "gender": "Female", "avatar_url": "https://drive.google.com/thumbnail?id=1cPevppEiYK5OViXtAZOTJqN9IfW3X6eq", "role": "shipper","account_status": "active"},
]



@app.on_event("startup")
async def startup_event():
    # Create collections and insert sample data
    await db["voucher"].insert_many(sample_voucherss)
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
    logger.info("Shutdown event triggered")
    # Drop the database on server shutdown
    await client.drop_database(DB_NAME)
    logger.info("Database dropped")

