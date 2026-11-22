import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'safepath-ai-dev-secret-key-2026')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/safepath_ai')
    DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    PORT = int(os.getenv('PORT', 5000))
