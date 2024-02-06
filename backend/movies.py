from backend import api_only_limit, app, cache, limiter, mongo, TMDB_API_KEY, TMDB_URL
from flask import jsonify, request
from flask_cors import cross_origin
import requests


# Access the favorites collections
favorites = mongo.db.favorites


@cache.cached(timeout=3600)
@app.route('/api/movies/trending', methods=['GET'], endpoint='api_movies_trending')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/movies/trending', methods=['GET'])
def movies_trending():
    """
    Fetches a list of movies that are trending.

    Uses the TMDB API's '/movie/trending' endpoint. Returns a JSON response with
    the details of now-playing movies. Handles API errors gracefully.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response containing now-playing movies.
        - In case of API errors, returns an error message.
    """
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)

    url = f'{TMDB_URL}/trending/movie/day?api_key={TMDB_API_KEY}&lang={language}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        movies = response.json()
        return jsonify(movies), 200
    else:
        return jsonify({
            'error': 'Movies not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/movies/now_playing', methods=['GET'], endpoint='api_movies_now_playing')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/movies/now_playing', methods=['GET'])
def now_playing():
    """
    Fetches a list of movies that are currently playing in theaters.

    Uses the TMDB API's '/movie/now_playing' endpoint. Returns a JSON response with
    the details of now-playing movies. Handles API errors gracefully.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response containing now-playing movies.
        - In case of API errors, returns an error message.
    """
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)

    url = f'{TMDB_URL}/movie/now_playing?api_key={TMDB_API_KEY}&lang={language}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        movies = response.json()
        return jsonify(movies), 200
    else:
        return jsonify({
            'error': 'Movies not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/movies/upcoming', methods=['GET'], endpoint='api_upcoming_movies')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@cache.cached(timeout=3600)
@app.route('/movies/upcoming', methods=['GET'])
@cache.cached(timeout=3600)
def coming_soon():
    """
    Fetches a list of upcoming movies.

    Queries the TMDB API's '/movie/upcoming' endpoint. Returns a JSON list of movies
    that are scheduled to be released soon. API errors are handled.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response with upcoming movies.
        - Error message in case of API errors.
    """
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)

    url = f'{TMDB_URL}/movie/upcoming?api_key={TMDB_API_KEY}&lang={language}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        movies = response.json()
        return jsonify(movies), 200
    else:
        return jsonify({
            'error': 'Movies not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/movies/popular', methods=['GET'], endpoint='api_popular_movies')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/movies/popular', methods=['GET'])
def popular():
    """
    Retrieves a list of popular movies.

    Makes a request to the TMDB API's '/movie/popular' endpoint. The response is a
    JSON object containing popular movies. Handles API errors.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response with popular movies.
        - Error message if there's an API error.
    """
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)

    url = f'{TMDB_URL}/movie/popular?api_key={TMDB_API_KEY}&lang={language}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        movies = response.json()
        return jsonify(movies), 200
    else:
        return jsonify({
            'error': 'Movies not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/movies/top_rated', methods=['GET'], endpoint='api_top_rated_movies')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/movies/top_rated', methods=['GET'])
def top_rated():
    """
    Retrieves a list of top rated movies.

    Makes a request to the TMDB API's '/movie/top_rated' endpoint. The response is a
    JSON object containing popular movies. Handles API errors.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response with popular movies.
        - Error message if there's an API error.
    """
    language = request.args.get('language', 'en')
    page = request.args.get('page', 1)

    url = f'{TMDB_URL}/movie/top_rated?api_key={TMDB_API_KEY}&lang={language}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        movies = response.json()
        return jsonify(movies), 200
    else:
        return jsonify({
            'error': 'Movies not found or API error'
        }), response.status_code


@app.route('/api/movies/<int:movie_id>', methods=['GET'], endpoint='api_movie_details')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/movies/<int:movie_id>', methods=['GET'], endpoint='movie_details')
def get_movie(movie_id):
    """
    Fetches details of a specific movie by its TMDB ID.

    Queries the TMDB API for details of the movie specified by the '/movie/movie_id'.
    Returns a JSON object with the movie details. If the movie is not found
    or there's an API error, returns an appropriate error message.

    Optional paramters can be passed as well
    1. lang: language

    Args:
        movie_id (int): The TMDB ID of the movie.

    Returns:
        - JSON response with the movie details.
        - Error message in case of API errors or if the movie is not found.
    """
    page = request.args.get('page', 1)

    url = f'{TMDB_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}&append_to_response=videos&lang={page}'
    response = requests.get(url)

    if response.status_code == 200:
        movie = response.json()
        return jsonify(movie), 200
    else:
        return jsonify({
            'error': 'Movie not found or API error'
        }), response.status_code
