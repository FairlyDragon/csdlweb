from fastapi import APIRouter
from controllers.admin_controller import *

router = APIRouter()
# prefix = "/admin"
# DASHBOARD
router.get("/dashboard/header", response_description="Dashboard's header with filter period")(read_dashboard_header)

router.get("/dashboard/center/piechart", response_description="Pie chart data of dashboard center")(read_dashboard_center_piechart)

router.get("/dashboard/center/total_orders", response_description="Total orders figures list of dashboard center")                 (read_dashboard_center_total_orders)

router.get("/dashboard/center/total_revenue", response_description="Total revenue figures list of dashboard center")(read_dashboard_center_total_revenue)

router.get("/dashboard/center/customers_map", response_description="Customers map figures list of dashboard center")(read_dashboard_center_customers_map)

router.get("/dashboard/footer", response_description="Customer reviews")(read_dashboard_footer_customer_reviews)

# FOODS
router.post("/foods/menuitems", response_description="Add a new menu item")(create_menuitem)

router.put("/foods/menuitems", response_description="Update a menu item by ID")(update_menuitem)

router.delete("/foods/menuitems/{menuitem_id}", response_description="Delete a menu item by ID")(delete_menuitem)

router.get("/foods/menuitems", response_description="Get menu items by fitler")(read_menuitems_by_filter)

router.put("/foods/discount/{discount_percentage}", response_description="Set discount percentage")(update_discount)


# VOUCHERS
router.post("/vouchers", response_description="Create a new voucher")(create_voucher)

router.get("/vouchers/{status}", response_description="Get vouchers by status")(read_vouchers_by_status)

# router.put("/vouchers", response_description="Update a voucher by voucher id")(update_voucher)


# SHIPPERS
router.get("/shippers", response_description="Get shippers")(read_shippers)

router.get("/shippers/{shipper_id}", response_description="Get delivery history by shipper id")(read_delivery_history_by_shipper_id)


# CUSTOMERS
router.get("/customers", response_description="Get customers")(read_customers)

router.get("/customers/{customer_id}", response_description="Get order history by customer id")(read_order_history_by_customer_id)


# DELIVERIES
router.get("/deliveries/active_shippers", response_description="Get number of active shippers")(read_active_shippers)

router.get("/deliveries/currently_waiting_shippers", response_description="Get currently waiting shippers")(read_currently_waiting_shippers)

router.get("/deliveries/delivering_orders", response_description="Get number of delivering orders")(read_delivering_orders)

router.get("/deliveries/waiting_orders", response_description="Get waiting orders")(read_waiting_orders)

# ORDERS (Order List)
# router.get("/orders", response_description="Get order list")(read_order_list)

