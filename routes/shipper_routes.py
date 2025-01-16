
from fastapi import APIRouter, Depends, Path
from controllers.user_controller import delete_shipper_profile, get_shipper_profile, update_shipper_profile
from schemas.shipper_schema import ShipperSchema
from schemas.user_schema import UserSchema
from utils.rbac import get_current_user, role_required
from utils.roles import Role

router = APIRouter()
# prefix = "/shipper"

only_shipper_role = [Role.SHIPPER]

@router.get("/{shipper_id}", response_description="Get shipper profile")

async def read_shipper_profile_route(shipper_id: str = Path(..., example="s1")):
    return await get_shipper_profile(shipper_id)


@router.put("/{shipper_id}", response_description="Update shipper profile")

async def update_shipper_profile_route(shipper: ShipperSchema):
    return await update_shipper_profile(shipper)


@router.delete("/{shipper_id}", response_description="Delete shipper profile")

async def delete_shipper_profile_route(shipper_id: str = Path(..., example="s1")):
    return await delete_shipper_profile(shipper_id)