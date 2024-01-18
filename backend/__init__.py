from dotenv import load_dotenv
from flask import Flask
from flask_pymongo import PyMongo
from flask_redis import FlaskRedis
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure MongoDB Client
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# Configure REDIS Client
app.config['REDIS_URL'] = os.getenv('REDIS_URL')
redis_client = FlaskRedis(app)

from backend import views