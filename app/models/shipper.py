# from typing import Optional
from enum import Enum
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from utils.roles import Role
from models.user import GenderEnum
from typing import Optional

class ShipperStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    
class Shipper(BaseModel): 
    shipper_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    name: Optional[str] = None
    phone_number: Optional[str] = None  
    total_amount: Optional[float] = None		
    email: Optional[str] = None		
    password: Optional[str] = None		
    address: Optional[str] = None		
    created_at: Optional[datetime] = datetime.now()
    date_of_birth: Optional[datetime] = datetime.now()
    gender: Optional[GenderEnum] = None		# Male or Female
    avatar_url: Optional[str] = None
    role: Role = Role.SHIPPER
    account_status: Optional[ShipperStatus] = ShipperStatus.INACTIVE

