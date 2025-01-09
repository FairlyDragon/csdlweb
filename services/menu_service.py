from models.menuitem import MenuItem
from datetime import datetime
from typing import Optional
from db.database import db
from fastapi import HTTPException, Query

# Get all menu items
async def get_all_menu_items() -> list:
    menu_items = await db["menuitem"].find().to_list(length=None)
    if not menu_items:
        raise HTTPException(status_code=404, detail="No menu items found")
    
    return menu_items

# Get menu_item by id
async def get_menu_item_by_id(menu_item_id: str) -> dict:
    menu_item = await db["menuitem"].find_one({"_id": menu_item_id})
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    return menu_item

# Filter menuitems by filter conditions
async def get_menu_items_by_filter(
                            category: Optional[str], 
                            sort_by_price: Optional[str], 
                            stock_status: Optional[str]
                        ) -> list[dict]:
    
    # list of menu items dicts
    filtered_items = await get_all_menu_items()
    
    # filter by category
    if category: 
        filtered_items = [item for item in filtered_items if item["category"] == category.strip().lower()] 
    
    # filter by stock status
    if stock_status: 
        if stock_status.strip().lower() == "in_stock": 
            filtered_items = [item for item in filtered_items if item["is_active"]] 
        elif stock_status.strip().lower() == "out_of_stock": 
            filtered_items = [item for item in filtered_items if not item["is_active"]]
    
    # sort by price
    if sort_by_price: 
        if sort_by_price.strip().lower() == "low_to_high": 
            filtered_items = sorted(filtered_items, key=lambda x: x["price"]) 
        elif sort_by_price.strip().lower() == "high_to_low": 
            filtered_items = sorted(filtered_items, key=lambda x: x["price"], reverse=True) 
    
    # return list of MenuItem objects
    return filtered_items

# Insert a new menu item to the database
async def insert_menuitem_to_db(menuitem: MenuItem) -> dict:
    collection = db["menuitem"]
    result = await collection.insert_one(menuitem.model_dump(by_alias=True))
    
    return await collection.find_one({"_id": result.inserted_id})

async def update_menuitem_by_id(menuitem_id: str, update_data: dict) -> dict:
    collection = db["menuitem"]
    result = await collection.update_one({"_id": menuitem_id}, {"$set": update_data})
    
    return result

