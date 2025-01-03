from pydantic import BaseModel
from datetime import datetime

class TimePeriod(BaseModel):
    start_date: datetime
    end_date: datetime

class FiguresHeaderResponseSchema(BaseModel):
    figures: int | float
    change: int # percentage change
    days: int
    
class DashBoardHeaderResponseSchema(BaseModel):
    total_orders: FiguresHeaderResponseSchema
    total_delivered: FiguresHeaderResponseSchema
    total_canceled: FiguresHeaderResponseSchema
    total_revenue: FiguresHeaderResponseSchema
    # total_products_sold: int
    
class PieChartResponseSchema(BaseModel): # unit is percentage
    total_order: int
    customer_growth: int
    total_revenue: int