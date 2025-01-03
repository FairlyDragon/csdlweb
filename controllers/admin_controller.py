from fastapi import Depends
from schemas.admin_schema import *
from services.admin_service import *
from services.review_service import *
from services.time_service import *

### Dashboard Header
async def read_dashboard_header(time_period: TimePeriod = Depends(get_time_period)) -> DashBoardHeaderResponseSchema:
    time_differ = get_time_difference(time_period.start_date, time_period.end_date) # periodicity length
    days = time_differ.days
    
    # current periodical data
    total_orders_current, total_delivered_current, \
        total_canceled_current, total_revenue_current \
            = await get_dashboard_header_data(time_period.start_date, time_period.end_date)

    # former periodical data
    end_date_former = time_period.start_date - timedelta(seconds=1)
    start_date_former = end_date_former - time_differ
    
    total_orders_former, total_delivered_former, \
        total_canceled_former, total_revenue_former \
            = await get_dashboard_header_data(start_date_former, end_date_former)
         
    # initialize figures response   
    total_orders = initialize_figures_header_response(total_orders_current, total_orders_former, days)
    total_delivered = initialize_figures_header_response(total_delivered_current, total_delivered_former, days)
    total_canceled = initialize_figures_header_response(total_canceled_current, total_canceled_former, days)
    total_revenue = initialize_figures_header_response(total_revenue_current, total_revenue_former, days)
    
    return initialize_dashboard_header_response(total_orders, total_delivered, total_canceled, total_revenue)  

### Dashboard Center
# Pie Chart
async def read_dashboard_center_piechart() -> PieChartResponseSchema:

    # Get the first day of the previous month
    first_day_previous_month = first_day_of_previous_month(now)
    # Get the last day of the previous month
    last_day_previous_month = last_day_of_previous_month(now)
    # Get the dashboard header data of the previous month
    total_orders_previous_month, total_customer_previous_month, total_revenue_previous_month \
            = await get_dashboard_center_piechart_in_period_time(first_day_previous_month, last_day_previous_month)
            
    # Get the first day of the current month
    first_day_current_month = get_start_of_month(now)
    now = datetime.now()
    # Get the dashboard header data of the current month 
    total_orders_current_month, total_customer_current_month, total_revenue_current_month \
            = await get_dashboard_center_piechart_in_period_time(first_day_current_month, now)
            
    # transform data to percentage
    total_order_percentage = int(round(total_orders_current_month / total_orders_previous_month * 100, 2))
    customer_growth_percentage = int(round(total_customer_current_month / total_customer_previous_month * 100, 2))
    total_revenue_percentage = int(round(total_revenue_current_month / total_revenue_previous_month * 100, 2))
     
    # initialize pie chart response                        
    return initialize_pie_chart_response(total_order_percentage, customer_growth_percentage, total_revenue_percentage)

# Dashboard center: in general. All charts (except pie chart) are handled in this function
# Dashboard center: total orders
async def read_dashboard_center_total_orders(periodicity: str = "daily") -> list:
    # Normalize the input
    figures_type = "order"
    periodicity = periodicity.strip().lower()
    
    list_result = await get_figures_dashboard_center_in_general(figures_type, periodicity)
    return list_result

# Dashboard center: total revenue
async def read_dashboard_center_total_revenue(periodicity: str = "daily") -> list:
    # Normalize the input
    figures_type = "revenue"
    periodicity = periodicity.strip().lower()
    
    list_result = await get_figures_dashboard_center_in_general(figures_type, periodicity)
    return list_result

# Dashboard center: total customers
async def read_dashboard_center_customers_map(periodicity: str = "daily") -> list:    
    # Normalize the input
    figures_type = "customer"
    periodicity = periodicity.strip().lower()
    
    list_result = await get_figures_dashboard_center_in_general(figures_type, periodicity)
    return list_result

# Dashboard footer: get the latest 'limit' customer reviews
async def read_dashboard_footer_customer_reviews(skip: int = 0, limit: int = 5) -> list:
    reviews = await get_customer_reviews()
    reviews = await sorted_reviews_by_time(reviews)
    
    return reviews[skip: skip + limit]
    
    
    
    
    
    