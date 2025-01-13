from typing import Optional
import bcrypt
from fastapi import HTTPException
from jose import jwt, JWTError
from datetime import datetime, timedelta
from utils.roles import Role
from schemas.user_schema import UserSchema
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from services.user_service import find_user_by_email, create_user
from db.database import db

# Hash password
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# Create access token
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Signup user
async def signup_user(user_data: dict) -> dict:
    if await find_user_by_email(user_data["email"]):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data["password"] = hash_password(user_data["password"])
    created_user = await create_user(user_data)
    if created_user:
        raise HTTPException(status_code=200, detail="User created successfully")
    else:
        raise HTTPException(status_code=400, detail="Failed to create user")

# Authenticate user
async def authenticate_user(email: str, password: str) -> str:
    user = await find_user_by_email(email)
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return create_access_token(data={"sub": user.email, "role": user.role})

# Update password in database
async def update_password_in_db(email: str, new_password: str, role: str):
    inserted_password = hash_password(new_password)
    if role in [Role.CUSTOMER, Role.ADMIN, Role.SUPERADMIN]:
        updated_data = await db["user"].update_one({"email": email}, {"$set": {"password": inserted_password}})
    elif role == "shipper":
        updated_data = await db["shipper"].update_one({"email": email}, {"$set": {"password": inserted_password}})
    else:
        raise HTTPException(status_code=400, detail=f"Invalid role: {role}")

    return updated_data.modified_count

# Get user from token
async def get_user_from_token(token: str) -> UserSchema:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            raise JWTError
        
        user = await find_user_by_email(user_email)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
    
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
