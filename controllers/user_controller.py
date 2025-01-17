from fastapi import HTTPException
from models.shipper import ShipperStatus
from utils.roles import Role
from models.order_delivery import DeliveryStatusEnum
from models.payment import Payment, PaymentStatus
from services.payment_service import insert_payment_to_db
from controllers.admin_controller import read_delivery_history_by_shipper_id, read_order_history_by_customer_id
from models.order import DeliveryFeeDict, OrderItemSchema
from services.auth_service import verify_password
from services.order_service import get_order_by_order_id, get_order_delivery_by_order_id, get_order_delivery_by_shipper_id, insert_order_to_db
from services.voucher_service import *
from services.shipper_service import delete_shipper_by_id, get_shipper_by_id, update_shipper_by_id
from schemas.shipper_schema import ShipperAssignedOrderDeliverySchema, ShipperSchema
from services.user_service import delete_user_in_db_by_id, find_customer_by_id, is_me, update_user_in_db_by_id
from services.menu_service import get_all_menu_items, get_menu_item_by_id
from schemas.user_schema import CreateOrderSchema, CustomerResponseSchema, UserSchema

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
    customer_id = current_user.id
    
    modified_count = await update_user_in_db_by_id(customer_id, customer.model_dump())
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Your account has been updated successfully"}

