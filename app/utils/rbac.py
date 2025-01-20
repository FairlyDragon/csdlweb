from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from typing import List
from functools import wraps
from schemas.user_schema import UserSchema
from services.auth_service import get_user_from_token
from .roles import Role

from logging_config import logger

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserSchema:
    user = await get_user_from_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user

def role_required(allowed_roles: List[Role]):
    def decorator(func):
        @wraps(func)
        async def wrapper(current_user: UserSchema = Depends(get_current_user), *args, **kwargs):
            if current_user.role not in allowed_roles:
                raise HTTPException(status_code=403, detail="You do not have access to this resource")
            return await func(current_user=current_user, *args, **kwargs)   # pass the current_user object to the decorated function
                                                                         # Pass current_user to the endpoint function
        return wrapper
    return decorator