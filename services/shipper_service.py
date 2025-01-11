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
    delivery_history = await db["order_delivery"].find({"shipper_id": shipper_id}).to_list(length=None)
    if not delivery_history:
        raise HTTPException(status_code=404, detail="No delivery history found")
    
    result = []
    for delivery in delivery_history:
        order_id = delivery["order_id"]
        order = await db["order"].find_one({"_id": order_id})
        
        result.append(DeliveryHistoryResponseSchema(
            order_id=order_id, 
            order_date=order["order_date"],
            order_items=[OrderItem(**item).model_dump() for item in order["order_items"]],
            delivery_status=delivery["delivery_status"], 
            payment_amount=order["total_amount"])
                      .model_dump())
    
    return result
