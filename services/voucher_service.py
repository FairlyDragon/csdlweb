from db.database import db
from fastapi import HTTPException

# Get voucher by id
async def get_voucher_by_id(voucher_id: str) -> dict:
    voucher = await db["voucher"].find_one({"_id": voucher_id})
    if not voucher:
        raise HTTPException(status_code=404, detail="Voucher not found")
    
    return voucher