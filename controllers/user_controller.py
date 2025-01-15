from fastapi import HTTPException
from services.shipper_service import delete_shipper_by_id, get_shipper_by_id, update_shipper_by_id
from schemas.shipper_schema import ShipperSchema
from services.user_service import delete_user_in_db_by_id, find_customer_by_id, is_me, update_user_in_db_by_id
from services.menu_service import get_all_menu_items
from schemas.user_schema import CustomerResponseSchema, UserSchema

# Get all menu items
async def get_menu_items() -> list:
    # get all menu items
    return await get_all_menu_items()


# Get customer profile
async def get_customer_profile(customer_id: str, current_user: UserSchema) -> dict:
    customer_id = customer_id.lower()
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    
    customer = await find_customer_by_id(current_user.id)
    return customer

# Update customer profile
async def update_customer_profile(customer: CustomerResponseSchema, current_user: UserSchema) -> dict:
    customer_id = customer.customer_id
    
    # Can invoke api with "me" as customer_id
    # Need to check if passed_id is not really "me"
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    
    modified_count = await update_user_in_db_by_id(current_user.id, customer.model_dump())
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Your account has been updated successfully"}

# Delete customer profile
async def delete_user_profile(customer_id: str, current_user: UserSchema) -> dict:
    customer_id = customer_id.lower()
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    
    deleted_count = await delete_user_in_db_by_id(current_user.id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Your account has been deleted successfully"}

# Get shipper profile
async def get_shipper_profile(shipper_id: str, current_user: UserSchema) -> dict:
    shipper_id = shipper_id.lower()
    
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    
    # Get shipper infor by shipper id
    shipper = await get_shipper_by_id(current_user.id)
    
    # Replace _id with shipper_id
    shipper.setdefault("shipper_id", shipper.pop("_id"))
    
    return shipper

# Update shipper profile
async def update_shipper_profile(shipper: ShipperSchema, current_user: UserSchema) -> dict:
    shipper_id = shipper.shipper_id
    
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    
    # Update shipper infor by shipper id
    modified_count = await update_shipper_by_id(current_user.id, shipper.model_dump())
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Your account has been updated successfully"}

# Delete shipper profile
async def delete_shipper_profile(shipper_id: str, current_user: UserSchema) -> dict:
    shipper_id = shipper_id.lower()
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")    
    
    deleted_count = await delete_shipper_by_id(current_user.id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Your account has been deleted successfully"}
