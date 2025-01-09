from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4


class Voucher(BaseModel): 
    voucher_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    code: str 
    discount_percentage: float 
    discount_amount: float
    start_date: datetime 
    end_date: datetime 
    minimum_order_amount: float 
    total_usage_limit: int
    used: Optional[int] = 0