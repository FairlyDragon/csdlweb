from fastapi import Depends, Path
from models.order_delivery import DeliveryStatusEnum, OrderDelivery
from models.shipper import ShipperStatus
from utils.roles import LimitedRole
from services.voucher_service import get_voucher_by_id
from services.payment_service import get_payment_by_order_id, get_payment_by_order_id_without_raising_error, update_payment_by_id_without_raising_error
from schemas.shipper_schema import Admin_Delivery_Shipper_Schema, ShipperSchema
from config import DISCOUNT_RATE_FOR_SHIPPERS
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
async def read_dashboard_header(time_period: TimePeriod) -> DashBoardHeaderResponseSchema:
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
async def read_dashboard_center_total_orders(periodicity: str) -> list:
    # Normalize the input
    figures_type = "order"
    periodicity = periodicity.strip().lower()
    
    list_result = await get_figures_dashboard_center_in_general(figures_type, periodicity)
    return list_result

# Dashboard center: total revenue
async def read_dashboard_center_total_revenue(periodicity: str) -> list:
    # Normalize the input
    figures_type = "revenue"
    periodicity = periodicity.strip().lower()
    
    list_result = await get_figures_dashboard_center_in_general(figures_type, periodicity)
    return list_result

# Dashboard center: total customers
async def read_dashboard_center_customers_map(periodicity: str) -> list:    
    # Normalize the input
    figures_type = "customer"
    periodicity = periodicity.strip().lower()
    
    list_result = await get_figures_dashboard_center_in_general(figures_type, periodicity)
    return list_result

# Dashboard footer: get the latest 'limit' customer reviews
async def read_dashboard_footer_customer_reviews(skip: int, limit: int) -> list[ReviewDashBoardResponseSchema]:
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
    update_data = {k: v for k, v in menuitem.model_dump().items() if v is not None}
    
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
    deleted_menuitem = await find_and_delete_menuitem_by_id(menuitem_id)
    # REPLACE _id with the menuitem_id 
    deleted_menuitem.setdefault("menuitem_id", deleted_menuitem.pop("_id"))
    
    return deleted_menuitem

