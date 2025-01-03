from fastapi import HTTPException
from config.database import db

# Get all customer reviews
async def get_customer_reviews() -> list:
    reviews = await db["reviews"].find().to_list(length=None)
    if not reviews:
        raise HTTPException(status_code=404, detail="No reviews found")
    
    return reviews

# Get latest reviews first
async def sorted_reviews_by_time(reviews: list) -> list: 
    return sorted(reviews, key=lambda x: x["review_date"], reverse=True)