from models.shipper import Shipper
from models.user import User
from utils.roles import Role
from schemas.user_schema import UserSchema
from db.database import db
from schemas.admin_schema import *
from services.time_service import *


# Find user/shipper by email
async def find_user_by_email(email: str) -> Optional[UserSchema]:
    user = await db["user"].find_one({"email": email})
    shipper = await db["shipper"].find_one({"email": email})
    if user:
        return UserSchema(email=email, role=user["role"], password=user["password"])
    elif shipper:
        return UserSchema(email=email, role=shipper["role"], password=shipper["password"])
    else:
        return None
    
# Insert all kinds of users into database
async def create_user(user: dict) -> dict:  
    if user["role"] == Role.SHIPPER:
        user_model_to_insert_into_db = Shipper(**user)
        inserted_user = await db["shipper"].insert_one(user_model_to_insert_into_db.model_dump(by_alias=True))
    elif user["role"] == Role.CUSTOMER:
        user_model_to_insert_into_db = User(**user)
        inserted_user = await db["user"].insert_one(user_model_to_insert_into_db.model_dump(by_alias=True))
    else:
        raise HTTPException(status_code=400, detail="Invalid user role")
        
    return inserted_user
    
    

# Get customers from 'user' in db
async def get_customers() -> list[dict]:
    # get customers from db
    customers = await db["user"].find({"role": "customer"}).to_list(length=None)
    if not customers:
        raise HTTPException(status_code=404, detail="No customers found")
    
    return customers


# Get customers infor by order_id
async def get_customer_infor_by_order_id(order_id: str) -> User:
    order = await db["order"].find_one({"_id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="No order found")
    
    # get customers from db
    customer = await db["user"].find_one({"_id": order["user_id"]})
    if not customer:
        raise HTTPException(status_code=404, detail="No customers found")
    
    return customer
