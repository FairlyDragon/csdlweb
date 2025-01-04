from config.database import db
from schemas.admin_schema import *
from services.time_service import *
from models.orderdelivery import DeliveryStatusEnum


# Get orders by status 
async def get_orders_by_status(status: str) -> list:
    order_delivery_by_status = await db["order_delivery"].find({"delivery_status": status}).to_list(length=None) 
    if not order_delivery_by_status: 
        raise HTTPException(status_code=404, detail=f"No {status} orders found") 
    
    order_ids = [order["order_id"] for order in order_delivery_by_status] 
    orders = await db["order"].find({"order_id": {"$in": order_ids}}).to_list(length=None) 
    
    return orders

# Get order within a time period (from 'order' collection)
async def get_orders_within_period(start_time, end_time) -> list: 
    collection = db["order"] 
    cursor = collection.find({"order_date": {"$gte": start_time, "$lte": end_time}}) 
     
    return await cursor.to_list(length=None)

# Get all orders of all customers
async def get_orders_of_all_customers() -> list:
    orders = await db["order"].find().to_list(100)
    if not orders:
        raise HTTPException(status_code=404, detail="No orders found")
    
    return orders

# Get delivered orders within a period of time
async def get_delivered_orders_within_period(start_time, end_time) -> list:
    delivered_orders = await get_orders_by_status(DeliveryStatusEnum.delivered)
    
    return [order for order in delivered_orders if start_time <= order["order_date"] <= end_time]
    
# Get on-the-way orders 
async def get_delivering_orders() -> list:
    delivering_orders = await get_orders_by_status(DeliveryStatusEnum.delivering)
    
    return delivering_orders