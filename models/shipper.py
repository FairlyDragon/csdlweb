# from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4

class Shipper(BaseModel): 
    shipper_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    name: str 
    phone_number: str 
    total_amount: float