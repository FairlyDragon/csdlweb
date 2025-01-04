from fastapi import HTTPException
from config.database import db
from schemas.review_schema import ReviewResponseSchema

# Get all customer reviews and sort from lastest to oldest
async def fetch_reviews(): 
    reviews = [] 
    cursor = db["review"].find().sort("review_date", -1) 
    async for document in cursor:
        menu_item = await db["menuitem"].find_one({"_id": document["menuitem_id"]}) 
        if menu_item: 
            reviews.append( 
                ReviewResponseSchema( 
                    review_id=str(document["_id"]), 
                    customer_id=document["user_id"], 
                    menuitem_id=document["menuitem_id"], 
                    name=menu_item["name"], 
                    rating=document["rating"], 
                    comment=document["comment"], 
                    time_ago=document["review_date"], 
                    image_url=menu_item["image_url"] 
                    ) 
                ) 
    
    return reviews
