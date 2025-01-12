import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from services.user_service import find_user_by_email, create_user
from db.database import db

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def signup_user(user_data: dict) -> dict:
    if await find_user_by_email(user_data["email"]):
        return {"error": "Email already registered"}
    
    user_data["password"] = hash_password(user_data["password"])
    created_user = await create_user(user_data)
    if created_user:
        return {"message": "User created successfully"}
    else:
        return {"error": "Failed to create user"}

async def authenticate_user(email: str, password: str) -> str:
    user = await find_user_by_email(email)
    if not user or not verify_password(password, user["password"]):
        return None
    
    return create_access_token(data={"sub": user["email"], "role": user["role"]})

# Update password in database
async def update_password_in_db(email: str, new_password: str, role: str):
    inserted_password = hash_password(new_password)
    if role == "customer" or role == "admin":
        updated_data = await db["user"].update_one({"email": email}, {"$set": {"password": inserted_password}})
    elif role == "shipper":
        updated_data = await db["shipper"].update_one({"email": email}, {"$set": {"password": inserted_password}})
    else:
        raise ValueError(f"Invalid role: {role}")

    return updated_data.modified_count

