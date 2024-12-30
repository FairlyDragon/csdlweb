from pydantic import BaseModel
from datetime import datetime

class TimePeriod(BaseModel):
    start_date: datetime
    end_date: datetime

class FigureHeaderResponseSchema(BaseModel):
    figure: int | float
    change: int # percentage change
    
class DashBoardHeaderResponseSchema(BaseModel):
    total_orders: FigureHeaderResponseSchema
    total_delivered: FigureHeaderResponseSchema
    total_canceled: FigureHeaderResponseSchema
    total_revenue: FigureHeaderResponseSchema
    # total_products_sold: int
    
class PieChartResponseSchema(BaseModel): # unit is percentage
    total_order: int
    customer_growth: int
    total_revenue: int