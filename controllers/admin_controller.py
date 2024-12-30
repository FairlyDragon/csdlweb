from fastapi import Depends
from app.schemas.admin_schema import *
from app.services.admin_service import *
from app.services.time_service import *

### Dashboard Header
async def read_dashboard_header(time_period: TimePeriod = Depends(get_time_period)):
    # current periodical data
    total_orders_current, total_delivered_current, \
        total_cancelled_current, total_revenue_current \
            = await get_dashboard_header_data(time_period.start_date, time_period.end_date)

    # former periodical data
    periodicity_length_time = await get_time_difference(time_period.start_date, time_period.end_date)
    end_date_former = time_period.start_date - timedelta(seconds=1)
    start_date_former = await get_time_difference(end_date_former, periodicity_length_time)
    
    total_orders_former, total_delivered_former, \
        total_cancelled_former, total_revenue_former \
            = await get_dashboard_header_data(start_date_former, end_date_former)
         
    # initialize figure response   
    total_orders = await initialize_figure_header_response(total_orders_current, total_orders_former)
    total_delivered = await initialize_figure_header_response(total_delivered_current, total_delivered_former)
    total_cancelled = await initialize_figure_header_response(total_cancelled_current, total_cancelled_former)
    total_revenue = await initialize_figure_header_response(total_revenue_current, total_revenue_former)
    
    return await initialize_dashboard_header_response(total_orders, total_delivered, total_cancelled, total_revenue)  

### Dashboard Center
# Pie Chart
async def read_dashboard_center_piechart():

    # Get the first day of the previous month
    first_day_previous_month = await first_day_of_previous_month(now)
    # Get the last day of the previous month
    last_day_previous_month = await last_day_of_previous_month(now)
    # Get the dashboard header data of the previous month
    total_orders_previous_month, total_customer_previous_month, total_revenue_previous_month \
            = await get_dashboard_center_piechart_in_period_time(first_day_previous_month, last_day_previous_month)
            
    # Get the first day of the current month
    first_day_current_month = await first_day_of_current_month(now)
    now = datetime.now()
    # Get the dashboard header data of the current month 
    total_orders_current_month, total_customer_current_month, total_revenue_current_month \
            = await get_dashboard_center_piechart_in_period_time(first_day_current_month, now)
            
    # transform data to percentage
    total_order_percentage = int(round(total_orders_current_month / total_orders_previous_month * 100, 2))
    customer_growth_percentage = int(round(total_customer_current_month / total_customer_previous_month * 100, 2))
    total_revenue_percentage = int(round(total_revenue_current_month / total_revenue_previous_month * 100, 2))
     
    # initialize pie chart response                        
    return await initialize_pie_chart_response(total_order_percentage, customer_growth_percentage, total_revenue_percentage)

# Customer map
async def read_dashboard_center_customer_map(figure_type: str, periodicity: str = "daily"):
    # Normalize the input
    figure_type = figure_type.strip().lower()
    periodicity = periodicity.strip().lower()
    
    list_result = get_figure_dashboard_center_data(figure_type, periodicity)
    
    
    
    
    
    