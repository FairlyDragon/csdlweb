from typing import Optional
from pydantic import BaseModel, Field
from uuid import uuid4
from enum import Enum

# class FoodStatus(str, Enum): 
#     available = "available" 
#     out_of_stock = "out_of_stock"
    
class MenuItem(BaseModel): 
    menuitem_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    name: str 
    description: Optional[str] = None 
    price: float 
    category: str 
    average_rating: Optional[float] = 0
    discount: Optional[float] = 0.0 
    is_active: bool = True
    image_url: str
    