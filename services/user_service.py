from models.user import UserRole
from schemas.user_schema import UserSchema
from db.database import db
from schemas.admin_schema import *
from services.time_service import *

# Get customers by phone number   
async def get_customers_by_phone_number(phone_number: str):
    customers = db["user"]
    cursor = customers.find({"phone_number": phone_number})
    
    return await cursor.to_list(length=None)

# Find user/shipper by email
async def find_user_by_email(email: str):
    user = await db["user"].find_one({"email": email})
    shipper = await db["shipper"].find_one({"email": email})
    if user:
        return user
    elif shipper:
        return shipper
    else:
        return None
    
# Insert all kinds of users into database
async def create_user(user: UserSchema):
    if user.role == UserRole.shipper:
        await db["shipper"].insert_one(user.model_dump(by_alias=True))
    else:
        await db["user"].insert_one(user.model_dump(by_alias=True))
    
    
