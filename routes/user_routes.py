from fastapi import APIRouter, Depends, Path
from schemas.user_schema import CustomerResponseSchema
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


@router.put("/{customer_id}", response_description="Update customer profile")

async def update_customer_profile_route(customer: CustomerResponseSchema):
    return await update_customer_profile(customer)


@router.delete("/{customer_id}", response_description="Delete customer profile")

async def delete_customer_profile_route(customer_id: str = Path(..., example="u1")):
    return await delete_user_profile(customer_id)


