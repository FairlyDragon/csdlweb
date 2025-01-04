from datetime import datetime
from pydantic import BaseModel, Field

class ReviewResponseSchema(BaseModel):
    review_id: str
    customer_id: str
    menuitem_id: str
    name: str
    rating: int 
    comment: str
    time_ago: datetime
    image_url: str