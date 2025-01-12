from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from models.user import GenderEnum, Role

class UserSchema(BaseModel):
    email: str
    password: str
    role: Role
    
class CustomerResponseSchema(BaseModel):
    customer_id: Optional[str] = None
    name: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    created_at: Optional[datetime] = None
    date_of_birth: Optional[datetime] = None
    gender: Optional[GenderEnum] = None
    avatar_url: Optional[str] = None

