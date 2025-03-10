from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from models.order_delivery import DeliveryStatusEnum
from models.payment import PaymentMethod, PaymentStatus
from models.order import OrderItem, OrderItemSchema, OrderStatus

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
        
class AdminOrderListDetailsResponseSchema(BaseModel):
    order_id: str
    user_id: str
    name: str
    email: str
    phone_number: str
    address: str
    avatar_url: Optional[str] = None
    
    payment_method: Optional[PaymentMethod] = PaymentMethod.COD
    payment_status: Optional[PaymentStatus] = PaymentStatus.PENDING
    
    order_date: datetime
    order_items: List[OrderItemSchema]
    total_amount: Optional[float]
    num_of_items: int 
    note: Optional[str] = None
    status: OrderStatus
    
    voucher_code: Optional[str] = None
    discount_applied: Optional[float] = 0.0
    delivery_fee: Optional[float] = 0.0
    
    shipper_name: Optional[str] = None
    
class AdminOrderListPreviewResponseSchema(BaseModel):
    order_id: str
    name: str
    phone_number: str
    address: str
    email: str
    order_date: datetime
    num_of_items: int
    status: OrderStatus
    
    
    
class DeliveryHistoryResponseSchema(BaseModel):
    order_id: str
    order_date: datetime
    order_items: List[OrderItem]
    delivery_status: DeliveryStatusEnum
    profit: float
    
    # Aggregated data
    # total_order_quantity: int
    # total_cod: float
class OrderHistoryResponseSchema(BaseModel):
    customer_id: str
    order_id: str
    order_date: datetime
    order_items: List[OrderItem]
    order_status: OrderStatus
    payment_amount: float
    # Aggregated data
    # total_order_quantity: int
    # total_purchase]: float
    
class Admin_Delivery_Order_Managament_Schema(BaseModel):
    order_id: str
    customer_name: str
    address: str
    phone_number: str
    
class ReviewDashBoardResponseSchema(BaseModel):
    review_id: str
    customer_id: str # Review model has user_id field instead of customer_id
    menuitem_id: str
    name: str       # Review model DONT has this field
    rating: int 
    comment: str
    review_date: datetime
    image_url: str  # Review model DONT has this field
    avatar_url: Optional[str] = None  # Review model DONT has this field
    
class AdminReportCustomerSchema(BaseModel):
    customer_name: str
    email: str
    phone_number: str
    address: str
    created_at: datetime
    
    total_order: int        # completed
    total_purchase: float 
    
class AdminReportShipperSchema(BaseModel):
    shipper_name: str
    email: str
    phone_number: str
    address: str
    created_at: datetime
    
    total_delivery: int     # delivered
    total_income: float
    
    
class AdminReportRestaurantSchema():
    total_food_quantity: int
    revenue: float
    
    
    
    
        

