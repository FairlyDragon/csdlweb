from typing import Optional
from schemas.user_schema import CreateOrderSchema
from db.database import db
from fastapi import HTTPException

# Get voucher by id
async def get_voucher_by_id(voucher_id: str) -> dict:
    voucher = await db["voucher"].find_one({"_id": voucher_id})
    if not voucher:
        raise HTTPException(status_code=404, detail="Voucher not found")
    
    return voucher

# Get voucher by voucher code
async def get_voucher_by_voucher_code(voucher_code: str) -> dict:
    voucher = await db["voucher"].find_one({"code": voucher_code})
    if not voucher:
        raise HTTPException(status_code=404, detail="Voucher not found")
    
    return voucher

# Update voucher by id
async def update_voucher_by_id(voucher_id: str, update_data: dict) -> dict:
    collection = db["voucher"]
    result = await collection.update_one({"_id": voucher_id}, {"$set": update_data})
    
    return result

# Check usbility of voucher
async def check_usability_of_voucher(order: CreateOrderSchema) -> Optional[dict]:
    # Check if the voucher exists
    voucher = await get_voucher_by_voucher_code(order.voucher_code)
    
    # Check if the total amount is greater than the minimum order amount
    if order.total_amount < voucher["minimum_order_amount"]:
        raise HTTPException(status_code=400, detail="Total amount needs to be greater than the minimum order amount")

    # Check if voucher is used up
    if voucher["used"] == voucher["total_usage_limit"]:
        raise HTTPException(status_code=400, detail="Voucher is used up")
    
    # base returned dict
    returned = {"voucher_code": order.voucher_code, "voucher_id": voucher["_id"]}
    
    if voucher.get("discount_percentage", 0) > 0:
        returned.update({"discount_applied": voucher["discount_percentage"] * order.total_amount})
    elif voucher.get("discount_amount", 0) > 0:
        returned.update({"discount_applied": voucher["discount_amount"]})
    
    # increment used count
    await update_voucher_by_id(voucher["_id"], {"used": voucher["used"] + 1})
    
    return returned