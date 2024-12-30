from fastapi import APIRouter
from controllers.admin_controller import read_dashboard_header

router = APIRouter()
# prefix = "/admin"

router.get("/dashboard/header", response_description="Dashboard's header includes 4 values")(read_dashboard_header)


