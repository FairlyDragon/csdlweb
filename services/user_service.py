from app.config.database import db
from app.schemas.admin_schema import *
from app.services.time_service import *

# Get customers by phone number   
async def get_customers_by_phone_number(phone_number: str):
    customers = db["user"]
    cursor = customers.find({"phone_number": phone_number})
    
    return await cursor.to_list(length=None)
