from db.database import db
from fastapi import HTTPException

# Get payment by order id 
# 1 - 1 relationship
async def get_payment_by_order_id(order_id: str) -> list[dict]:  # -> list[Payment]
    payments = await db["payment"].find_one({"order_id": order_id})
    if not payments:
        raise HTTPException(status_code=404, detail="No payment found")
    
    return payments