# error_middleware.py
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException as FastAPIHTTPException

async def custom_error_handler(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    
    except FastAPIHTTPException as exc:
        return JSONResponse(status_code=exc.status_code, content={"message": exc.detail})
    
    except Exception as exc:
        return JSONResponse(status_code=500, content={"message": "Internal Server Error"})