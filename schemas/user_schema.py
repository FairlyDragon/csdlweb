from pydantic import BaseModel
from models.user import UserRole

class UserSchema(BaseModel):
    username: str
    email: str
    password: str
    role: UserRole
