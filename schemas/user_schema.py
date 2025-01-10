from pydantic import BaseModel
from models.user import UserRole
from typing import Optional

class UserSchema(BaseModel):
    email: str
    password: str
    role: Optional[UserRole]
