from models.menuitem import MenuItem
from datetime import datetime
from typing import Optional
from config.database import db
from fastapi import HTTPException, Query

# Get all menu items
async def get_all_menu_items() -> list:
    menu_items = await db["menuitem"].find().to_list(length=None)
    if not menu_items:
        raise HTTPException(status_code=404, detail="No menu items found")
    
    return menu_items

# Get menu_item by id
async def get_menu_item_by_id(menu_item_id: str) -> MenuItem:
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
    
    filtered_items = await get_all_menu_items()
    
    if category: 
        filtered_items = [item for item in filtered_items if item["category"] == category.strip().lower()] 
        
    if stock_status: 
        if stock_status.strip().lower() == "in stock": 
            filtered_items = [item for item in filtered_items if item["is_active"]] 
        elif stock_status.strip().lower() == "out of stock": 
            filtered_items = [item for item in filtered_items if not item["is_active"]]
    
    if sort_by_price: 
        if sort_by_price.strip().lower() == "low to high": 
            filtered_items = sorted(filtered_items, key=lambda x: x["price"]) 
        elif sort_by_price.strip().lower() == "high to low": 
            filtered_items = sorted(filtered_items, key=lambda x: x["price"], reverse=True) 
            
    return filtered_items

