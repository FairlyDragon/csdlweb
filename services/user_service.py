from models.shipper import Shipper
from models.user import User
from models.user import UserRole
from schemas.user_schema import UserSchema
from db.database import db
from schemas.admin_schema import *
from services.time_service import *


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
    
    

# Get customers
async def get_customers() -> list[dict]:
    # get customers from db
    customers = await db["user"].find({"role": "customer"}).to_list(length=None)
    if not customers:
        raise HTTPException(status_code=404, detail="No customers found")
    
    return customers

