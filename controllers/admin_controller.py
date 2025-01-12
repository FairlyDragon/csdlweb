from fastapi import Depends, Path
from schemas.user_schema import CustomerResponseSchema
from services.user_service import *
from schemas.admin_schema import *
from services.admin_service import *
from services.review_service import *
from services.time_service import *
from services.menu_service import *
from models.voucher import *
from services.shipper_service import *

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
async def read_dashboard_footer_customer_reviews(skip: int = 0, limit: int = 5) -> list[ReviewDashBoardResponseSchema]:
    # get all customer reviews
    reviews = await fetch_reviews()
    if skip > len(reviews) or not reviews:
        raise HTTPException(status_code=404, detail="No reviews found")
    
    return reviews[skip: skip + limit]


##### FOODS ######
# Create a new menu item
async def create_menuitem(menuitem: CreateMenuItemSchema) -> dict:  # in essence, this returns MenuItem instance but replace _id with menuitem_id
    # create a MenuItem instance from the request body
    menuitem_dict = MenuItem(**menuitem.model_dump()) 
    
    # insert the new menu item into the database
    inserted_menuitem = await insert_menuitem_to_db(menuitem_dict)
    
    # REPLACE _id with the menuitem_id 
    inserted_menuitem.setdefault("menuitem_id", inserted_menuitem.pop("_id"))
    
    return inserted_menuitem

# Update a menu item by ID
async def update_menuitem(menuitem: UpdateMenuItemSchema) -> dict: # in essence, this returns MenuItem instance but replace _id with menuitem_id
    # convert the MenuItem instance to a dictionary 
    update_data = {k: v for k, v in menuitem.model_dump().items()}
    
    # update the menu item in the database
    if update_data: 
        updated_menuitem = await update_menuitem_by_id(menuitem.menuitem_id, update_data)

    # get the updated menu item from the database
    updated_menuitem = await get_menu_item_by_id(menuitem.menuitem_id)
    
    if not updated_menuitem: 
        raise HTTPException(status_code=404, detail="Menu item not found") 
    
    updated_menuitem.setdefault("menuitem_id", updated_menuitem.pop("_id"))
    
    return updated_menuitem

# Delete a menu item by ID
async def delete_menuitem(menuitem_id: str) -> dict:  # in essence, this returns MenuItem instance but replace _id with menuitem_id
    deleted_menuitem = await db["menuitem"].find_one_and_delete({"_id": menuitem_id}) 
    if not deleted_menuitem: 
        raise HTTPException(status_code=404, detail="Menu item not found") 
    
    # REPLACE _id with the menuitem_id 
    deleted_menuitem.setdefault("menuitem_id", deleted_menuitem.pop("_id"))
    
    return deleted_menuitem

# Read menu items by filter
async def read_menuitems_by_filter(category: Optional[str] = Query(None, example="dishes"), 
                            sort_by_price: Optional[str] = Query(None, example="high_to_low"), 
                            stock_status: Optional[str] = Query(None, example="in_stock")
                        ) -> list[dict]:   # in essence, this returns list of MenuItem instances but replace _id with menuitem_id
    
    for item in (list_items:=await get_menu_items_by_filter(
                                                    category=category, 
                                                    sort_by_price=sort_by_price, 
                                                    stock_status=stock_status)):
        item.setdefault("menuitem_id", item.pop("_id"))
        
    return list_items
    

# Create a new discount
async def update_discount(discount_percentage: int) -> dict:
    # Just return a dict encompasses 'the message and the modified count'
    return await set_discount_percentage(discount_percentage)


# Create a new voucher
async def create_voucher(voucher: CreateVoucherSchema) -> dict: # in essence, this returns Voucher instance but replace _id with voucher_id
    # check if the voucher start date is before the end date
    if voucher.start_date > voucher.end_date:
        raise HTTPException(status_code=400, detail="Start date must be before end date")
    
    # check if the voucher code already exists
    available_voucher = await get_vouchers_by_status("available")
    if voucher.code in [voucher["code"] for voucher in available_voucher]:
        raise HTTPException(status_code=400, detail="Voucher code already exists")
    
    # create a Voucher instance before inserting it into the database
    insert_voucher = Voucher(code = voucher.code, 
                               start_date = voucher.start_date, 
                               end_date = voucher.end_date, 
                               discount_percentage = voucher.discount_percentage, 
                               discount_amount=voucher.discount_amount, 
                               minimum_order_amount=voucher.minimum_order_amount, 
                               total_usage_limit=voucher.total_usage_limit,
                               used=0)  
    
    # insert the voucher into the database
    inserted_voucher = await insert_voucher_to_db(insert_voucher)
    
    # REPLACE _id with the voucher_id 
    inserted_voucher.setdefault("voucher_id", inserted_voucher.pop("_id"))
    
    return inserted_voucher

