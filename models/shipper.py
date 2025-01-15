# from typing import Optional
from enum import Enum
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from utils.roles import Role
from models.user import GenderEnum
from typing import Optional

class ShipperStatus(str, Enum):
    active = "active"
    inactive = "inactive"       
    
class Shipper(BaseModel): 
    shipper_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    name: str 
    phone_number: str 
    total_amount: float		
    email: str		
    password: str		
    address: str		
    created_at: datetime		
    date_of_birth: datetime		
    gender: GenderEnum		# Male or Female
    avatar_url: Optional[str] = None
    role: Role = Role.SHIPPER
    account_status: ShipperStatus

