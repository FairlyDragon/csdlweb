from fastapi import APIRouter
from controllers.auth_controller import *

router = APIRouter()
# prefix="/auth"

router.post("/signup")(signup)

router.post("/login")(login)