# Read menu items by filter
async def read_menuitems_by_filter(category: Optional[str] = None, 
                            sort_by_price: Optional[str] = None, 
                            stock_status: Optional[str] = None
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
async def read_vouchers_by_status(status: str) -> list[dict]: # in essence, this returns list of Voucher instances but replace _id with voucher_id
    for voucher in (list_vouchers:=await get_vouchers_by_status(status.strip().lower())):
        voucher.setdefault("voucher_id", voucher.pop("_id"))
    
    return list_vouchers

# Update a voucher by voucher id
async def update_voucher(voucher: UpdateVoucherSchema) -> dict: # in essence, this returns Voucher instance but replace _id with voucher_id
    # convert the Voucher instance to a dictionary. NOOOAnd only keep the non-None values to ensure data integrity
    update_data = {k: v for k, v in voucher.model_dump().items() if v is not None}
    
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
        shipper["password"] = ""
    
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
        order = await get_order_by_id(order_id)
        
        # Only show "completed" orders because there's a "profit" column
        if delivery.get("delivery_status") in [DeliveryStatusEnum.DELIVERED, DeliveryStatusEnum.FAILED]:
            transformed_delivery_history.append(DeliveryHistoryResponseSchema(
                order_id=order_id, 
                order_date=order["order_date"],
                order_items=[OrderItem(**item).model_dump() for item in order["order_items"]],
                delivery_status=delivery.get("delivery_status"),
                profit=order["delivery_fee"] * (1 - DISCOUNT_RATE_FOR_SHIPPERS) if delivery["delivery_status"] == DeliveryStatusEnum.DELIVERED else 0)
                    .model_dump())
      
    
    # Add aggregated data dict
    transformed_delivery_history.append({
        "total_order_quantity": len(transformed_delivery_history),
        "total_profit": sum(delivery["profit"] for delivery in transformed_delivery_history)
        })

    return transformed_delivery_history

# Get shipper infor by shipper id
async def read_shipper_infor_by_shipper_id(shipper_id: str) -> dict:
    # get shipper infor by shipper id
    shipper_infor = await get_shipper_by_id(shipper_id)
        
    # Replace _id with shipper_id
    shipper_infor.setdefault("shipper_id", shipper_infor.pop("_id"))
    
    return shipper_infor

# Update shipper infor by shipper id
async def update_shipper_info(shipper: ShipperSchema) -> dict:
    shipper_info_dict = {k: v for k, v in shipper.model_dump().items() if v is not None}
    if shipper.shipper_id is None:
        raise HTTPException(status_code=400, detail="Shipper id is required")
    
    modified_count = await update_shipper_by_id(shipper.shipper_id, shipper_info_dict)
    
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Shipper with id {shipper.shipper_id} updated successfully"}

# Delete shipper by shipper id
async def delete_shipper_by_shipper_id(shipper_id: str) -> dict:
    deleted_count = await delete_shipper_by_id(shipper_id)
    
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Shipper with id {shipper_id} deleted successfully"}



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
        if order.get("status") in [OrderStatus.COMPLETED, OrderStatus.CANCELED, OrderStatus.REJECTED]:
            transformed_order_history.append(OrderHistoryResponseSchema(
                customer_id=customer_id,
                order_id=order["_id"], 
                order_date=order["order_date"], 
                order_items=[OrderItem(**item).model_dump() for item in order["order_items"]],
                order_status=order["status"], 
                payment_amount=order["total_amount"])
            .model_dump())
    
    # Aggregate the order history
    transformed_order_history.append({
        "total_order_quantity": len(transformed_order_history),
        "total_purchase": sum(order["payment_amount"] for order in transformed_order_history)
        })
    
    return transformed_order_history

# Get customer infor by customer id
async def read_customer_infor_by_customer_id(customer_id: str) -> dict:
    # Get customer infor by id
    customer_infor = await find_customer_by_id(customer_id)
    
    # Replace _id with customer_id
    customer_infor.setdefault("customer_id", customer_infor.pop("_id"))
    
    return customer_infor

# Update customer info
async def update_customer_info(customer: CustomerResponseSchema) -> dict:
    customer_info_dict = {k:v for k, v in customer.model_dump().items() if v is not None}
    if customer.customer_id is None:
        raise HTTPException(status_code=400, detail="Customer id is required")
    
    modified_count = await update_user_in_db_by_id(customer.customer_id, customer_info_dict)
    
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Customer with id {customer.customer_id} updated successfully"}
    
# Delete customer by customer id
async def delete_customer_by_customer_id(customer_id: str) -> dict:
    deleted_count = await delete_user_in_db_by_id(customer_id)
    
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Customer with id {customer_id} deleted successfully"}


##### DELIVERIES ######
# Get shippers by status
async def read_active_shippers() -> dict:   
    # Get shippers today go to work 
    on_site_shippers = await get_shippers_by_account_status(ShipperStatus.ACTIVE)
    
    return {"number_of_active_shippers": f"{len(on_site_shippers)}"}

# Get currently waiting shippers
async def read_currently_waiting_shippers() -> list[Admin_Delivery_Shipper_Schema]:   
    # Get shippers today go to work 
    on_site_shippers = await get_shippers_by_account_status(ShipperStatus.ACTIVE)
    
    # Get shipper ids in freetime
    shipper_ids_in_freetime = await get_shipper_ids_in_freetime()
    
    active_shippers = [shipper for shipper in on_site_shippers if shipper["_id"] in shipper_ids_in_freetime]
    
    # transform active shippers to Admin_Delivery_Shipper_Schema
    result = []
    for shipper in active_shippers:
        result.append(Admin_Delivery_Shipper_Schema(
            shipper_id=shipper["_id"], 
            name=shipper["name"], 
            address=shipper["address"], 
            phone_number=shipper["phone_number"])
                .model_dump())
    
    if not result:
        raise HTTPException(status_code=404, detail="No currently waiting shippers found")
    return result

# Get delivering orders
async def read_delivering_orders() -> dict:   
    # Get delivering orders. In underlying, it's 'processing' orders
    return {"number_of_delivering_orders": len(await get_delivering_orders())}

# Get waiting orders
async def read_waiting_orders() -> list[dict]:
    # Get waiting orders. In underlying, it's 'pending' orders
    waiting_orders = await get_orders_by_status(OrderStatus.PROCESSING)

    result = []
    for order in waiting_orders:
        # Get customer info according to current order_id among all waiting orders
        customer_who_made_order = await get_customer_infor_by_order_id(order["_id"])
        
        result.append(Admin_Delivery_Order_Managament_Schema(
            order_id=order["_id"], 
            customer_name=customer_who_made_order["name"], 
            address=customer_who_made_order["address"],
            phone_number=customer_who_made_order["phone_number"])
                .model_dump()
        )

    return result

# Get number of waiting orders
async def read_num_of_waiting_orders() -> dict:
    return {"number_of_waiting_orders": len(await get_orders_by_status(OrderStatus.PROCESSING))}

# Get pending orders in details
async def read_pending_orders_detais() -> list[dict]:  # list[AdminOrderListDetailsResponseSchema]
    # Get all pending orders
    pending_orders = await get_orders_by_status(OrderStatus.PENDING)
    
    result = []
    for order in pending_orders:
        # Get customer info according to current order_id among all pending orders
        customer_who_made_order = await get_customer_infor_by_order_id(order["_id"])
        
        # Get payment info according to current order_id among all pending orders
        # 1 - 1 relationship
        payment_by_order_id = await get_payment_by_order_id(order["_id"])
        voucher = await get_voucher_by_id(order["voucher_id"])
        
        result.append(AdminOrderListDetailsResponseSchema(
            order_id=order["_id"], 
            user_id=order["user_id"], 
            name=customer_who_made_order["name"], 
            email=customer_who_made_order["email"], 
            phone_number=customer_who_made_order["phone_number"], 
            address=customer_who_made_order["address"], 
            avatar_url=customer_who_made_order.get("avatar_url", None),
                payment_method=payment_by_order_id["payment_method"],
                    order_date=order["order_date"], 
                    order_items=[
                OrderItemSchema(**{**item, 
                                   "image_url": (await get_menu_item_by_id(menu_item_id=item["menuitem_id"]))["image_url"],
                                   "name": (await get_menu_item_by_id(menu_item_id=item["menuitem_id"]))["name"]}).model_dump()
                for item in order["order_items"]
                    ],
                    total_amount=order["total_amount"], 
                    num_of_items=len(order["order_items"]), 
                    note=order["note"], 
                    status=order["status"], 
                        voucher_code=voucher["code"],
                        discount_applied=order["discount_applied"], 
                        delivery_fee=order["delivery_fee"]
                    ).model_dump()
        )
        
    return result

# Get pending orders in preview
async def read_pending_orders_preview() -> list[dict]:  # list[AdminOrderListPreviewResponseSchema]
    # Get all pending orders
    pending_orders = await get_orders_by_status(OrderStatus.PENDING)   
    
    result = []
    for order in pending_orders:
        # Get customer info according to current order_id among all pending orders
        customer_who_made_order = await get_customer_infor_by_order_id(order["_id"])
        
        result.append(AdminOrderListPreviewResponseSchema(
            order_id=order["_id"], 
            name=customer_who_made_order["name"], 
            phone_number=customer_who_made_order["phone_number"], 
            order_date=order["order_date"], 
            email=customer_who_made_order["email"],
            address=customer_who_made_order["address"],
            num_of_items=len(order["order_items"]), 
            status=order["status"]
        ).model_dump()
        )
        
    return result

# Get passed-pending orders in preview
async def read_passed_pending_orders_preview() -> list[dict]:  # list[AdminOrderListPreviewResponseSchema]
    # Get all passed-pending orders (except pending orders)
    passed_pending_orders = await get_orders_by_status_excluding(OrderStatus.PENDING)
    
    result = []
    for order in passed_pending_orders:
        # Get customer info according to current order_id among all pending orders
        customer_who_made_order = await get_customer_infor_by_order_id(order["_id"])
        
        result.append(AdminOrderListPreviewResponseSchema(
            order_id=order["_id"], 
            name=customer_who_made_order["name"], 
            phone_number=customer_who_made_order["phone_number"], 
            address=customer_who_made_order["address"],
            email=customer_who_made_order["email"],
            order_date=order["order_date"], 
            num_of_items=len(order["order_items"]), 
            status=order["status"]
        ).model_dump()
        )
        
    return result

# Get passed-pending orders in details
async def read_passed_pending_orders_details() -> list[dict]:  # list[AdminOrderListDetailsResponseSchema]
    # Get all passed-pending orders (except pending orders)
    passed_pending_orders = await get_orders_by_status_excluding(OrderStatus.PENDING)
    
    result = []
    for order in passed_pending_orders:
        # Get customer info according to current order_id among all pending orders
        customer_who_made_order = await get_customer_infor_by_order_id(order["_id"])
        
        order_delivery_object = await get_order_delivery_by_order_id(order["_id"])
        shipper_who_shipped = await get_shipper_by_id(order_delivery_object["shipper_id"]) if order_delivery_object else None
        
        # Get payment info according to current order_id among all pending orders
        # 1 - 1 relationship
        payment_by_order_id = await get_payment_by_order_id(order["_id"])
        voucher = await get_voucher_by_id(order["voucher_id"])
        
        result.append(AdminOrderListDetailsResponseSchema(
            order_id=order["_id"], 
            user_id=order["user_id"], 
            name=customer_who_made_order["name"], 
            email=customer_who_made_order["email"], 
            phone_number=customer_who_made_order["phone_number"], 
            address=customer_who_made_order["address"], 
            avatar_url=customer_who_made_order.get("avatar_url", None),
                payment_method=payment_by_order_id["payment_method"],
                payment_status=payment_by_order_id["payment_status"],
                    order_date=order["order_date"], 
                    order_items=[
                OrderItemSchema(**{**item, 
                                   "image_url": (await get_menu_item_by_id(menu_item_id=item["menuitem_id"]))["image_url"],
                                   "name": (await get_menu_item_by_id(menu_item_id=item["menuitem_id"]))["name"],
                                   }).model_dump()
                for item in order["order_items"]
                    ],
                    total_amount=order["total_amount"], 
                    num_of_items=len(order["order_items"]), 
                    note=order["note"], 
                    status=order["status"], 
                        voucher_code=voucher["code"],
                        discount_applied=order["discount_applied"], 
                        delivery_fee=order["delivery_fee"],
                            shipper_name=shipper_who_shipped["name"] if shipper_who_shipped else None
                    ).model_dump()
        )
        
    return result

# Update role of user
async def update_role_of_user(id: str, role: LimitedRole) -> dict:
    user = await find_user_by_id(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user["role"] == role:
        raise HTTPException(status_code=400, detail="Role is already same")
    
    modified_count = await update_user_in_db_by_id(id, {"role": role})
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": f"Role of user with id {id} updated successfully"}

# Update order status
async def update_order(order_id: str, status: str) -> dict:
    """
    There's two main tasks to be done here:
    1. Update order status
    2. Update payment status IMPLICITLY if order is rejected {"payment_status": PaymentStatus.FAILED}
    """
    
    """1. Update order status"""
    if not await get_order_by_id(order_id):
        raise HTTPException(status_code=404, detail="Order not found")
    
    status = status.strip().lower()
    if status not in [OrderStatus.PROCESSING, OrderStatus.REJECTED]:
        raise HTTPException(status_code=400, detail="Invalid order status")
    
    modified_count = await update_order_in_db_by_id(order_id, {"status": status})
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    """2. Update payment status IMPLICITLY if order is rejected"""
    if status == OrderStatus.REJECTED:
        payment_accordingly = await get_payment_by_order_id_without_raising_error(order_id)
        if not payment_accordingly:
            pass
        else:
            await update_payment_by_id_without_raising_error(payment_accordingly["_id"], {"payment_status": PaymentStatus.FAILED})
    
    return {"message": f"Order with id {order_id} updated status to {status}"}

# Create order delivery object
async def assign_order_to_shipper(order_id: str, shipper_id: str) -> dict:
    """
    In essence, this function creates an order delivery object and inserts it into the database with initial status as 'delivering'
    """
    
    # Check if the order exists
    if not await get_order_by_id(order_id):
        raise HTTPException(status_code=404, detail="Order not found")
        
    # Check if the shipper exists
    if not await get_shipper_by_id(shipper_id):
        raise HTTPException(status_code=404, detail="Shipper not found")
        
    # Create order delivery object
    order_delivery = OrderDelivery(order_id=order_id, shipper_id=shipper_id, delivery_status=DeliveryStatusEnum.DELIVERING)
    
    # Insert the order delivery object into the database
    await insert_order_delivery_to_db(order_delivery.model_dump(by_alias=True))
    
    return {"message": f"Assigned order with id {order_id} to shipper with id {shipper_id}"}


### Report ###
# Get order report of all customers
async def get_customer_report(start_time: datetime, end_time: datetime):
    # Get all customers from the database
    all_customers = await get_customers()
    
    figures_of_all_customers = []       # result
    # Get all orders for each customer
    for customer in all_customers:
        # Only fetching completed orders
        #   and within the time period
        all_orders = [order for order in (await get_order_history_by_customer_id(customer["_id"])) 
                                    if order["status"] == OrderStatus.COMPLETED and start_time <= order["order_date"] <= end_time]
        
        figures_of_all_customers.append(AdminReportCustomerSchema(
            customer_name=customer["name"],
            email=customer["email"],
            phone_number=customer["phone_number"],
            address=customer["address"],
            created_at=customer["created_at"],
                total_order=len(all_orders),
                total_purchase=sum([order["total_amount"] for order in all_orders]),
            )
            .model_dump())
        
    figures_of_all_customers.append({
        "total_order_quantity": sum([ele["total_order"] for ele in figures_of_all_customers]),
        "total_purchase_from_customers": sum([ele["total_purchase"] for ele in figures_of_all_customers]),
    })
    
    if not figures_of_all_customers:
        raise HTTPException(status_code=404, detail="No customers order history found")
    
    return figures_of_all_customers

# Get delivery report of all shippers
async def get_shipper_report(start_time: datetime, end_time: datetime):
    # Get all shippers from the database
    all_shippers = await get_shippers()
    
    figures_of_all_shippers = []       # result
    # Get all orders for each shipper
    for shipper in all_shippers:
        # Only fetching completed orders
        #   and within the time period
        completed_orders = [order for order in (await get_orders_within_period(start_time=start_time, end_time=end_time)) 
                                    if start_time <= order["order_date"] <= end_time 
                                                and order["status"] == OrderStatus.COMPLETED]
        
        # Only fetching delivered order_deliveries
        all_delivered = [order_delivery for order_delivery in (await get_delivery_history_by_shipper_id(shipper["_id"])) if order_delivery["delivery_status"] == DeliveryStatusEnum.DELIVERED]
        
        # Get order ids from delivered order_deliveries
        order_ids = set([order_delivery["order_id"] for order_delivery in all_delivered])
        
        # Filter to get orders that meet the two conditions
        final_orders = [order for order in completed_orders if order["_id"] in order_ids]
        
        figures_of_all_shippers.append(AdminReportShipperSchema(
            shipper_name=shipper["name"],
            email=shipper["email"],
            phone_number=shipper["phone_number"],
            address=shipper["address"],
            created_at=shipper["created_at"],
                total_delivery=len(final_orders),
                total_income=sum(order.get("delivery_fee", 0) * (1 - DISCOUNT_RATE_FOR_SHIPPERS) for order in final_orders),
            )
            .model_dump())
        
    figures_of_all_shippers.append({
        "total_delivery_quantity": sum([ele["total_delivery"] for ele in figures_of_all_shippers]),
        "total_income_from_shippers": sum([ele["total_income"] for ele in figures_of_all_shippers]),
    })
    
    if not figures_of_all_shippers:
        raise HTTPException(status_code=404, detail="No shippers order_delivery history found")
        
    return figures_of_all_shippers

# Get restaurant's figure report
async def get_restaurant_report(start_time: datetime, end_time: datetime):
    all_completed_orders = [order for order in (await get_orders_within_period(start_time, end_time))
                                    if order["status"] == OrderStatus.COMPLETED]
    
    if not all_completed_orders:
        raise HTTPException(status_code=404, detail="No completed orders found")
    
    return {
        "total_food_quantity": sum([item["quantity"] 
                                    for order in all_completed_orders 
                                        for item in order["order_items"]]),
        "total_revenue": sum([order["total_amount"] for order in all_completed_orders]),
    }
    
        
    
    
    


    
    
    
    