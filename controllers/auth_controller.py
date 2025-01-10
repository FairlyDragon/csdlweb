from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.user_schema import UserSchema
from services.auth_service import signup_user, authenticate_user

# Signup customer/shipper
async def signup(user: UserSchema):
    result = signup_user(user.model_dump(by_alias=True))
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

# Login for all kinds of users
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = authenticate_user(form_data.username, form_data.password)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}