from fastapi import APIRouter, Body, Depends, Path
from services.auth_service import verify_password
from schemas.user_schema import CreateOrderSchema, CustomerResponseSchema, UserSchema
from controllers.user_controller import *
from utils.roles import Role
from utils.rbac import get_current_user, role_required
from logging_config import logger 
 
router = APIRouter()
# prefix = "/user"

only_customer_role = [Role.CUSTOMER]

@router.get("/menus", response_description="Get all menu items")
async def read_menus_route():
    return await get_menu_items()


@router.get("/{customer_id}", response_description="Get customer profile")
@role_required(only_customer_role)
async def read_customer_profile_route(customer_id: str = Path(..., example="u1"), current_user: UserSchema = Depends(get_current_user)):
    return await get_customer_profile(customer_id, current_user)


@router.get("/delivery_fee/{customer_id}", response_description="Get delivery fee with respect to address")
@role_required(only_customer_role)
async def read_delivery_fee_route(customer_id: str = Path(..., example="u1"), curent_user: UserSchema = Depends(get_current_user)):
    return await read_delivery_fee(customer_id, curent_user)


@router.put("/{customer_id}", response_description="Update customer profile")
@role_required(only_customer_role)
async def update_customer_profile_route(customer: CustomerResponseSchema, current_user: UserSchema = Depends(get_current_user)):
    return await update_customer_profile(customer, current_user)


@router.delete("/{customer_id}", response_description="Delete customer profile")
@role_required(only_customer_role)
async def delete_customer_profile_route(customer_id: str = Path(..., example="u1"), current_user: UserSchema = Depends(get_current_user)):
    return await delete_user_profile(customer_id, current_user)


@router.post("/orders/{customer_id}", response_description="Create a new order")
@role_required(only_customer_role)
async def create_order_route(customer_id: str = Path(..., example="u1"), 
                             order: CreateOrderSchema = Body(...), 
                             current_user: UserSchema = Depends(get_current_user)):
    return await create_order(customer_id=customer_id, order=order, current_user=current_user)


@router.put("/change-password/{customer_id}", response_description="Update password")
@role_required(only_customer_role)
async def update_password_route(customer_id: str = Path(..., example="u1"), 
                                old_password: str = Body(..., example="old_password"), 
                                new_password: str = Body(..., example="new_password"),
                                current_user: UserSchema = Depends(get_current_user)):    
    return await update_password(customer_id, old_password, new_password, current_user)


@router.get("/orders/history/{customer_id}", response_description="Get all orders of a customer")
@role_required(only_customer_role)
async def read_orders_route(customer_id: str = Path(..., example="u1"), 
                            current_user: UserSchema = Depends(get_current_user)):    
    return await read_orders_history(customer_id, current_user)


@router.get("/orders/history/shipper-info/{order_id}", response_description="Get shipper infor by order id")
@role_required(only_customer_role)
async def read_shipper_infor_by_order_id_route(order_id: str = Path(..., example="o1"), 
                                               current_user: UserSchema = Depends(get_current_user)):
    return await read_shipper_infor_by_order_id(order_id)

@router.post("/logout", response_description="Logout")
@role_required(only_customer_role)
async def logout_route(current_user: UserSchema = Depends(get_current_user)):
    return await logout(current_user)

