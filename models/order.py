from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
import uuid

class OrderItem(BaseModel):
    menuitem_id: str
    quantity: int
    subtotal: float
    
class Order(BaseModel):
    order_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    created_at: datetime = Field(default_factory=datetime.now())
    total_amount: float
    is_accepted: Optional[bool] = True
    order_items: List[OrderItem]
    note: Optional[str] = ""
    completed_at: Optional[datetime] = None
    
    