# Delete customer profile
async def delete_user_profile(customer_id: str, current_user: UserSchema) -> dict:
    customer_id = customer_id.lower()
    
    # Can invoke api with "me" as customer_id
    # Need to check if passed_id is not really "me"
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    customer_id = current_user.id
    
    deleted_count = await delete_user_in_db_by_id(customer_id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": f"Your account has been deleted successfully"}

# Create order
async def create_order(customer_id: str, order: CreateOrderSchema, current_user: UserSchema) -> dict:  # Order
    """
    There's two main tasks to be done here:
    1. Handle order creation (voucher has to be checked)
    2. Create a payment object (implicitly - not be returned to the user)
    """
    
    """1. Handle order creation (voucher has to be checked)"""
    customer_id = customer_id.lower()
    
    # Can invoke api with "me" as customer_id
    # Need to check if passed_id is not really "me"
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    customer_id = current_user.id
    
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
    
    """2. Create a payment object (implicitly - not be returned to the user)"""
    # Create a payment object
    payment_object = Payment(order_id=inserted_order["_id"], 
                             payment_method=order["payment_method"], 
                             amount=order["total_amount"], 
                             payment_status=PaymentStatus.PENDING, 
                             )
    
    # Insert the payment object into the database
    inserted_id = await insert_payment_to_db(payment_object.model_dump(by_alias=True))
    if not inserted_id:
        raise HTTPException(status_code=404, detail="Failed to create payment")
    
    return inserted_order  # result of task 1

# Update password
async def update_password(customer_id: str, old_password: str, new_password: str, current_user: UserSchema) -> dict:
    # Can invoke api with "me" as customer_id
    # Need to check if passed_id is not really "me"
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    customer_id = current_user.id
    
    user = await find_customer_by_id(customer_id)
    if not user:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    if not verify_password(old_password, user["password"]):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    
    modified_count = await update_user_in_db_by_id(customer_id, {"password": new_password})
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Update password failed. Please try again or contact administrator")
    
    return {"message": f"Password updated successfully"}

# Update password shipper
async def update_password_shipper(shipper_id: str, old_password: str, new_password: str, current_user: UserSchema) -> dict:
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    shipper_id = current_user.id
    
    shipper = await get_shipper_by_id(shipper_id)
    if not shipper:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    if not verify_password(old_password, shipper["password"]):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    
    modified_count = await update_shipper_by_id(shipper_id, {"password": new_password})
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Update password failed. Please try again or contact administrator")
    
    return {"message": f"Password updated successfully"}


# Get shipper history
async def get_shipper_history(shipper_id: str, current_user: UserSchema) -> list[dict]:
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    shipper_id = current_user.id
    
    history = await read_delivery_history_by_shipper_id(shipper_id)
    if not history:
        raise HTTPException(status_code=404, detail="No history found")
    
    return history


# Get delivering orders
async def read_assigned_order_delivery(shipper_id: str, current_user: UserSchema) -> dict:   # -> ShipperAssingedOrderDeliverySchema
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    shipper_id = current_user.id
    
    # Get all order delivery of shipper by shipper id
    all_order_delivery_of_shipper = await get_order_delivery_by_shipper_id(shipper_id)
    
    # Get order delivery object that is currently delivering
    current_for_me_order_delivery = None
    for order_delivery in all_order_delivery_of_shipper:
        if order_delivery["delivery_status"] == DeliveryStatusEnum.DELIVERING:
            current_for_me_order_delivery = order_delivery
            break
    
    if not current_for_me_order_delivery:
        raise HTTPException(status_code=404, detail="You have not been assigned any order")
    
    order = await get_order_by_order_id(current_for_me_order_delivery["order_id"])
    customer_who_made_order = await find_customer_by_id(order["user_id"])
    if not customer_who_made_order:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return ShipperAssignedOrderDeliverySchema(
        order_id=order["_id"],
        total_amount=order["total_amount"],
        delivery_fee=order["delivery_fee"],
            order_items=[
                OrderItemSchema(**{**item, 
                                   "image_url": (await get_menu_item_by_id(menu_item_id=item["menuitem_id"]))["image_url"],
                                   "name": (await get_menu_item_by_id(menu_item_id=item["menuitem_id"]))["name"],
                                   }).model_dump()
                for item in order["order_items"]
                    ],
        customer_name=customer_who_made_order["name"],
        avatar_url=customer_who_made_order.get("avatar_url", None),
        address=customer_who_made_order["address"],
        phone_number=customer_who_made_order["phone_number"],
    ).model_dump()

# Get delivery fee with respect to address
async def read_delivery_fee(customer_id: str, current_user: UserSchema) -> dict:
    customer_id = customer_id.lower()
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    customer_id = current_user.id
    
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
async def read_orders_history(customer_id: str, current_user: UserSchema) -> list[dict]:
    # Can invoke api with "me" as customer_id
    # Need to check if passed_id is not really "me"
    if not is_me(customer_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    customer_id = current_user.id
    
    history = await read_order_history_by_customer_id(customer_id)
    if not history:
        raise HTTPException(status_code=404, detail="You have not made any orders")
    
    return history

# Get shipper profile
async def get_shipper_profile(shipper_id: str, current_user: UserSchema) -> dict:
    shipper_id = shipper_id.lower()
    
    # Can invoke api with "me" as customer_id
    # Need to check if passed_id is not really "me"
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    shipper_id = current_user.id
    
    # Get shipper infor by shipper id
    shipper = await get_shipper_by_id(shipper_id)
    
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
    shipper_id = current_user.id
    
    # Update shipper infor by shipper id
    modified_count = await update_shipper_by_id(shipper_id, shipper.model_dump())
    if modified_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Your account has been updated successfully"}

# Delete shipper profile
async def delete_shipper_profile(shipper_id: str, current_user: UserSchema) -> dict:
    shipper_id = shipper_id.lower()
    
    # Can invoke api with "me" as shipper_id
    # Need to check if passed_id is not really "me"
    if not is_me(shipper_id, current_user):
        raise HTTPException(status_code=403, detail="You do not have access to this resource")
    shipper_id = current_user.id
    
    deleted_count = await delete_shipper_by_id(shipper_id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Shipper not found")
    
    return {"message": f"Your account has been deleted successfully"}


# Get shipper infor by order id
async def read_shipper_infor_by_order_id(order_id: str) -> dict:
    order_id = order_id.lower()
    
    # Get order delivery object
    order_delivery_object = await get_order_delivery_by_order_id(order_id)
    if not order_delivery_object:
        raise HTTPException(status_code=404, detail="Your order has not been fetched yet")
    
    # Get shipper object
    shipper_who_shipped = await get_shipper_by_id(order_delivery_object["shipper_id"])
    if not shipper_who_shipped:
        raise HTTPException(status_code=404, detail="No shipper found")
    
    return {"shipper_name": shipper_who_shipped["name"],
            "address":shipper_who_shipped["address"],
            "phone_number":shipper_who_shipped["phone_number"]}


# Logout
async def logout(current_user: UserSchema) -> dict:
    if current_user.role == Role.SHIPPER:
        await update_shipper_by_id(current_user.id, {"account_status": ShipperStatus.INACTIVE})
        
    return {"message": "You have been logged out"}