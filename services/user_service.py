from models.shipper import Shipper
from models.user import User
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
async def create_user(user: dict) -> dict:  
    if user["role"] == UserRole.shipper:
        user_model_to_insert_into_db = Shipper(**user)
        inserted_user = await db["shipper"].insert_one(user_model_to_insert_into_db.model_dump(by_alias=True))
    elif user["role"] == UserRole.customer:
        user_model_to_insert_into_db = User(**user)
        inserted_user = await db["user"].insert_one(user_model_to_insert_into_db.model_dump(by_alias=True))
    else:
        raise HTTPException(status_code=400, detail="Invalid user role")
        
    return inserted_user
    
    
