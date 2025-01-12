from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from models.user import GenderEnum, UserRole

class ShipperSchema(BaseModel):
    shipper_id: Optional[str] = None
    name: str
    phone_number: str
    total_amount: float
    email: str
    address: Optional[str] = None
    created_at: datetime
    date_of_birth: datetime
    gender: GenderEnum
    avatar_url: Optional[str] = None
    role: Optional[UserRole] = None

