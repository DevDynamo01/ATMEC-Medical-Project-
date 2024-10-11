
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration class for Flask application."""
    MONGODB_URI = os.getenv("MONGODB_URI")
