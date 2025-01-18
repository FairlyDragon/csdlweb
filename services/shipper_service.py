from fastapi import HTTPException
from services.auth_service import hash_password
from db.database import db

# Get shippers
async def get_shippers() -> list[dict]:   # list[Shipper] - fetch from db
    shippers = await db["shipper"].find().to_list(length=None)
    if not shippers:
        raise HTTPException(status_code=404, detail="No shippers found")
    
    return shippers

# Get shipper by id
async def get_shipper_by_id(shipper_id: str) -> dict:  # return Shipper
    shipper = await db["shipper"].find_one({"_id": shipper_id})
    if not shipper:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return shipper

# Update shipper by id
async def update_shipper_by_id(shipper_id: str, shipper_info_dict: dict) -> int:
    shipper_info_dict = {k: v for k, v in shipper_info_dict.items() if v is not None}
    # Hash password before inserting into db
    if shipper_info_dict.get("password"):
        shipper_info_dict.update({"password": hash_password(shipper_info_dict["password"])})
        
    updated_shipper = await db["shipper"].update_one({"_id": shipper_id}, {"$set": shipper_info_dict})
    
    if not updated_shipper.modified_count:
        raise HTTPException(status_code=404, detail="Shipper update failed")
    
    return updated_shipper.modified_count

# Update shipper by id without raising error
async def update_shipper_by_id_without_raising_error(shipper_id: str, shipper_info_dict: dict) -> int:
    shipper_info_dict = {k: v for k, v in shipper_info_dict.items() if v is not None}
    # Hash password before inserting into db
    if shipper_info_dict.get("password"):
        shipper_info_dict.update({"password": hash_password(shipper_info_dict["password"])})
        
    updated_shipper = await db["shipper"].update_one({"_id": shipper_id}, {"$set": shipper_info_dict})
    
    return updated_shipper.modified_count

# Delete shipper by id
async def delete_shipper_by_id(shipper_id: str) -> int:
    result = await db["shipper"].delete_one({"_id": shipper_id})
    
    if not result.deleted_count:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return result.deleted_count


# Get delivery history by shipper id
async def get_delivery_history_by_shipper_id(shipper_id: str) -> list[dict]:  # return list[DeliveryHistoryResponseSchema]
    # Get delivery history of a shipper, inluding order_id, shipper_id, delivery_status.
    delivery_history = await db["order_delivery"].find({"shipper_id": shipper_id}).to_list(length=None)
    if not delivery_history:
        raise HTTPException(status_code=404, detail="No delivery history found")
    
    return delivery_history


# Get shippers by account status: active or inactive
async def get_shippers_by_account_status(status: str) -> list[dict]:   # list[Shipper] - fetch from db
    if status.strip().lower() not in ["active", "inactive"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    shippers = await db["shipper"].find({"account_status": status.strip().lower()}).to_list(length=None)
    if not shippers:
        raise HTTPException(status_code=404, detail="No shippers found")
    return shippers

# Get shipper ids in freetime: delivery_status = [delivered or failed]
async def get_shipper_ids_in_freetime() -> list[str]:
    shipper_ids_in_freetime = await db["order_delivery"].distinct("shipper_id",
            {"delivery_status": {"$in": ["delivered", "failed"]}}
        )
    
    return shipper_ids_in_freetime