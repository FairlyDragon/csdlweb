# This file contains the service functions for the admin module
from config.database import db
from schemas.admin_schema import *
from services.time_service import *
from models.order import OrderStatus
from models.payment import PaymentStatus
from services.order_service import *


# Create an DashboardResponseSchema object
async def initialize_dashboard_header_response(total_orders, total_delivered, total_canceled, total_revenue) -> DashBoardHeaderResponseSchema:
    return await DashBoardHeaderResponseSchema(\
        total_orders=total_orders, \
        total_delivered=total_delivered, \
        total_canceled=total_canceled, \
        total_revenue=total_revenue)
    
# Create a figuresHeaderResponseSchema object
async def initialize_figures_header_response(figures1, figures2, days) -> FiguresHeaderResponseSchema:
    return await FiguresHeaderResponseSchema(figures=figures1, change=int(round(figures2 / figures1 * 100, 2)), days=days)

# Create a PieChartResponseSchema object
async def initialize_pie_chart_response(total_order, customer_growth, total_revenue) -> PieChartResponseSchema:
    return await PieChartResponseSchema(total_order=total_order, customer_growth=customer_growth, total_revenue=total_revenue)

############################## Helper functions used in common for admin and user modules
# def get_the_most_popular_dishes():
    

# Get dashboard header data by periodicity   
async def get_dashboard_header_data(start_time: datetime, end_time: datetime) -> tuple:
    orders = await get_orders_within_period(start_time, end_time)
    
    total_orders = len(orders)
    total_delivered = len(await get_delivered_orders_within_period(start_time=start_time, end_time=end_time))
    
    # In case of a cancelled order: is_accepted is False; or cus booms the order. At this time, admin will cancel the order manually.
    # (Search cus by phone_number, then cancel the order, it means set 'is_accepted' to False)
    total_cancelled = len([o for o in orders if o["status"] == OrderStatus.cancelled])
    
    payments = await get_all_payments()
    total_revenue = sum(p["amount"] for p in payments if p["status"] == PaymentStatus.success)

    return await total_orders, total_delivered, total_cancelled, total_revenue

# Get customers who made orders in a period of time
async def get_customers_made_orders_in_period_time(start_time: datetime, end_time: datetime) -> list:
    orders = await get_orders_within_period(start_time, end_time)
    # Get all customers who made orders 
    customer_ids = set()
    for order in orders:
        customer_ids.add(order["customer_id"])
        
    cursor = db["user"].find({"user_id": {"$in": list(customer_ids)}})
    return await cursor.to_list(length=None)
        
# Get the dashboard center pie chart data in a period of time      
async def get_dashboard_center_piechart_in_period_time(start_time: datetime, end_time: datetime) -> tuple:
    orders = await get_orders_within_period(start_time, end_time)
    total_order = len(orders)
    
    customers = await get_customers_made_orders_in_period_time(start_time, end_time)
    total_customer = len(customers)
    
    payments = await get_all_payments()
    total_revenue = sum(p["amount"] for p in payments if p["status"] == PaymentStatus.success)
    
    return total_order, total_customer, total_revenue


# Get total_orders gigure list in dashboard center
async def get_total_orders_list_in_dashboard_center(timeline: list) -> list:
    total_orders_list = [len(await get_orders_within_period(time_pair[0], time_pair[1]))  # orders_from_db
                for time_pair in timeline]
    
    return total_orders_list

# Get total_revenue figures list in dashboard center
async def get_total_revenue_list_in_dashboard_center(timeline: list) -> list:
    total_revenue_list = [sum([p["amount"] for p in \
                                  await get_all_payments(time_pair[0], time_pair[1]) # payments_from_db 
                                        if p["status"] == PaymentStatus.success]) for time_pair in timeline]
    return total_revenue_list

# Get customers_map figures list in dashboard center
async def get_customers_map_list_in_dashboard_center(timeline: list) -> list:
    total_customers_list = [len(await get_customers_made_orders_in_period_time(time_pair[0], time_pair[1]))   
                                    for time_pair in timeline]
    return total_customers_list

# Get the figures data in general - used in dashboard center
async def get_figures_dashboard_center_in_general(figures_type: str, periodicity: str) -> list:
    now = datetime.now()
    
    if periodicity == "daily":
        monday = await get_monday_of_current_time(now)
        timeline = await get_timeline_daily(monday)
        
        if "order" in figures_type:
            return await get_total_orders_list_in_dashboard_center(periodicity, timeline)
        
        elif "revenue" in figures_type:
            return await get_total_revenue_list_in_dashboard_center(periodicity, timeline)
        
        else:
            return await get_customers_map_list_in_dashboard_center(periodicity, timeline)  
            
    elif periodicity == "weekly":
        timeline = await get_timeline_weekly(now)
        if "order" in figures_type:
            return await get_total_orders_list_in_dashboard_center(periodicity, timeline)
        
        elif "revenue" in figures_type:
            return await get_total_revenue_list_in_dashboard_center(periodicity, timeline)
        
        else:
            return await get_customers_map_list_in_dashboard_center(periodicity, timeline)
    
    elif periodicity == "monthly": 
        timeline = await get_timeline_monthly(now) 
        if "order" in figures_type:
            return await get_total_orders_list_in_dashboard_center(periodicity, timeline)
        
        elif "revenue" in figures_type:
            return await get_total_revenue_list_in_dashboard_center(periodicity, timeline)
        
        else:
            return await get_customers_map_list_in_dashboard_center(periodicity, timeline)
        

# Get all payments
async def get_all_payments() -> list:
    payments = await db["payments"].find().to_list(length=None)
    
    return payments



    