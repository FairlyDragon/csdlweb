import os
from config import SECRET_KEY, ALGORITHM
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, allowed_roles=None):
        super().__init__(app)
        self.allowed_roles = allowed_roles or []

    async def dispatch(self, request: Request, call_next):
        auth = HTTPBearer()
        credentials: HTTPAuthorizationCredentials = await auth(request)
        if credentials:
            token = credentials.credentials
            try:
                payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
                role = payload.get("role")
                if role not in self.allowed_roles:
                    raise HTTPException(status_code=403, detail="Role not allowed")
                request.state.user = payload
            except JWTError:
                raise HTTPException(status_code=403, detail="Invalid token")
        else:
            raise HTTPException(status_code=403, detail="Authorization required")

        response = await call_next(request)
        return response
    
def setup_auth_middleware(app):
    app.add_middleware(AuthMiddleware, allowed_roles=["admin", "shipper", "customer"])