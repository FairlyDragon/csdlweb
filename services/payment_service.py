from db.database import db
from fastapi import HTTPException

# Get payment by order id 
# 1 - 1 relationship
async def get_payment_by_order_id(order_id: str) -> dict:  # -> Payment
    payment = await db["payment"].find_one({"order_id": order_id})
    if not payment:
        raise HTTPException(status_code=404, detail="No payment found")
    
    return payment

# Insert payment to db
async def insert_payment_to_db(payment: dict) -> dict:
    inserted_payment = await db["payment"].insert_one(payment)
    if not inserted_payment.inserted_id:
        raise HTTPException(status_code=404, detail="Failed to insert payment")
    
    return inserted_payment.inserted_id

# Update payment by id without raising error
async def update_payment_by_id_without_raising_error(payment_id: str, payment: dict) -> int:
    payment = {k: v for k, v in payment.items() if v is not None}
    updated_payment = await db["payment"].update_one({"_id": payment_id}, {"$set": payment})

    return updated_payment.modified_count

# Get payment by id without raising error
async def get_payment_by_order_id_without_raising_error(order_id: str) -> dict:
    payment = await db["payment"].find_one({"order_id": order_id})
    
    return payment

# Update payment by order id without raising error
async def update_payment_by_order_id_without_raising_error(order_id: str, payment: dict) -> int:
    payment = {k: v for k, v in payment.items() if v is not None}
    updated_payment = await db["payment"].update_one({"order_id": order_id}, {"$set": payment})
    
    return updated_payment.modified_count
