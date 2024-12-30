# from typing import Optional
from pydantic import BaseModel, Field
from uuid import uuid4
from enum import Enum

class FoodStatus(str, Enum): 
    available = "available" 
    out_of_stock = "out_of_stock"
    
class MenuItem(BaseModel): 
    menuitem_id: str = Field(default_factory=lambda: str(uuid4())) 
    name: str 
    description: str 
    price: float 
    category: str
    status: FoodStatus
    