from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from models.user import GenderEnum, UserRole

class UserSchema(BaseModel):
    username: str
    email: str
    password: str
    role: UserRole
    
class CustomerResponseSchema(BaseModel):
    customer_id: Optional[str] = None
    name: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    created_at: Optional[datetime] = None
    date_of_birth: Optional[datetime] = None
    gender: Optional[GenderEnum] = None
    avatar_url: Optional[str] = None

