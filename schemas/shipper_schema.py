from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from models.shipper import ShipperStatus
from models.user import GenderEnum, Role

class ShipperSchema(BaseModel):
    shipper_id: Optional[str] = None
    name: str
    phone_number: str
    total_amount: float
    email: str
    password: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime
    date_of_birth: datetime
    gender: GenderEnum
    avatar_url: Optional[str] = None
    role: Optional[Role] = Role.SHIPPER
    account_status: Optional[ShipperStatus] = None
    
class Admin_Delivery_Shipper_Schema(BaseModel):
    shipper_id: str
    name: str
    address: Optional[str] = None
    phone_number: Optional[str] = None

