from backend import api_only_limit, app, limiter, TMDB_API_KEY, TMDB_URL
from flask import jsonify, request
from flask_cors import cross_origin
import requests


@app.route('/api/search', methods=['GET'], endpoint='api_search')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
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
    query = request.args.get('query', '')
    page = request.args.get('page', 1)

    search_url = f'{TMDB_URL}/search/multi?api_key={TMDB_API_KEY}&query={query}&page={page}'

    response = requests.get(search_url)
    
    if response.status_code == 200:
        search = response.json()

        # Filter out person-related results
        search['results'] = [result for result in search['results'] if result['media_type'] in ['movie', 'tv']]
        
        return jsonify(search), 200
    else:
        return jsonify({
            'error': 'Movies not found or API error'
        }), response.status_code
