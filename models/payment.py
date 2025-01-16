from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from enum import Enum   

class PaymentMethod(str, Enum):
    STRIPE = "stripe"
    COD = "cod"
    
class PaymentStatus(str, Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    
class Payment(BaseModel): 
    payment_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    order_id: str 
    payment_method: PaymentMethod   
    amount: float
    payment_status: PaymentStatus
    created_at: datetime = Field(default_factory=datetime.now)