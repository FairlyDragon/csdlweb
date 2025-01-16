from typing import Optional
from fastapi import HTTPException
from controllers.admin_controller import read_order_history_by_customer_id
from models.order import DeliveryFeeDict
from services.auth_service import verify_password
from services.order_service import insert_order_to_db
from services.voucher_service import *
from services.shipper_service import delete_shipper_by_id, get_shipper_by_id, update_shipper_by_id
from schemas.shipper_schema import ShipperSchema
from services.user_service import delete_user_in_db_by_id, find_customer_by_id, is_me, update_user_in_db_by_id
from services.menu_service import get_all_menu_items
from schemas.user_schema import CreateOrderSchema, CustomerResponseSchema, UserSchema

# Get all menu items
async def get_menu_items() -> list:
    # get all menu items
    return await get_all_menu_items()


# Get customer profile
async def get_customer_profile(customer_id: str) -> dict:
    customer_id = customer_id.lower()
    
        
    
    customer = await find_customer_by_id(customer_id=customer_id)
    return customer

# Update customer profile
async def update_customer_profile(customer: CustomerResponseSchema) -> dict:
    customer_id = customer.customer_id
    
    # Can invoke api with "me" as customer_id
    # Need to check if passed_id is not really "me"
    
        
    
    modified_count = await update_user_in_db_by_id(customer_id, customer.model_dump())
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Your account has been updated successfully"}

# Delete customer profile
async def delete_user_profile(customer_id: str) -> dict:
    customer_id = customer_id.lower()
    
        
    
    deleted_count = await delete_user_in_db_by_id(customer_id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Your account has been deleted successfully"}

# Create order
async def create_order(customer_id: str, order: CreateOrderSchema) -> dict:  # Order
    customer_id = customer_id.lower()
    # Check if the customer exists
    if not await find_customer_by_id(customer_id):
        raise HTTPException(status_code=404, detail="Customer not found")
      
    # If voucher code is passed, check if it's usable
    if order.voucher_code is not None:
        data_from_voucher = await check_usability_of_voucher(order)
        if not data_from_voucher:
            raise HTTPException(status_code=400, detail="Voucher is unavailable")
            
        order = {**order.model_dump(), **data_from_voucher}
    else:
        order = order.model_dump()
            
    # Insert the order into the database
    inserted_order = await insert_order_to_db(customer_id, order)
    if not inserted_order:
        raise HTTPException(status_code=404, detail="Failed to create order")
    
    return inserted_order

# Update password
async def update_password(customer_id: str, old_password: str, new_password: str) -> dict:
    user = await find_customer_by_id(customer_id)
    if not user:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    if not verify_password(old_password, user["password"]):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    
    modified_count = await update_user_in_db_by_id(customer_id, {"password": new_password})
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Update password failed. Please try again or contact administrator")
    
    return {"message": f"Password updated successfully"}


# Get delivery fee with respect to address
async def read_delivery_fee(customer_id: str) -> dict:
    customer_id = customer_id.lower()
    customer = await find_customer_by_id(customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    # Check if the customer's address is supported
    address_to_calculate = ""
    for key_address in DeliveryFeeDict.delivery_fee_dict.keys():
        if key_address in customer["address"].lower():
            address_to_calculate = key_address
            break
        
    if not address_to_calculate:
        raise HTTPException(status_code=404, detail="Your address is not supported. Sorry!")
    
    return {"delivery_fee": DeliveryFeeDict.delivery_fee_dict.get(address_to_calculate)}

# Read orders history of a customer
async def read_orders_history(customer_id: str) -> list[dict]:
    history = await read_order_history_by_customer_id(customer_id)
    if not history:
        raise HTTPException(status_code=404, detail="You have not made any orders")
    
    return history

# Get shipper profile
async def get_shipper_profile(shipper_id: str) -> dict:
    shipper_id = shipper_id.lower()
    
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    
        
    
    # Get shipper infor by shipper id
    shipper = await get_shipper_by_id(shipper_id)
    
    # Replace _id with shipper_id
    shipper.setdefault("shipper_id", shipper.pop("_id"))
    
    return shipper

# Update shipper profile
async def update_shipper_profile(shipper: ShipperSchema) -> dict:
    shipper_id = shipper.shipper_id
    
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    
        
    
    # Update shipper infor by shipper id
    modified_count = await update_shipper_by_id(shipper_id, shipper.model_dump())
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Your account has been updated successfully"}

# Delete shipper profile
async def delete_shipper_profile(shipper_id: str) -> dict:
    shipper_id = shipper_id.lower()
    
            
    
    deleted_count = await delete_shipper_by_id(shipper_id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Your account has been deleted successfully"}
