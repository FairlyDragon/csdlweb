from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from enum import Enum
from utils.roles import Role

class GenderEnum(str, Enum):
    MALE = "male"
    FEMALE = "female"
     
class User(BaseModel): 
    user_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    name: Optional[str] = None
    email: Optional[str] = None
    password: str 
    phone_number: Optional[str] = None 
    address: Optional[str] = None 
    created_at: datetime = Field(default_factory=datetime.now)
    role: Role
    gender: Optional[GenderEnum] = None
    date_of_birth: Optional[datetime] = None
    avatar_url: Optional[str] = None

