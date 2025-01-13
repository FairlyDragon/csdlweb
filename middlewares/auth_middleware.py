import os
from config import SECRET_KEY, ALGORITHM
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from starlette.middleware.base import BaseHTTPMiddleware
import logging

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, allowed_roles=None):
        super().__init__(app)
        self.allowed_roles = allowed_roles or []

    async def dispatch(self, request: Request, call_next):
        ############################# Skip authentication for /docs and /openapi.json #############################
        #################################### FOR TESTING ONLY #####################################################
        if request.url.path in ["/docs", "/openapi.json", "/redoc"]:
            return await call_next(request)
        
        auth = HTTPBearer()
        try:
            credentials: HTTPAuthorizationCredentials = await auth(request)
            token = credentials.credentials
            logging.info(f"Token received: {token}")
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            role = payload.get("role")
            logging.info(f"Role from token: {role}")
            if role not in self.allowed_roles:
                raise HTTPException(status_code=403, detail="Role not allowed")
            request.state.user = payload
        except JWTError as e:
            logging.error(f"JWT Error: {e}")
            raise HTTPException(status_code=403, detail="Invalid token")
        except Exception as e:
            logging.error(f"Authorization Error: {e}")
            raise HTTPException(status_code=403, detail="Authorization required")

        response = await call_next(request)
        return response

def setup_auth_middleware(app):
    app.add_middleware(AuthMiddleware, allowed_roles=["superadmin", "admin", "customer", "shipper"])