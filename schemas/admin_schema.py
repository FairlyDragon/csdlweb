from pydantic import BaseModel, Field
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

class AddMenuItem(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: str
    is_active: bool = True

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
