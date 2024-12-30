from motor.motor_asyncio import AsyncIOMotorClient

DATABASE_URL = "${MONGO_URI}"
client = AsyncIOMotorClient(DATABASE_URL)
db = client["${DB_NAME}"]
