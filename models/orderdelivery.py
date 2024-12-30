from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4

class DeliveryStatus(BaseModel):
    # status_code: int
    status_description: str # preparing, delivering, delivered
    ## If Order.is_accepted (default is True, when system is scaled up, res can set the customer throughput status. Thus is_accepted could be False with the reason is the res is overloaded), 
    ## the initial status of 'OrderDelivery.delivery_status.status_description' is 0 - preparing
    
    
    ## Shipper can set the order as delivering/delivered
    ## User can't cancel his order afterwards 'OrderDelivery.delivery_status.status_description' turns into 1 - delivering
    ## When the order is delivered, 'OrderDelivery.delivery_status.status_description' turns into 2 - delivered
    set_at: datetime = Field(default_factory=datetime.now())
    
class OrderDelivery(BaseModel): 
    delivery_id: str = Field(default_factory=lambda: str(uuid4())) 
    order_id: str 
    shipper_id: str 
    delivery_status: DeliveryStatus