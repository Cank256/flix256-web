from backend import TMDB_API_KEY, TMDB_URL, app, mongo
from flask import jsonify
import requests


# Access the favorites collections
favorites = mongo.db.favorites


@app.route('/api/movies/now_playing', methods=['GET'])
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


@app.route('/api/movies/upcoming', methods=['GET'])
@app.route('/movies/upcoming', methods=['GET'])
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


@app.route('/api/movies/popular', methods=['GET'])
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


@app.route('/api/movies/<int:movie_id>', methods=['GET'])
@app.route('/movies/<int:movie_id>', methods=['GET'])
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
    url = f'{TMDB_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}\
            &append_to_response=videos'
    response = requests.get(url)

    if response.status_code == 200:
        movie = response.json()
        return jsonify(movie), 200
    else:
        return jsonify({
            'error': 'Movie not found or API error'
        }), response.status_code


@app.route('/api/movies/recommended/<user_id>', methods=['GET'])
@app.route('/movies/recommended/<user_id>', methods=['GET'])
def get_movie_recommendations(user_id):
    """
    Fetches movie recommendations for a specific user based on their favorite
    movies.

    Args:
        user_id (str): The user's unique identifier.

    Returns:
        list: A list of recommended movies from TMDB, filtered to avoid
        duplicates.
    """
    movie_favorites = favorites.find({'user_id': user_id, 'fav_type': 'movie'})
    movie_recommendations = []
    seen_movie_ids = set()

    if movie_favorites.count() < 1:
        return jsonify({
            'error': 'First add favorite movies to get recommendations'
        }), 422

    for favorite in movie_favorites:
        tmdb_id = favorite['fav_id']
        tmdb_url = f"{TMDB_URL}/movie/{tmdb_id}/recommendations?api_key={TMDB_API_KEY}&page=1"
        response = requests.get(tmdb_url)

        if response.status_code == 200:
            data = response.json()
            if data['total_results'] > 0:
                for rec in data['results']:
                    if rec['id'] not in seen_movie_ids:
                        movie_recommendations.append(rec)
                        seen_movie_ids.add(rec['id'])
        else:
            return jsonify({
                'error': 'No recommendations or API error'
            }), 500

    if len(movie_recommendations) > 0:
        return jsonify(movie_recommendations), 200
    else:
        return jsonify({
            'error': 'No Movie recommendations obtained, select more favorites'
        }), 500
