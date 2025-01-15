
from db.database import db
from schemas.admin_schema import *
from services.time_service import *

# Get orders by status (pending, processing, rejected, completed, canceled)
async def get_orders_by_status(status: str) -> list[dict]:  # -> list[Order]
    order_by_status = await db["order"].find({"status": status}).to_list(length=None) 
    if not order_by_status: 
        raise HTTPException(status_code=404, detail=f"No orders found with status {status}")

    return order_by_status

# Get orders by status excluding a certain status (pending, processing, rejected, completed, canceled)
async def get_orders_by_status_excluding(status: str) -> list[dict]:  # -> list[Order]
    order_by_status = await db["order"].find({"status": {"$ne": status}}).to_list(length=None) 
    if not order_by_status: 
        raise HTTPException(status_code=404, detail=f"No orders found excluding status {status}")

    return order_by_status

# Get order within a time period (from 'order' collection)
async def get_orders_within_period(start_time, end_time) -> list: 
    collection = db["order"] 
    cursor = collection.find({"order_date": {"$gte": start_time, "$lte": end_time}}) 
     
    return await cursor.to_list(length=None)

# Get all orders of all customers
async def get_orders_of_all_customers() -> list:
    orders = await db["order"].find().to_list(length=None)
    if not orders:
        raise HTTPException(status_code=404, detail="No orders found")
    
    return orders

# Get order history by customer id
async def get_order_history_by_customer_id(customer_id: str) -> list[dict]:
    order_history = await db["order"].find({"user_id": customer_id}).to_list(length=None)
    if not order_history:
        raise HTTPException(status_code=404, detail="No order history found")
    
    return order_history

# Get completed orders within a period of time
async def get_completed_orders_within_period(start_time, end_time) -> list:
    delivered_orders = await get_orders_by_status(OrderStatus.COMPLETED)
    
    return [order for order in delivered_orders if start_time <= order["order_date"] <= end_time]

# Get delivering orders (accurately is 'processing' status)
async def get_delivering_orders() -> list[dict]:  # -> list[Order]
    return await get_orders_by_status(OrderStatus.PROCESSING)

# Get order by id
async def get_order_by_id(order_id: str) -> dict:
    order = await db["order"].find_one({"_id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order