import bcrypt
from models.shipper import Shipper
from models.user import User
from utils.roles import Role
from schemas.user_schema import UserSchema
from db.database import db
from schemas.admin_schema import *
from services.time_service import *

from logging_config import logger

# Find user/shipper by email
async def find_user_by_email(email: str) -> Optional[UserSchema]:
    user = await db["user"].find_one({"email": email})
    shipper = await db["shipper"].find_one({"email": email})
    if user:
        return UserSchema(email=email, role=user["role"], password=user["password"], id=user["_id"])
    elif shipper:
        return UserSchema(email=email, role=shipper["role"], password=shipper["password"], id=shipper["_id"])
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

# Get customers infor by id
async def find_customer_by_id(customer_id: str) -> User:
    # get customer from db
    customer = await db["user"].find_one({"_id": customer_id})
    if not customer or customer["role"] != Role.CUSTOMER:
        raise HTTPException(status_code=404, detail="No customers found")
    
    return customer

# Get user infor by id
async def find_user_by_id(user_id: str) -> User:
    # get user from db
    user = await db["user"].find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="No user found")
    
    return user

# Update user in db
async def update_user_in_db_by_id(user_id: str, user: dict) -> dict:   # user: User
    # Hash password before inserting into db
    if user["password"]:
        user.update({"password": hash_password_local(user["password"])})
        
    updated_user = await db["user"].update_one({"_id": user_id}, {"$set": user})
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return updated_user.modified_count

# Delete user in db
async def delete_user_in_db_by_id(user_id: str) -> int:
    result = await db["user"].delete_one({"_id": user_id})
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    
    return result.deleted_count

def hash_password_local(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


# Check if this is not 'me'
def is_me(passed_id: str, current_user: UserSchema) -> str:
    # Id of the current user is really 'me'
    if passed_id.lower() == "me":
        passed_id = current_user.id
        
    # Check if the customer_id is the same as the current user. 
    # This handles the case when the customer trying to access another customer's profile by passing the customer_id in the url instead of "me"
    if passed_id != current_user.id:
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    
    return True
