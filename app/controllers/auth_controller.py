from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from models.shipper import ShipperStatus
from services.shipper_service import update_shipper_by_id, update_shipper_by_id_without_raising_error
from utils.roles import Role
from services.user_service import find_user_by_email
from services.email_service import generate_random_password, send_reset_email
from schemas.user_schema import UserSchema
from services.auth_service import signup_user, authenticate_user, update_password_in_db

# Signup customer/shipper
async def signup(user: UserSchema):
    result = await signup_user({k: v for k, v in user.model_dump().items() if v is not None})
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

# Login for all kinds of users
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = await authenticate_user(form_data.username, form_data.password)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # Set shipper account status to active
    shipper = await find_user_by_email(form_data.username)
    if shipper and shipper.role == Role.SHIPPER:
        await update_shipper_by_id_without_raising_error(shipper.id, {"account_status": ShipperStatus.ACTIVE})
        
    return {"access_token": token, "token_type": "bearer"}


# Reset password
async def password_reset(email: str):
    # Check if user does not exist
    user = await find_user_by_email(email)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    
    # Take role of user
    role = user.role
    
    # Generate random password
    random_password = generate_random_password()
    
    # Send reset email
    if send_reset_email(email, random_password):
        # Update password in database
        updated_data = await update_password_in_db(email, random_password, role)
        if updated_data:
            raise HTTPException(status_code=200, detail="Password reset email sent successfully")
        else:
            raise HTTPException(status_code=400, detail="Failed to update password. Please try again or contact us via hotline at 028.1234.5678")
    else:
        raise HTTPException(status_code=400, detail="Failed to send password reset email. Please try again or contact us via hotline at 028.1234.5678")

