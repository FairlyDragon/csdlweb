from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from enum import Enum   

class PaymentMethod(str, Enum):
    stripe = "stripe"
    cash_on_delivery = "cash_on_delivery"
    
class PaymentStatus(str, Enum):
    pending = "pending"
    success = "success"
    failed = "failed"
    
class Payment(BaseModel): 
    payment_id: str = Field(default_factory=lambda: str(uuid4())) 
    order_id: str 
    payment_method: PaymentMethod   
    amount: float
    status: PaymentStatus
    created_at: datetime = Field(default_factory=datetime.now)