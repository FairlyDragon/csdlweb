from typing import Optional 
from pydantic import BaseModel, Field 
from datetime import datetime 
import uuid 

class Review(BaseModel): 
    review_id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias = "_id" )
    user_id: str 
    menuitem_id: str 
    rating: Optional[int] = Field(default=0, ge=1, le=5) 
    comment: Optional[str] = None 
    review_date: datetime = Field(default_factory=datetime.now)
    