from fastapi import APIRouter
from controllers.user_controller import *

router = APIRouter()
# prefix = "/user"

router.post("/signup", response_description="Sign up a new user")(signup_user)

router.post("/login", response_description="Login a user")(login_user)

router.get("/profile", response_description="Get user profile")(get_user_profile)

router.put("/profile", response_description="Update user profile")(update_user_profile)

router.delete("/profile", response_description="Delete user profile")(delete_user_profile)

