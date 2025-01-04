from models.menuitem import MenuItem
from datetime import datetime
from config.database import db
from fastapi import HTTPException

async def get_all_menu_items() -> list:
    menu_items = await db["menuitem"].find().to_list(length=None)
    if not menu_items:
        raise HTTPException(status_code=404, detail="No menu items found")
    
    return menu_items

async def get_menu_item_by_id(menu_item_id: str) -> MenuItem:
    menu_item = await db["menuitem"].find_one({"_id": menu_item_id})
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    return menu_item