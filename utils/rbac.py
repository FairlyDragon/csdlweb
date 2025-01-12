from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from typing import List
from .roles import Role

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    # Implement your logic to get the current user from the token
    user = await get_user_from_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user

def role_required(allowed_roles: List[Role]):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            current_user = await get_current_user()
            if current_user.role not in allowed_roles:
                raise HTTPException(status_code=403, detail="You do not have access to this resource")
            return await func(*args, **kwargs)
        return wrapper
    return decorator