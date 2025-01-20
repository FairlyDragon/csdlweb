from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from enum import Enum

class DeliveryStatusEnum(str, Enum):
    DELIVERING = "delivering"
    DELIVERED = "delivered"
    FAILED = "failed"
    

class OrderDelivery(BaseModel): 
    delivery_id: str = Field(default_factory=lambda: str(uuid4()), alias="_id") 
    order_id: str 
    shipper_id: str 
    delivery_status: DeliveryStatusEnum