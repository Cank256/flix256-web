from dotenv import load_dotenv
from flask import Flask, jsonify
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
        error="This method is not allowed for the requested URL."
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
    return jsonify(error="This requested resource is not found."), 404


@app.errorhandler(400)
def bad_request_error(e):
    return jsonify(
        error="Bad request - The JSON data is malformed or not present."
    ), 400


@app.errorhandler(415)
def unsupported_media_type_error(e):
    return jsonify(
        error="Unsupported Media Type - The Content-Type must \
            be 'application/json'."
    ), 415


# Import views
from backend import movies, tv_shows, auth, utils
