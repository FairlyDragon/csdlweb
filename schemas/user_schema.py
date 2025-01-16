from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from models.order import OrderItem
from models.user import GenderEnum, Role

class UserSchema(BaseModel):
    email: str
    password: str
    role: Role
    id: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "cuscus@gmail.com",
                "password": "cus1",
                "role": "customer"
            }
        }
    
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


class CreateOrderSchema(BaseModel):
    # order_date: datetime
    order_items: List[OrderItem]
    note: Optional[str] = None
    voucher_code: Optional[str] = None
    total_amount: float
    delivery_fee: float
    
    class Config:
        json_schema_extra = {
            "example": {
                "order_items": [
                    {
                        "menuitem_id": "m1",
                        "quantity": 2,
                        "subtotal": 40.0
                    },
                    {
                        "menuitem_id": "m2",
                        "quantity": 1,
                        "subtotal": 20.0
                    }
                ],
                "note": "Leave at the door",
                "voucher_code": "SUMMER10",
                "total_amount": 105.0,
                "delivery_fee": 1.0
            }
        }
