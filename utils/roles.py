from enum import Enum

class Role(str, Enum):
    ADMIN = "admin"
    SUPERADMIN = "superadmin"
    CUSTOMER = "customer"
    SHIPPER = "shipper"