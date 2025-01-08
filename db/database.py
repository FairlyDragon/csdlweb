from motor.motor_asyncio import AsyncIOMotorClient
from config import DATABASE_URL, DB_NAME

client = AsyncIOMotorClient(DATABASE_URL)
db = client[DB_NAME]