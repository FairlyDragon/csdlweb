from fastapi import APIRouter, Body, Depends, Path
from services.auth_service import verify_password
from schemas.user_schema import CreateOrderSchema, CustomerResponseSchema
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
async def read_customer_profile_route(customer_id: str = Path(..., example="u1")):
    return await get_customer_profile(customer_id)


@router.get("/delivery_fee/{customer_id}", response_description="Get delivery fee with respect to address")

async def read_delivery_fee_route(customer_id: str = Path(..., example="u1")):
    return await read_delivery_fee(customer_id)


@router.put("/{customer_id}", response_description="Update customer profile")

async def update_customer_profile_route(customer: CustomerResponseSchema):
    return await update_customer_profile(customer)


@router.delete("/{customer_id}", response_description="Delete customer profile")

async def delete_customer_profile_route(customer_id: str = Path(..., example="u1")):
    return await delete_user_profile(customer_id)


@router.post("/orders/{customer_id}", response_description="Create a new order")

async def create_order_route(customer_id: str = Path(..., example="u1"), order: CreateOrderSchema = Body(...)):
    return await create_order(customer_id=customer_id, order=order)


@router.put("/change-password/{customer_id}", response_description="Update password")

async def update_password_route(customer_id: str = Path(..., example="u1"), old_password: str = Body(..., example="old_password"), new_password: str = Body(..., example="new_password")):
    return await update_password(customer_id, old_password, new_password)


@router.get("/orders/history/{customer_id}", response_description="Get all orders of a customer")

async def read_orders_route(customer_id: str = Path(..., example="u1")):
    return await read_orders_history(customer_id)

# @router.get("/orders/")

