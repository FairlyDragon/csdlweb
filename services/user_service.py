from schemas.user_schema import CustomerResponseSchema
from db.database import db
from schemas.admin_schema import *
from services.time_service import *

# Get customers by phone number   
async def get_customers_by_phone_number(phone_number: str):
    customers = db["user"]
    cursor = customers.find({"phone_number": phone_number, "role": "customer"})
    
    return await cursor.to_list(length=None)

# Get customers
async def get_customers() -> list[dict]:
    # get customers from db
    customers = await db["user"].find({"role": "customer"}).to_list(length=None)
    if not customers:
        raise HTTPException(status_code=404, detail="No customers found")
    
    return customers

# Get order history by customer id
async def get_order_history_by_customer_id(customer_id: str) -> list[dict]:
    order_history = await db["order"].find({"user_id": customer_id}).to_list(length=None)
    if not order_history:
        raise HTTPException(status_code=404, detail="No order history found")
    
    return order_history
