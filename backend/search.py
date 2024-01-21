from backend import api_only_limit, app, limiter, TMDB_API_KEY, TMDB_URL
from flask import jsonify, request
from flask_cors import cross_origin
import requests


@app.route('/api/search', methods=['GET'], endpoint='api_search')
@limiter.limit(api_only_limit)
@cross_origin()
@app.route('/search', methods=['GET'])
def search():
    """
    Endpoint to search for movies and TV shows on TMDB.

    This endpoint expects a 'query' parameter in the URL. It uses this query to
    search both the movies and TV shows on TMDB. The search is performed
    separately for movies and TV shows, and the results are combined in the
    response.

    Args:
        query (str): The search keyword provided as a URL parameter.

    Returns:
        - On success: JSON object containing separate lists of movies and TV
        shows found.
        - On failure: JSON object with an error message. This could be due to
        a failure in one or both of the TMDB API requests.
    """
    query = request.args.get('query')
    movie_url = f'{TMDB_URL}/search/movie?api_key={TMDB_API_KEY}&query={query}'
    tv_url = f'{TMDB_URL}/search/tv?api_key={TMDB_API_KEY}&query={query}'

    movie_response = requests.get(movie_url)
    tv_response = requests.get(tv_url)

    if movie_response.status_code == 200 and tv_response.status_code == 200:
        movies = movie_response.json()['results']
        tv_shows = tv_response.json()['results']
        return jsonify({'movies': movies, 'tv_shows': tv_shows}), 200
    else:
        return jsonify({'error': 'Search failed'}), 500
