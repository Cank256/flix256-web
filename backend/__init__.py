from datetime import timedelta
from dotenv import load_dotenv
from flask import Flask, jsonify, request, current_app, make_response
from flask_caching import Cache
from flask_cors import CORS
from flask_limiter import Limiter, util
from functools import update_wrapper
from flask_redis import FlaskRedis
import pymongo
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {"origins": ["http://localhost:3000", "https://flix256.netlify.app/"]}
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


def crossdomain(origin=None, methods=None, headers=None, max_age=21600,
                attach_to_all=True, automatic_options=True):
    """Decorator function that allows crossdomain requests.
      Courtesy of
      https://blog.skyred.fi/articles/better-crossdomain-snippet-for-flask.html
    """
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    # use str instead of list if using Python 3.x
    if headers is not None and not isinstance(headers, list):
        headers = ', '.join(x.upper() for x in headers)
    # use str instead of list if using Python 3.x
    if not isinstance(origin, list):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        """ Determines which methods are allowed
        """
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        """The decorator function
        """
        def wrapped_function(*args, **kwargs):
            """Caries out the actual cross domain code
            """
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

# Import views
from backend import auth, favorites, movies, recommendations, search, tv_shows
