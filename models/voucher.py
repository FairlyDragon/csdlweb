from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4


class Voucher(BaseModel):
    voucher_id: str = Field(default_factory=lambda: str(uuid4()))
    code: str
    discount_percentage: float
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    is_active: Optional[bool] = True