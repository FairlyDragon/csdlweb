from fastapi import Depends
from schemas.admin_schema import *
from services.admin_service import *
from services.review_service import *
from services.time_service import *
from services.menu_service import *

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
    now = datetime.now()
    
    # Get the first day of the previous month
    first_day_previous_month = first_day_of_previous_month(now)
    # Get the last day of the previous month
    last_day_previous_month = last_day_of_previous_month(now)
    # Get the dashboard header data of the previous month
    total_orders_previous_month, total_customer_previous_month, total_revenue_previous_month \
            = await get_dashboard_center_piechart_in_period_time(first_day_previous_month, last_day_previous_month)
       
            
    # Get the first day of the current month
    first_day_current_month = get_start_of_month(now)
    # Get the dashboard header data of the current month 
    total_orders_current_month, total_customer_current_month, total_revenue_current_month \
            = await get_dashboard_center_piechart_in_period_time(first_day_current_month, now)
      
            
    # transform data to percentage
    
    if total_orders_previous_month == 0:
        total_order_percentage = 100
    else: 
        total_order_percentage = int(total_orders_current_month / total_orders_previous_month * 100)
    
    if total_customer_previous_month == 0:
        customer_growth_percentage = 100
    else:
        customer_growth_percentage = int(total_customer_current_month / total_customer_previous_month * 100)
    
    if total_revenue_previous_month == 0:
        total_revenue_percentage = 100
    else:
        total_revenue_percentage = int(total_revenue_current_month / total_revenue_previous_month * 100)
     
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
    # get all customer reviews
    reviews = await fetch_reviews()
    return reviews[skip: skip + limit]



##### FOODS ######
# Create a new menu item
async def create_menuitem(menuitem: MenuItemResponseSchema) -> dict: # 
    # create a MenuItem instance from the request body
    menuitem_data = MenuItem( 
                              name=menuitem.name, 
                              description=menuitem.description, 
                              price=menuitem.price, 
                              category=menuitem.category, 
                              image_url=menuitem.image_url,
                              is_active=menuitem.is_active
                              ) 
    # convert the MenuItem instance to a dictionary 
    menuitem_dict = menuitem_data.model_dump(by_alias=True) 
    
    # insert the new menu item into the database
    new_menuitem = await db["menuitem"].insert_one(menuitem_dict) 
    created_menuitem = await db["menuitem"].find_one({"_id": new_menuitem.inserted_id}) 
    if not created_menuitem: 
        raise HTTPException(status_code=404, detail="Menu item not found") 
    
    return created_menuitem

# Update a menu item by ID
async def update_menuitem(menuitem_id: str, menuitem: MenuItemResponseSchema) -> dict:
    update_data = {k: v for k, v in menuitem.model_dump().items() if v is not None} 
    if update_data: 
        result = await db["menuitem"].update_one({"_id": menuitem_id}, {"$set": update_data}) 
        if result.modified_count == 0: 
            raise HTTPException(status_code=404, detail="Menu item not found") 
    
    updated_menuitem = await db["menuitem"].find_one({"_id": menuitem_id}) 
    if not updated_menuitem: 
        raise HTTPException(status_code=404, detail="Menu item not found") 
    
    return updated_menuitem

# Delete a menu item by ID
async def delete_menuitem(menuitem_id: str) -> dict:
    deleted_menuitem = await db["menuitem"].find_one_and_delete({"_id": menuitem_id}) 
    if not deleted_menuitem: 
        raise HTTPException(status_code=404, detail="Menu item not found") 
    
    return deleted_menuitem

# Read menu items by filter
async def read_menuitems_by_filter(category: Optional[str] = Query(None, example="dishes"), 
                            sort_by_price: Optional[str] = Query(None, example="high_to_low"), 
                            stock_status: Optional[str] = Query(None, example="in_stock")
                        ) -> list[dict]:
    
    return await get_menu_items_by_filter(
        category=category, 
        sort_by_price=sort_by_price, 
        stock_status=stock_status)
    

# Create a new discount
async def update_discount(discount_percentage: int) -> dict:
    return await set_discount_percentage(discount_percentage)



    
    
    
    