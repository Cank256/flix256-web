from backend import TMDB_API_KEY, TMDB_URL, app
from flask import jsonify
import requests

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
        return jsonify({'error': 'Movies not found or API error'}), response.status_code
    

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
        return jsonify({'error': 'Movies not found or API error'}), response.status_code

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
        return jsonify({'error': 'Movies not found or API error'}), response.status_code

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
    url = f'{TMDB_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}&append_to_response=videos'
    response = requests.get(url)
    
    if response.status_code == 200:
        movie = response.json()
        return jsonify(movie), 200
    else:
        return jsonify({'error': 'Movie not found or API error'}), response.status_code