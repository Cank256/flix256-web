from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_caching import Cache
from flask_limiter import Limiter, util
from flask_pymongo import PyMongo
from flask_redis import FlaskRedis
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

limiter = Limiter(util.get_remote_address, app=app, default_limits=['200 per day', '50 per hour'])


def api_only_limit():
    if request.path.startswith('/api/'):
        return '5/minute'  # Limit for API routes
    return 'unlimited'  # No limit for non-API routes

# Initialize Flask-Caching
cache = Cache()

# Initialize Flask-Redis
redis = FlaskRedis()

# Configure Flask app with Redis
app.config['CACHE_TYPE'] = os.getenv('CACHE_TYPE')
app.config['CACHE_KEY_PREFIX'] = os.getenv('CACHE_KEY_PREFIX')
app.config['CACHE_REDIS'] = redis

# Initialize Flask-Caching with the app
cache.init_app(app)

# Configure MongoDB Client
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# Configure REDIS Client
app.config['REDIS_URL'] = os.getenv('REDIS_URL')
redis_client = FlaskRedis(app)

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


@limiter.request_filter
def limiter_filter():
    # Return True if the route should not be limited
    return request.endpoint in ('static', 'another_route')


@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify(
        error='You have exceeded your request rate. Try again later.'
    ), 429


# Import views
from backend import auth, favorites, movies, recommendations, search, tv_shows
