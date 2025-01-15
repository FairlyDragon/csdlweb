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
@role_required(only_customer_role)
async def read_customer_profile_route(customer_id: str = Path(..., example="u1"), current_user: UserSchema = Depends(get_current_user)):
    return await get_customer_profile(customer_id, current_user)


@router.put("/{customer_id}", response_description="Update customer profile")
@role_required(only_customer_role)
async def update_customer_profile_route(customer: CustomerResponseSchema, current_user: UserSchema = Depends(get_current_user)):
    return await update_customer_profile(customer, current_user)


@router.delete("/{customer_id}", response_description="Delete customer profile")
@role_required(only_customer_role)
async def delete_customer_profile_route(customer_id: str = Path(..., example="u1"), current_user: UserSchema = Depends(get_current_user)):
    return await delete_user_profile(customer_id, current_user)


