from backend import api_only_limit, app, cache, limiter, mongo, TMDB_API_KEY, TMDB_URL
from flask import jsonify
from flask_cors import cross_origin
import requests


# Access the favorites collections
favorites = mongo.db.favorites


@cache.cached(timeout=3600)
@app.route('/api/tv/airing_today', methods=['GET'], endpoint='api_airing_today')
@limiter.limit(api_only_limit)
@cross_origin()
@app.route('/tv/airing_today', methods=['GET'])
def airing_today():
    """
    Fetches a list of TV shows that are airing today.

    Uses the TMDB API's 'airing_today' endpoint. Returns a JSON response with
    the details of TV shows airing today. Handles API errors gracefully.

    Returns:
        - JSON response containing TV shows airing today.
        - In case of API errors, returns an error message.
    """
    url = f'{TMDB_URL}/tv/airing_today?api_key={TMDB_API_KEY}&lang=en&page=1'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/tv/on_air', methods=['GET'], endpoint='api_on_air')
@limiter.limit(api_only_limit)
@cross_origin()
@app.route('/tv/on_air', methods=['GET'])
def on_air():
    """
    Fetches a list of TV shows that are currently on air.

    Uses the TMDB API's 'on_air' endpoint. Returns a JSON response with
    the details of TV shows currently on air. Handles API errors gracefully.

    Returns:
        - JSON response containing TV shows currently on air.
        - In case of API errors, returns an error message.
    """
    url = f'{TMDB_URL}/tv/on_the_air?api_key={TMDB_API_KEY}&lang=en&page=1'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/tv/popular', methods=['GET'], endpoint='api_popular_tv_shows')
@limiter.limit(api_only_limit)
@cross_origin()
@app.route('/tv/popular', methods=['GET'])
def popular_tv():
    """
    Retrieves a list of popular TV shows.

    Makes a request to the TMDB API's 'popular' endpoint. The response is a
    JSON object containing popular TV shows. Handles API errors.

    Returns:
        - JSON response with popular TV shows.
        - Error message if there's an API error.
    """
    url = f'{TMDB_URL}/tv/popular?api_key={TMDB_API_KEY}&lang=en&page=1'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@app.route('/api/tv/<int:tv_show_id>', methods=['GET'], endpoint='api_tv_show_details')
@limiter.limit(api_only_limit)
@cross_origin()
@app.route('/tv/<int:tv_show_id>', methods=['GET'])
def tv_show(tv_show_id):
    """
    Fetches details of a TV show.

    Uses the TMDB API's 'tv' endpoint. Returns a JSON response with the details
    of a TV show. Handles API errors gracefully.

    Args:
        tv_show_id: The ID of the TV show.

    Returns:
        - JSON response containing details of the TV show.
        - In case of API errors, returns an error message.
    """
    url = f'{TMDB_URL}/tv/{tv_show_id}?api_key={TMDB_API_KEY}\
            &lang=en&append_to_response=videos'
    response = requests.get(url)

    if response.status_code == 200:
        tv_show = response.json()
        return jsonify(tv_show), 200
    else:
        return jsonify({
            'error': 'TV show not found or API error'
        }), response.status_code
