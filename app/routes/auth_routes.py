from fastapi import APIRouter
from controllers.auth_controller import *
from utils.roles import Role


router = APIRouter()
# prefix="/auth"
customer_and_shippers_roles = [Role.CUSTOMER, Role.SHIPPER]

@router.post("/signup", response_description="Signup a new customer or shipper")
async def signup_route(user: UserSchema):
    return await signup(user)

@router.post("/login", response_description="User login")
async def login_route(form_data: OAuth2PasswordRequestForm = Depends()):
    return await login(form_data)

@router.post("/password_reset", response_description="Reset password")
async def password_reset_route(email: str):
    return await password_reset(email)

