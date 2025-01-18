
from fastapi import APIRouter, Body, Depends, Path
from controllers.user_controller import delete_shipper_profile, get_shipper_history, get_shipper_profile, logout, read_assigned_order_delivery, update_order_delivery, update_password_shipper, update_shipper_profile
from schemas.shipper_schema import ShipperSchema
from schemas.user_schema import UserSchema
from utils.rbac import get_current_user, role_required
from utils.roles import Role

router = APIRouter()
# prefix = "/shipper"

only_shipper_role = [Role.SHIPPER]

@router.get("/{shipper_id}", response_description="Get shipper profile")
@role_required(only_shipper_role)
async def read_shipper_profile_route(shipper_id: str = Path(..., example="s1"), current_user: UserSchema = Depends(get_current_user)):
    return await get_shipper_profile(shipper_id, current_user)


@router.put("/{shipper_id}", response_description="Update shipper profile")
@role_required(only_shipper_role)
async def update_shipper_profile_route(shipper: ShipperSchema, current_user: UserSchema = Depends(get_current_user)):
    return await update_shipper_profile(shipper, current_user)


@router.delete("/{shipper_id}", response_description="Delete shipper profile")
@role_required(only_shipper_role)
async def delete_shipper_profile_route(shipper_id: str = Path(..., example="s1"), current_user: UserSchema = Depends(get_current_user)):
    return await delete_shipper_profile(shipper_id, current_user)

@router.put("/change-password/{shipper_id}", response_description="Update password")
@role_required(only_shipper_role)
async def update_password_route(shipper_id: str = Path(..., example="s1"), 
                                old_password: str = Body(..., example="old_password"), 
                                new_password: str = Body(..., example="new_password"),
                                current_user: UserSchema = Depends(get_current_user)):
    return await update_password_shipper(shipper_id, old_password, new_password, current_user)

@router.get("/history/{shipper_id}", response_description="Get shipper history")
@role_required(only_shipper_role)
async def get_shipper_history_route(shipper_id: str = Path(..., example="s1"), 
                                    current_user: UserSchema = Depends(get_current_user)):
    return await get_shipper_history(shipper_id, current_user)

@router.get("/deliveries/for-me/{shipper_id}", response_description="Get order has just been assigned for shipper")   # Get delivering orders in order_delivery 
@role_required(only_shipper_role)
async def read_assigned_order_delivery_route(shipper_id: str = Path(..., example="s1"), 
                                             current_user: UserSchema = Depends(get_current_user)):
    return await read_assigned_order_delivery(shipper_id, current_user)

@router.put("/deliveries/{delivery_status}", response_description="Update status of order delivery")
@role_required(only_shipper_role)
async def update_order_delivery_route(delivery_status: str = Path(..., example="delivered"), 
                                      current_user: UserSchema = Depends(get_current_user)):
    return await update_order_delivery(delivery_status, current_user)

@router.post("/logout", response_description="Logout")
@role_required(only_shipper_role)
async def logout_route(current_user: UserSchema = Depends(get_current_user)):
    return await logout(current_user)