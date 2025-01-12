from fastapi import HTTPException
from db.database import db

# Get delivery_orders by delivery status
async def get_deliveries_by_delivery_status(delivery_status: str) -> list[dict]:
    delivery_orders = await db["order_delivery"].find({"delivery_status": delivery_status}).to_list(length=None)
    if not delivery_orders:
        raise HTTPException(status_code=404, detail="No delivery orders found")
    
    return delivery_orders