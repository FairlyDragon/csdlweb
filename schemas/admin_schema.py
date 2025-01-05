from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TimePeriod(BaseModel):
    start_date: datetime
    end_date: datetime

class FiguresHeaderResponseSchema(BaseModel):
    figures: int | float
    growth_rate: int = Field(..., ge=0, le=100) # percentage change
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

class MenuItemResponseSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float]  = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = True

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Pizza Margherita",
                "description": "Classic Italian pizza with tomatoes, mozzarella, and basil.",
                "price": 12.99,
                "category": "Pizza",
                "image_url": "https://example.com/images/pizza_margherita.jpg",
                "is_active": "false"
            }
        }
        