# Get vouchers by status
async def read_vouchers_by_status(status: str = Path(..., example="available")) -> list[dict]: # in essence, this returns list of Voucher instances but replace _id with voucher_id
    for voucher in (list_vouchers:=await get_vouchers_by_status(status.strip().lower())):
        voucher.setdefault("voucher_id", voucher.pop("_id"))
    
    return list_vouchers

# Update a voucher by voucher id
async def update_voucher(voucher: UpdateVoucherSchema) -> dict: # in essence, this returns Voucher instance but replace _id with voucher_id
    # convert the Voucher instance to a dictionary. NOOOAnd only keep the non-None values to ensure data integrity
    update_data = {k: v for k, v in voucher.model_dump().items()}
    
    # update the voucher in the database
    updated_voucher = await update_voucher_by_id(voucher.voucher_id, update_data)
    
    if not updated_voucher:
        raise HTTPException(status_code=404, detail="Voucher not found")
    
    # REPLACE _id with the voucher_id 
    updated_voucher.setdefault("voucher_id", updated_voucher.pop("_id"))
    
    return updated_voucher

###### SHIPPERS ######
# Get shippers
async def read_shippers() -> list[dict]:    # in essence, this returns list of Shipper instances but replace _id with shipper_id
    # get shippers from db
    shippers_from_db = await get_shippers()
    
    # transform the shippers from db to the desired format: eliminate the password field and replace _id with shipper_id
    for shipper in shippers_from_db:
        # replace _id with shipper_id
        shipper.setdefault("shipper_id", shipper.pop("_id"))
        # Ensure to hide the password
        shipper.pop("password")
    
    return shippers_from_db

# Get delivery history by shipper id
async def read_delivery_history_by_shipper_id(shipper_id: str) -> list[dict]:
    # get delivery history by shipper id
    delivery_history = await get_delivery_history_by_shipper_id(shipper_id)
    
    transformed_delivery_history = []
    
    # transform the delivery history to the desired format: replace _id with order_id
    for delivery in delivery_history:
        order_id = delivery["order_id"]
        # Get order with _id = order_id
        order = await db["order"].find_one({"_id": order_id})
        
        # Only show "completed" orders because there's a "profit" column
        if order["status"] == OrderStatus.completed:
            transformed_delivery_history.append(DeliveryHistoryResponseSchema(
                order_id=order_id, 
                order_date=order["order_date"],
                order_items=[OrderItem(**item).model_dump() for item in order["order_items"]],
                profit=order["total_amount"],)
                    .model_dump())
            
    
    transformed_delivery_history.append({
        "total_order_quantity": len(transformed_delivery_history),
        "total_cod": sum(delivery["profit"] for delivery in transformed_delivery_history)
        })

    return transformed_delivery_history

###### CUSTOMERS ######
# Get customers
async def read_customers() -> list[dict]:
    # get customers from db
    customers_from_db = await get_customers()
    
    # transform the customers from db to the desired format: eliminate the password field and replace _id with customer_id
    transformed_customers = []
    for customer in customers_from_db:
        # replace _id with customer_id
        customer.setdefault("customer_id", customer.pop("_id"))
        
        # model dump to CustomerResponseSchema in order to hide the password field and ensure integrity
        customer = CustomerResponseSchema(**customer).model_dump()
        transformed_customers.append(customer)
    
    return transformed_customers

# Get order history by customer id
async def read_order_history_by_customer_id(customer_id: str) -> list[dict]:
    # get order history by customer id
    order_history = await get_order_history_by_customer_id(customer_id)
    
    transformed_order_history = []
    # transform the order history to the desired format: replace _id with order_id
    for order in order_history:
        
        # Only add the order_id field if the order is "completed"
        if order["status"] == OrderStatus.completed:
            transformed_order_history.append(OrderHistoryResponseSchema(
                order_id=order["_id"], 
                order_date=order["order_date"], 
                order_items=[OrderItem(**item).model_dump() for item in order["order_items"]], 
                payment_amount=order["total_amount"])
            .model_dump())
    
    # Aggregate the order history
    transformed_order_history.append({
        "total_order_quantity": len(transformed_order_history),
        "total_purchase": sum(order["payment_amount"] for order in transformed_order_history)
        })
    
    return transformed_order_history




    
    
    
    