from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from models.shipper import ShipperStatus
from models.user import GenderEnum, Role

class ShipperSchema(BaseModel):
    shipper_id: Optional[str] = None
    name: Optional[str] = None
    phone_number: Optional[str] = None
    total_amount: Optional[float] = None
    email: Optional[str] = None
    password: Optional[str] = None
    address: Optional[str] = None
    created_at: Optional[datetime] = None
    date_of_birth: Optional[datetime] = None
    gender: Optional[GenderEnum] = None
    avatar_url: Optional[str] = None
    role: Optional[Role] = Role.SHIPPER
    account_status: Optional[ShipperStatus] = None
    
class Admin_Delivery_Shipper_Schema(BaseModel):
    shipper_id: str
    name: str
    address: Optional[str] = None
    phone_number: Optional[str] = None

