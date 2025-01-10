from fastapi import HTTPException
from db.database import db
from schemas.review_schema import ReviewDashBoardResponseSchema

# Get all customer reviews and sort from lastest to oldest
async def fetch_reviews() -> list[ReviewDashBoardResponseSchema]: 
    reviews = [] 
    cursor = db["review"].find().sort("review_date", -1) 
    async for document in cursor:
        menu_item = await db["menuitem"].find_one({"_id": document["menuitem_id"]}) 
        user = await db["user"].find_one({"_id": document["user_id"]})
        if menu_item: 
            reviews.append( 
                ReviewDashBoardResponseSchema( 
                    review_id=str(document["_id"]), 
                    customer_id=document["user_id"], 
                    menuitem_id=document["menuitem_id"], 
                    name=menu_item["name"], 
                    rating=document["rating"], 
                    comment=document["comment"], 
                    review_date=document["review_date"], 
                    image_url=menu_item["image_url"],
                    avatar_url = user["avatar_url"] if user and user.get("avatar_url") else None
                    ) 
                ) 
    
    return reviews
