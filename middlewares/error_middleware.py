# error_middleware.py
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException as FastAPIHTTPException

async def custom_error_handler(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    
    except FastAPIHTTPException as exc:
        raise HTTPException(status_code=exc.status_code, detail=exc.detail)
    
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Internal Server Error")