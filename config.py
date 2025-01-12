import os
from dotenv import load_dotenv

load_dotenv()

# Database
DATABASE_URL = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# PROFIT
DISCOUNT_RATE_FOR_DRIVERS = float(os.getenv("DISCOUNT_RATE_FOR_DRIVERS"))

# JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

# Email
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
EMAIL_SERVER = os.getenv("EMAIL_SERVER")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_TIMEOUT = int(os.getenv("EMAIL_TIMEOUT"))

