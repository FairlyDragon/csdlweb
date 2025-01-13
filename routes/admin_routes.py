from fastapi import APIRouter
from controllers.admin_controller import *
from utils.rbac import role_required
from utils.roles import Role

router = APIRouter()
# prefix = "/admin"

any_admin_roles = [Role.SUPERADMIN, Role.ADMIN]
only_superadmin_role = [Role.SUPERADMIN]

# DASHBOARD
@router.get("/dashboard/header", response_description="Get dashboard header data")
@role_required(any_admin_roles)
async def dashboard_header():
    return await read_dashboard_header()


@router.get("/dashboard/center/piechart", response_description="Pie chart data of dashboard center")
@role_required(any_admin_roles)
async def dashboard_center_piechart():
    return await read_dashboard_center_piechart()


@router.get("/dashboard/center/total_orders", response_description="Total orders figures list of dashboard center") 
@role_required(any_admin_roles)
async def dashboard_center_total_orders():
    return await read_dashboard_center_total_orders()


@router.get("/dashboard/center/total_revenue", response_description="Total revenue figures list of dashboard center")
@role_required(any_admin_roles)
async def dashboard_center_total_revenue():
    return await read_dashboard_center_total_revenue()


@router.get("/dashboard/center/customers_map", response_description="Customers map figures list of dashboard center")
@role_required(any_admin_roles)
async def dashboard_center_customers_map():
    return await read_dashboard_center_customers_map()


@router.get("/dashboard/footer", response_description="Customer reviews")
@role_required(any_admin_roles)
async def dashboard_footer():
    return await read_dashboard_footer_customer_reviews()


# FOODS
@router.post("/foods/menuitems", response_description="Add a new menu item")
@role_required(any_admin_roles)
async def create_menuitem_route(menuitem: CreateMenuItemSchema):
    return await create_menuitem(menuitem)


@router.put("/foods/menuitems", response_description="Update a menu item")
@role_required(any_admin_roles)
async def update_menuitem_route(menuitem: UpdateMenuItemSchema):
    return await update_menuitem(menuitem)


@router.delete("/foods/menuitems/{menuitem_id}", response_description="Delete a menu item by ID")
@role_required(any_admin_roles)
async def delete_menuitem_route(menuitem_id: str):
    return await delete_menuitem(menuitem_id)


@router.get("/foods/menuitems", response_description="Get menu items by fitler")
@role_required(any_admin_roles)
async def read_menuitems_by_filter_route(category: Optional[str] = Query(None, example="dishes"), 
                            sort_by_price: Optional[str] = Query(None, example="high_to_low"), 
                            stock_status: Optional[str] = Query(None, example="in_stock")
                        ):
    return await read_menuitems_by_filter(category, sort_by_price, stock_status)


@router.post("/foods/discount/{discount_percentage}", response_description="Set discount percentage")
@role_required(any_admin_roles)
async def set_discount_percentage_route(discount_percentage: int):
    return await set_discount_percentage(discount_percentage)


# VOUCHERS
@router.post("/vouchers", response_description="Create a new voucher")
@role_required(any_admin_roles)
async def create_voucher_route(voucher: CreateVoucherSchema):
    return await create_voucher(voucher)


@router.get("/vouchers/{status}", response_description="Get vouchers by status")
@role_required(any_admin_roles)
async def read_vouchers_by_status_route(status: str = Path(..., example="available")):
    return await read_vouchers_by_status(status)

# router.put("/vouchers", response_description="Update a voucher by voucher id")(update_voucher)


# SHIPPERS
@router.get("/shippers", response_description="Get shippers")
@role_required(any_admin_roles)
async def read_shippers_route():
    return await read_shippers()


##### Consider 
@router.get("/shippers/{shipper_id}", response_description="Get delivery history by shipper id")
@role_required(any_admin_roles)
async def read_delivery_history_by_shipper_id_route(shipper_id: str):
    return await read_delivery_history_by_shipper_id(shipper_id)


# CUSTOMERS
@router.get("/customers", response_description="Get customers")
@role_required(any_admin_roles)
async def read_customers_route():
    return await read_customers()

@router.get("/customers/{customer_id}", response_description="Get order history by customer id")
@role_required(any_admin_roles)
async def read_order_history_by_customer_id_route(customer_id: str):
    return await read_order_history_by_customer_id(customer_id)


# DELIVERIES
@router.get("/deliveries/active_shippers", response_description="Get number of active shippers")
@role_required(any_admin_roles)
async def read_active_shippers_route():
    return await read_active_shippers()


@router.get("/deliveries/currently_waiting_shippers", response_description="Get currently waiting shippers")
@role_required(any_admin_roles)
async def read_currently_waiting_shippers_route():
    return await read_currently_waiting_shippers()


@router.get("/deliveries/delivering_orders", response_description="Get number of delivering orders")
@role_required(any_admin_roles)
async def read_delivering_orders_route():
    return await read_delivering_orders()


@router.get("/deliveries/waiting_orders", response_description="Get waiting orders")
@role_required(any_admin_roles)
async def read_waiting_orders_route():
    return await read_waiting_orders()

# ORDERS (Order List)
# router.get("/orders", response_description="Get order list")(read_order_list)

