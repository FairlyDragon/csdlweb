from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
import uuid
from enum import Enum

class OrderItem(BaseModel):
    menuitem_id: str
    quantity: int
    subtotal: float
    
class OrderStatus(str, Enum):
    accepted = "accepted"
    canceled = "canceled"
    
class Order(BaseModel):
    order_id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id") 
    user_id: str 
    order_date: datetime = Field(default_factory=datetime.now) 
    order_items: List[OrderItem]
    total_amount: float 
    status: str 
    note: Optional[str] = None 
    voucher_id: Optional[str] = None 
    discount_applied: Optional[float] = None
    
    