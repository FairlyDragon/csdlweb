from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from models.voucher import Voucher

class TimePeriod(BaseModel):
    start_date: datetime
    end_date: datetime

class FiguresHeaderResponseSchema(BaseModel):
    figures: int | float
    growth_rate: int = Field(..., le=100) # percentage change
    days: int
    
class DashBoardHeaderResponseSchema(BaseModel):
    total_orders: FiguresHeaderResponseSchema
    total_delivered: FiguresHeaderResponseSchema
    total_canceled: FiguresHeaderResponseSchema
    total_revenue: FiguresHeaderResponseSchema
    # total_products_sold: int
    
class PieChartResponseSchema(BaseModel): # unit is percentage
    total_order_percentage: int = Field(..., ge=0, le=100)
    customer_growth_percentage: int = Field(..., ge=0, le=100)
    total_revenue_percentage: int = Field(..., ge=0, le=100)

class CreateMenuItemSchema(BaseModel):
    menuitem_id: Optional[str] = None
    name: str
    description: str
    price: float
    category: str
    image_url: str
    is_active: Optional[bool] = True

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Pizza Margherita",
                "description": "Classic Italian pizza with tomatoes, mozzarella, and basil.",
                "price": 12.99,
                "category": "Pizza",
                "image_url": "https://example.com/images/pizza_margherita.jpg"
            }
        }
        
class UpdateMenuItemSchema(BaseModel):
    menuitem_id: str
    name: Optional[str] = None
    price: Optional[float]  = None
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

    class Config:
        json_schema_extra = {
            "example": {
                "menuitem_id": "grdrdg51fdsghdf0h2",
                "name": "Pizza Margherita",
                "price": 12.99
            }
        }

        
class CreateVoucherSchema(BaseModel):
    code: str 
    discount_percentage: float 
    discount_amount: float
    start_date: datetime 
    end_date: datetime 
    minimum_order_amount: float 
    total_usage_limit: int
    
    class Config:
        json_schema_extra = {
            "example": {
                "code": "SUMMER10",
                "discount_percentage": 10,
                "discount_amount": 10,
                "start_date": "2025-01-01",
                "end_date": "2025-01-31",
                "minimum_order_amount": 100,
                "total_usage_limit": 100
            }
        }
    
class UpdateVoucherSchema(BaseModel):
    voucher_id: str
    code: Optional[str] = None
    discount_percentage: Optional[float] = None
    discount_amount: Optional[float] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    minimum_order_amount: Optional[float] = None
    total_usage_limit: Optional[int] = None
    used: Optional[int] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "voucher_id": "grdrdg51fdsghdf0h2",
                "code": "CHANGED_CODE",
                "discount_percentage": 10,
                "discount_amount": 10,
                "start_date": "2025-01-01",
                "end_date": "2025-01-31"
            }
        }
        

