from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
import uuid
from enum import Enum

class OrderItem(BaseModel):
    menuitem_id: str
    quantity: int
    subtotal: float
    
class OrderItemSchema(BaseModel):
    menuitem_id: str
    name: str
    quantity: int
    subtotal: float
    image_url: str
    
class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    REJECTED = "rejected"
    COMPLETED = "completed"
    CANCELED = "canceled"
    
class Order(BaseModel):
    order_id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id") 
    user_id: str 
    order_date: datetime = Field(default_factory=datetime.now) 
    order_items: List[OrderItem]
    total_amount: float                     # including delivery fee and discount directly from restaurant (NOT VOUCHER???)  
    status: Optional[OrderStatus] = OrderStatus.PENDING
    note: Optional[str] = None 
    voucher_id: Optional[str] = None 
    discount_applied: Optional[float] = None    # discount AMOUNT (not percentage) of voucher applied
    delivery_fee: float
    
class DeliveryFeeDict:
    delivery_fee_dict = {
        "ha dong": 1,
        "dong da": 1,
        "cau giay": 2,
        "hai ba trung": 2,
        "hoang mai": 2,
        "ba dinh": 3,
        "nam tu liem": 3,
        "bac tu liem": 3,
    }
    
    