from fastapi import HTTPException
from db.database import db

# Get shippers
async def get_shippers() -> list[dict]:   # list[Shipper] - fetch from db
    shippers = await db["shipper"].find().to_list(length=None)
    if not shippers:
        raise HTTPException(status_code=404, detail="No shippers found")
    
    return shippers



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