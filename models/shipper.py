# from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from models.user import UserRole, GenderEnum
from typing import Optional

class Shipper(BaseModel): 
    shipper_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    name: str 
    phone_number: str 
    total_amount: float		
    username: str		
    password: str		
    updated_address: str		
    created_at: datetime		
    date_of_birth: datetime		
    gender: GenderEnum		# male or female
    avatar_url: Optional[str] = None
    role: UserRole 

