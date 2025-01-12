from fastapi import HTTPException
from models.order import OrderItem
from schemas.admin_schema import DeliveryHistoryResponseSchema
from schemas.shipper_schema import ShipperSchema
from models.shipper import Shipper
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
