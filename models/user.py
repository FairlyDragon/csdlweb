from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from uuid import uuid4
from enum import Enum

class UserRole(str, Enum): 
    customer = "customer" 
    shipper = "shipper" 
    admin = "admin"
    
class User(BaseModel): 
    user_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    name: str 
    email: Optional[EmailStr] = None
    password: str 
    phone_number: str 
    address: Optional[str] = None 
    created_at: datetime = Field(default_factory=datetime.now)
    role: UserRole

