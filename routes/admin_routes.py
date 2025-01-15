from fastapi import APIRouter
from controllers.admin_controller import *
from utils.rbac import get_current_user, role_required, oauth2_scheme
from utils.roles import LimitedRole, Role

router = APIRouter()
# prefix = "/admin"

any_admin_roles = [Role.SUPERADMIN, Role.ADMIN]
only_superadmin_role = [Role.SUPERADMIN]

# DASHBOARD
@router.get("/dashboard/header", response_description="Get dashboard header data")

async def dashboard_header( time_period: TimePeriod = Depends(get_time_period)):
    return await read_dashboard_header(time_period=time_period)


@router.get("/dashboard/center/piechart", response_description="Pie chart data of dashboard center")

async def dashboard_center_piechart():
    return await read_dashboard_center_piechart()


@router.get("/dashboard/center/total_orders", response_description="Total orders figures list of dashboard center") 

async def dashboard_center_total_orders( periodicity: str = "daily"):
    return await read_dashboard_center_total_orders(periodicity=periodicity)


@router.get("/dashboard/center/total_revenue", response_description="Total revenue figures list of dashboard center")

async def dashboard_center_total_revenue( periodicity: str = "daily"):
    return await read_dashboard_center_total_revenue(periodicity=periodicity)


@router.get("/dashboard/center/customers_map", response_description="Customers map figures list of dashboard center")

async def dashboard_center_customers_map( periodicity: str = "daily"):
    return await read_dashboard_center_customers_map(periodicity=periodicity)


@router.get("/dashboard/footer", response_description="Customer reviews")

async def dashboard_footer( skip: int = 0, limit: int = 5):
    return await read_dashboard_footer_customer_reviews(skip=skip, limit=limit)


# FOODS
@router.post("/foods/menuitems", response_description="Add a new menu item")

async def create_menuitem_route(menuitem: CreateMenuItemSchema):
    return await create_menuitem(menuitem)


@router.put("/foods/menuitems", response_description="Update a menu item")

async def update_menuitem_route(menuitem: UpdateMenuItemSchema):
    return await update_menuitem(menuitem)


@router.delete("/foods/menuitems/{menuitem_id}", response_description="Delete a menu item by ID")

async def delete_menuitem_route(menuitem_id: str):
    return await delete_menuitem(menuitem_id)


@router.get("/foods/menuitems", response_description="Get menu items by fitler")

async def read_menuitems_by_filter_route(category: Optional[str] = Query(None, example="dishes"), 
                            sort_by_price: Optional[str] = Query(None, example="high_to_low"), 
                            stock_status: Optional[str] = Query(None, example="in_stock"),
                            
                        ):
    return await read_menuitems_by_filter(category, sort_by_price, stock_status)


@router.post("/foods/discount/{discount_percentage}", response_description="Set discount percentage")

async def set_discount_percentage_route(discount_percentage: int):
    return await set_discount_percentage(discount_percentage)


# VOUCHERS
@router.post("/vouchers", response_description="Create a new voucher")

async def create_voucher_route(voucher: CreateVoucherSchema):
    return await create_voucher(voucher)


@router.get("/vouchers/{status}", response_description="Get vouchers by status")

async def read_vouchers_by_status_route(status: str = Path(..., example="available")):
    return await read_vouchers_by_status(status)

# router.put("/vouchers", response_description="Update a voucher by voucher id")(update_voucher)



# SHIPPERS
@router.get("/shippers", response_description="Get all shippers")

async def read_shippers_route():
    return await read_shippers()


@router.get("/shippers/history/{shipper_id}", response_description="Get delivery history by shipper id")

async def read_delivery_history_by_shipper_id_route(shipper_id: str):
    return await read_delivery_history_by_shipper_id(shipper_id)


@router.get("/shippers/{shipper_id}", response_description="Get shipper infor by shipper id")

async def read_shipper_infor_by_shipper_id_route(shipper_id: str):
    return await read_shipper_infor_by_shipper_id(shipper_id)

@router.put("/shippers", response_description="Update shipper infor by shipper id")
 
async def update_shipper_infor_by_shipper_id_route(shipper: ShipperSchema):
    return await update_shipper_info(shipper)


@router.delete("/shippers/{shipper_id}", response_description="Delete shipper by shipper id")

async def delete_shipper_by_shipper_id_route(shipper_id: str):
    return await delete_shipper_by_shipper_id(shipper_id)



# CUSTOMERS
@router.get("/customers", response_description="Get customers")

async def read_customers_route():
    return await read_customers()


@router.get("/customers/history/{customer_id}", response_description="Get order history by customer id")

async def read_order_history_by_customer_id_route(customer_id: str):
    return await read_order_history_by_customer_id(customer_id)


@router.get("/customers/{customer_id}", response_description="Get customer infor by customer id")

async def read_customer_infor_by_customer_id_route(customer_id: str):
    return await read_customer_infor_by_customer_id(customer_id)


@router.put("/customers", response_description="Update customer infor by customer id")

async def update_customer_infor_by_customer_id_route(customer: CustomerResponseSchema):
    return await update_customer_info(customer)


@router.delete("/customers/{customer_id}", response_description="Delete customer by customer id")

async def delete_customer_by_customer_id_route(customer_id: str):
    return await delete_customer_by_customer_id(customer_id)



# DELIVERIES
@router.get("/deliveries/active_shippers", response_description="Get number of active shippers")

async def read_active_shippers_route():
    return await read_active_shippers()


@router.get("/deliveries/currently_waiting_shippers", response_description="Get currently waiting shippers")

async def read_currently_waiting_shippers_route():
    return await read_currently_waiting_shippers()


@router.get("/deliveries/delivering_orders", response_description="Get number of delivering orders")

async def read_delivering_orders_route():
    return await read_delivering_orders()


@router.get("/deliveries/waiting_orders", response_description="Get waiting orders")

async def read_waiting_orders_route():
    return await read_waiting_orders()


@router.get("/deliveries/num_of_waiting_orders", response_description="Get number of waiting orders")

async def read_num_of_waiting_orders_route():
    return await read_num_of_waiting_orders()



# ORDERS (Order List)
@router.get("/orders/pending/preview", response_description="Get all the pending orders in preview")

async def read_pending_orders_preview_route():
    return await read_pending_orders_preview()


@router.get("/orders/pending/details", response_description="Get all the pending orders in details")

async def read_pending_orders_detais_route():
    return await read_pending_orders_detais()


@router.get("/orders/passed/preview", response_description="Get all the passed-pending orders in preview")

async def read_passed_pending_orders_preview_route():
    return await read_passed_pending_orders_preview()


@router.get("/orders/passed/details", response_description="Get all the passed-pending orders in details")

async def read_passed_pending_orders_details_route():
    return await read_passed_pending_orders_details()



# SUBADMINS
# only for superadmin
@router.put("/subadmins/{id}", response_description="Empower/revoke admin for customer")

async def update_role_of_user_route(id: str, role: LimitedRole = Query(..., example="admin")):
    return await update_role_of_user(id, role)

