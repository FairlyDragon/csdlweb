# This file contains the service functions for the admin module
from db.database import db
from schemas.admin_schema import *
from services.time_service import *
from models.order import OrderStatus
from models.payment import PaymentStatus
from services.order_service import *

# Create a DashboardResponseSchema object
def initialize_dashboard_header_response(total_orders, total_delivered, total_canceled, total_revenue) -> DashBoardHeaderResponseSchema:
    return DashBoardHeaderResponseSchema(
        total_orders=total_orders, 
        total_delivered=total_delivered, 
        total_canceled=total_canceled, 
        total_revenue=total_revenue
    )
    
# Create a FiguresHeaderResponseSchema object
def initialize_figures_header_response(figures_current, figures_former, days) -> FiguresHeaderResponseSchema:
    if figures_former == 0:
        return FiguresHeaderResponseSchema(figures=figures_current, growth_rate=100, days=days)
    
    return FiguresHeaderResponseSchema(figures=figures_current, growth_rate=int(figures_current / figures_former * 100), days=days)

# Create a PieChartResponseSchema object
def initialize_pie_chart_response(total_order, customer_growth, total_revenue) -> PieChartResponseSchema:
    return PieChartResponseSchema(total_order_percentage=total_order, \
                customer_growth_percentage=customer_growth, \
                    total_revenue_percentage=total_revenue)

############################## Helper functions used in common for admin and user modules

# Get dashboard header data by periodicity   
async def get_dashboard_header_data(start_time: datetime, end_time: datetime) -> tuple:
    orders = await get_orders_within_period(start_time, end_time)
    
    total_orders = len(orders)
    total_delivered = len(await get_delivered_orders_within_period(start_time=start_time, end_time=end_time))
    
    total_canceled = len([o for o in orders if o["status"] == OrderStatus.canceled])
    
    payments = await get_payments_within_period(start_time=start_time, end_time=end_time)
    total_revenue = sum(p["amount"] for p in payments if p["status"] == PaymentStatus.success)

    return total_orders, total_delivered, total_canceled, total_revenue

# Get customers who made orders in a period of time
async def get_customers_made_orders_in_period_time(start_time: datetime, end_time: datetime) -> list:
    orders = await get_orders_within_period(start_time, end_time)
    customer_ids = list(set(order["user_id"] for order in orders))
    
    cursor = db["user"].find({"user_id": {"$in": customer_ids}})
    return await cursor.to_list(length=None)
        
# Get the dashboard center pie chart data in a period of time      
async def get_dashboard_center_piechart_in_period_time(start_time: datetime, end_time: datetime) -> tuple:
    orders = await get_orders_within_period(start_time, end_time)
    total_order = len(orders)
    
    customers = await get_customers_made_orders_in_period_time(start_time, end_time)
    total_customer = len(customers)
    
    payments = await get_payments_within_period(start_time, end_time)
    total_revenue = sum(p["amount"] for p in payments if p["status"] == PaymentStatus.success)
    
    return total_order, total_customer, total_revenue

# Get total_orders figure list in dashboard center
async def get_total_orders_list_in_dashboard_center(timeline: list) -> list:
    total_orders_list = [len(await get_orders_within_period(time_pair[0], time_pair[1])) for time_pair in timeline]
    return total_orders_list

# Get total_revenue figures list in dashboard center
async def get_total_revenue_list_in_dashboard_center(timeline: list) -> list:
    total_revenue_list = [sum(p["amount"] for p in await get_payments_within_period(time_pair[0], time_pair[1]) if p["status"] == PaymentStatus.success) for time_pair in timeline]
    return total_revenue_list

# Get customers_map figures list in dashboard center
async def get_customers_map_list_in_dashboard_center(timeline: list) -> list:
    total_customers_list = [len(await get_customers_made_orders_in_period_time(time_pair[0], time_pair[1])) for time_pair in timeline]
    return total_customers_list

# Get the figures data in general - used in dashboard center
async def get_figures_dashboard_center_in_general(figures_type: str, periodicity: str) -> list:
    now = datetime.now()
    
    if periodicity == "daily":
        monday = get_monday_of_current_time(now)
        timeline = get_timeline_daily(monday)
        
        if "order" in figures_type:
            return await get_total_orders_list_in_dashboard_center(timeline)
        
        elif "revenue" in figures_type:
            return await get_total_revenue_list_in_dashboard_center(timeline)
        
        else:
            return await get_customers_map_list_in_dashboard_center(timeline)  
            
    elif periodicity == "weekly":
        timeline = get_timeline_weekly(now)
        if "order" in figures_type:
            return await get_total_orders_list_in_dashboard_center(timeline)
        
        elif "revenue" in figures_type:
            return await get_total_revenue_list_in_dashboard_center(timeline)
        
        else:
            return await get_customers_map_list_in_dashboard_center(timeline)
    
    elif periodicity == "monthly": 
        timeline = get_timeline_monthly(now) 
        if "order" in figures_type:
            return await get_total_orders_list_in_dashboard_center(timeline)
        
        elif "revenue" in figures_type:
            return await get_total_revenue_list_in_dashboard_center(timeline)
        
        else:
            return await get_customers_map_list_in_dashboard_center(timeline)
        

# Get payments within a period of time
async def get_payments_within_period(start_time: datetime, end_time: datetime) -> list:
    collection = db["payment"]
    cursor = collection.find({"created_at": {"$gte": start_time, "$lte": end_time}})
     
    return await cursor.to_list(length=None)

# Set discount percentage for all menu items
async def set_discount_percentage(discount_percentage: int) -> dict:
    collection = db["menuitem"]
    result = await collection.update_many(
        {}, 
        {"$set": {"discount": discount_percentage}}
    
    )
    return {
        "message": "Discount percentage set successfully", 
        "modified_count": result.modified_count
        }
