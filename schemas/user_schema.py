from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from models.user import GenderEnum, Role

class UserSchema(BaseModel):
    email: str
    password: str
    role: Role
    id: Optional[str] = None
    
class CustomerResponseSchema(BaseModel):
    customer_id: Optional[str] = None
    name: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    address: Optional[str] = None
    created_at: Optional[datetime] = None
    date_of_birth: Optional[datetime] = None
    gender: Optional[GenderEnum] = None
    avatar_url: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "customer_id": "u1",
                "name": "John Doe",
                "phone_number": "123456789",
                "email": "johndoe@example.com",
                "password": "password",
                "address": "123 Main St",
                "created_at": "2023-06-01T12:00:00",
                "date_of_birth": "1990-01-01",
                "gender": "Male",                
                "avatar_url": "https://example.com/avatar.jpg"
            }
        }   

