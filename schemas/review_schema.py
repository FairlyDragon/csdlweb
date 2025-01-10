from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class ReviewDashBoardResponseSchema(BaseModel):
    review_id: str
    customer_id: str # Review model has user_id field instead of customer_id
    menuitem_id: str
    name: str       # Review model DONT has this field
    rating: int 
    comment: str
    review_date: datetime
    image_url: str  # Review model DONT has this field
    avatar_url: Optional[str] = None  # Review model DONT has this field
