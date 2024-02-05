from backend import api_only_limit, app, cache, limiter, mongo, TMDB_API_KEY, TMDB_URL
from flask import jsonify
from flask_cors import cross_origin
import requests


# Access the favorites collections
favorites = mongo.db.favorites


@cache.cached(timeout=3600)
@app.route('/api/movies/trending', methods=['GET'], endpoint='api_movies_trending')
@limiter.limit(api_only_limit)
@cross_origin()
@app.route('/movies/trending', methods=['GET'])
def movies_trending():
    """
    Fetches a list of movies that are trending.

    Uses the TMDB API's 'trending' endpoint. Returns a JSON response with
    the details of now-playing movies. Handles API errors gracefully.

    Returns:
        - JSON response containing now-playing movies.
        - In case of API errors, returns an error message.
    """
    url = f'{TMDB_URL}/trending/movie/day?api_key={TMDB_API_KEY}&lang=en&page=1'
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
@cross_origin()
@app.route('/movies/now_playing', methods=['GET'])
def now_playing():
    """
    Fetches a list of movies that are currently playing in theaters.

    Uses the TMDB API's 'now_playing' endpoint. Returns a JSON response with
    the details of now-playing movies. Handles API errors gracefully.

    Returns:
        - JSON response containing now-playing movies.
        - In case of API errors, returns an error message.
    """
    url = f'{TMDB_URL}/movie/now_playing?api_key={TMDB_API_KEY}&lang=en&page=1'
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
@cross_origin()
@cache.cached(timeout=3600)
@app.route('/movies/upcoming', methods=['GET'])
@cache.cached(timeout=3600)
def coming_soon():
    """
    Fetches a list of upcoming movies.

    Queries the TMDB API's 'upcoming' endpoint. Returns a JSON list of movies
    that are scheduled to be released soon. API errors are handled.

    Returns:
        - JSON response with upcoming movies.
        - Error message in case of API errors.
    """
    url = f'{TMDB_URL}/movie/upcoming?api_key={TMDB_API_KEY}&lang=en&page=1'
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
@cross_origin()
@app.route('/movies/popular', methods=['GET'])
def popular():
    """
    Retrieves a list of popular movies.

    Makes a request to the TMDB API's 'popular' endpoint. The response is a
    JSON object containing popular movies. Handles API errors.

    Returns:
        - JSON response with popular movies.
        - Error message if there's an API error.
    """
    url = f'{TMDB_URL}/movie/popular?api_key={TMDB_API_KEY}&lang=en&page=1'
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
@cross_origin()
@app.route('/movies/<int:movie_id>', methods=['GET'], endpoint='movie_details')
def get_movie(movie_id):
    """
    Fetches details of a specific movie by its TMDB ID.

    Queries the TMDB API for details of the movie specified by the 'movie_id'.
    Returns a JSON object with the movie details. If the movie is not found
    or there's an API error, returns an appropriate error message.

    Args:
        movie_id (int): The TMDB ID of the movie.

    Returns:
        - JSON response with the movie details.
        - Error message in case of API errors or if the movie is not found.
    """
    url = f'{TMDB_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}&append_to_response=videos'
    response = requests.get(url)

    if response.status_code == 200:
        movie = response.json()
        return jsonify(movie), 200
    else:
        return jsonify({
            'error': 'Movie not found or API error'
        }), response.status_code
