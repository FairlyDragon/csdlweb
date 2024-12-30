# This file contains the service functions for the admin module
from app.config.database import db
from app.schemas.admin_schema import *
from app.services.time_service import *
from app.models.payment import PaymentStatus


# Get data within a time period from a collection (Order/Payment)
async def get_data_within_period(collection_name, start_time, end_time): 
    collection = db[collection_name] 
    cursor = collection.find({"created_at": {"$gte": start_time, "$lte": end_time}}) 
     
    return await cursor.to_list(length=None)

# Get on-the-way orders 
async def get_delivering_orders():
    orders = db["OrderDelivery"]
    cursor = orders.find({"delivery_status.status_description": "delivering"}) 
    
    return await cursor.to_list(length=None)

# Create an DashboardResponseSchema object
async def initialize_dashboard_header_response(total_orders, total_delivered, total_canceled, total_revenue):
    return await DashBoardHeaderResponseSchema(\
        total_orders=total_orders, \
        total_delivered=total_delivered, \
        total_canceled=total_canceled, \
        total_revenue=total_revenue)
    
# Create a FigureHeaderResponseSchema object
async def initialize_figure_header_response(figure1, figure2):
    return await FigureHeaderResponseSchema(figure=figure1, change=int(round(figure2 / figure1 * 100, 2)))

# Create a PieChartResponseSchema object
async def initialize_pie_chart_response(total_order, customer_growth, total_revenue):
    return await PieChartResponseSchema(total_order=total_order, customer_growth=customer_growth, total_revenue=total_revenue)

############################## Helper functions used in common for admin and user modules
# def get_the_most_popular_dishes():
    
# Get customers by phone number   
async def get_customers_by_phone_number(phone_number: str):
    customers = db["User"]
    cursor = customers.find({"phone_number": phone_number})
    
    return await cursor.to_list(length=None)


# Get dashboard header data by periodicity   
async def get_dashboard_header_data(start_time: datetime, end_time: datetime):
    orders = await get_data_within_period("Order", start_time, end_time)
    payments = await get_data_within_period("Payment", start_time, end_time)

    total_orders = len(orders)
    total_delivered = len([o for o in orders if o["completed_at"]])
    
    # In case of a cancelled order: is_accepted is False; or cus booms the order. At this time, admin will cancel the order manually.
    # (Search cus by phone_number, then cancel the order, it means set 'is_accepted' to False)
    total_cancelled = len([o for o in orders if not o["is_accepted"]])
    total_revenue = sum(p["amount"] for p in payments if p["status"] == PaymentStatus.success)

    return await total_orders, total_delivered, total_cancelled, total_revenue

# Get customers who made orders in a period of time
async def get_customers_made_orders_in_period_time(start_time: datetime, end_time: datetime):
    orders = await get_data_within_period("Order", start_time, end_time)
    # Get all customers who made orders 
    customer_id_list = set()
    for order in orders:
        customer_id_list.add(order["customer_id"])
        
    cursor = db["User"].find({"user_id": {"$in": list(customer_id_list)}})
    return await cursor.to_list(length=None)
        
# Get the dashboard center pie chart data in a period of time      
async def get_dashboard_center_piechart_in_period_time(start_time: datetime, end_time: datetime):
    orders = await get_data_within_period("Order", start_time, end_time)
    total_order = len(orders)
    
    customers = await get_customers_made_orders_in_period_time(start_time, end_time)
    total_customer = len(customers)
    
    payments = await get_data_within_period("Payment", start_time, end_time)
    total_revenue = sum(p["amount"] for p in payments if p["status"] == PaymentStatus.success)
    
    return total_order, total_customer, total_revenue

async def get_dashboard_center_data_daily(collection_name, start_time, end_time):
    return await get_data_within_period(collection_name, start_time, end_time)

async def get_figure_dashboard_center_data(figure_type: str, periodicity: str):
    now = datetime.now()
    if periodicity == "daily":
        return await get_dashboard_center_data_daily(figure_type, now - timedelta(days=1), now)
    elif periodicity == "weekly":
        return await get_dashboard_center_data_daily(figure_type, now - timedelta(weeks=1), now)
    else:
        return await get_dashboard_center_data_daily(figure_type, now - timedelta(weeks=4), now)
    
        return None
    