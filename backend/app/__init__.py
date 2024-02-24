from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_caching import Cache
from flask_cors import CORS
from flask_limiter import Limiter, util
# from flask_pymongo import PyMongo
from flask_redis import FlaskRedis
import pymongo
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {"origins": ["http://localhost:3000", "https://flix256.netlify.app"]}
    },
    supports_credentials=True)

limiter = Limiter(
    util.get_remote_address,
    app=app,
    storage_uri=os.getenv('REDIS_URI'),
    default_limits=['200 per day', '50 per hour']
)


def api_only_limit():
    if request.path.startswith('/api/'):
        return '5/minute'  # Limit for API routes
    return 'unlimited'  # No limit for non-API routes

# Initialize Flask-Redis
# Initialize Flask-Redis
redis_client = FlaskRedis()

# Configure Redis connection with password
redis_client.init_app(app, password=os.getenv('REDIS_PASSWORD'))

# Configure MongoDB Client
# app.config['MONGO_URI'] = os.getenv('MONGODB_URI')
# mongo = PyMongo(app)

mongo = pymongo.MongoClient(os.getenv('MONGODB_URI'), ssl=True,ssl_cert_reqs='CERT_NONE')

# Configure REDIS Client
app.config['CACHE_TYPE'] = os.getenv('CACHE_TYPE')
app.config['CACHE_KEY_PREFIX'] = os.getenv('CACHE_KEY_PREFIX')
app.config['REDIS_URL'] = os.getenv('REDIS_URI')
redis_client = FlaskRedis(app)

# Initialize Flask-Caching
cache = Cache(app)

# TMDB URL and API Key to be used for fetching data
TMDB_URL = os.getenv('TMDB_URL')
TMDB_API_KEY = os.getenv('TMDB_API_KEY')


@app.errorhandler(405)
def method_not_allowed(e):
    """
    Custom error handler for HTTP 405 Method Not Allowed errors.

    Args:
        e: The error object.

    Returns:
        A JSON response with an error message and the 405 status code.
    """
    return jsonify(
        error='This method is not allowed for the requested URL.'
    ), 405


@app.errorhandler(404)
def method_not_allowed(e):
    """
    Custom error handler for HTTP 404 Not Found errors.

    Args:
        e: The error object.

    Returns:
        A JSON response with an error message and the 404 status code.
    """
    return jsonify(error='This requested resource is not found.'), 404


@app.errorhandler(400)
def bad_request_error(e):
    return jsonify(
        error='The JSON body data is malformed or not present.'
    ), 400


@app.errorhandler(415)
def unsupported_media_type_error(e):
    return jsonify(
        error='Unsupported Media Type - The Content-Type must \
            be \'application/json\'.'
    ), 415



@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify(
        error='You have exceeded your request rate. Try again later.'
    ), 429


@limiter.request_filter
def limiter_filter():
    # Return True if the route should not be limited
    return request.endpoint in ('static', 'another_route')


# Import views
from app import auth, favorites, movies, recommendations, search, tv_shows
