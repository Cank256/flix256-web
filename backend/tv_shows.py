from backend import api_only_limit, app, cache, crossdomain, limiter, mongo, TMDB_API_KEY, TMDB_URL
from flask import jsonify, request
from flask_cors import cross_origin
import requests


# Access the favorites collections
favorites = mongo.db.favorites


@cache.cached(timeout=3600)
@app.route('/api/tv/trending', methods=['GET', 'OPTIONS'], endpoint='api_tv_trending')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@crossdomain(origin='*')
@app.route('/tv/trending', methods=['GET', 'OPTIONS'])
def tv_trending():
    """
    Fetches a list of TV shows that are trending.

    Uses the TMDB API's '/tv/trending' endpoint. Returns a JSON response with
    the details of TV shows airing today. Handles API errors gracefully.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response containing TV shows airing today.
        - In case of API errors, returns an error message.
    """
    page = request.args.get('page', 1)
    lang = request.args.get('lang', 'en')

    url = f'{TMDB_URL}/trending/tv/day?api_key={TMDB_API_KEY}&lang={lang}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/tv/airing_today', methods=['GET', 'OPTIONS'], endpoint='api_airing_today')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@crossdomain(origin='*')
@app.route('/tv/airing_today', methods=['GET', 'OPTIONS'])
def airing_today():
    """
    Fetches a list of TV shows that are airing today.

    Uses the TMDB API's '/tv/airing_today' endpoint. Returns a JSON response with
    the details of TV shows airing today. Handles API errors gracefully.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response containing TV shows airing today.
        - In case of API errors, returns an error message.
    """
    page = request.args.get('page', 1)
    lang = request.args.get('lang', 'en')

    url = f'{TMDB_URL}/tv/airing_today?api_key={TMDB_API_KEY}&lang={lang}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/tv/on_air', methods=['GET', 'OPTIONS'], endpoint='api_on_air')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@crossdomain(origin='*')
@app.route('/tv/on_air', methods=['GET', 'OPTIONS'])
def on_air():
    """
    Fetches a list of TV shows that are currently on air.

    Uses the TMDB API's '/tv/on_air' endpoint. Returns a JSON response with
    the details of TV shows currently on air. Handles API errors gracefully.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response containing TV shows currently on air.
        - In case of API errors, returns an error message.
    """
    page = request.args.get('page', 1)
    lang = request.args.get('lang', 'en')

    url = f'{TMDB_URL}/tv/on_the_air?api_key={TMDB_API_KEY}&lang={lang}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/tv/popular', methods=['GET', 'OPTIONS'], endpoint='api_popular_tv_shows')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@crossdomain(origin='*')
@app.route('/tv/popular', methods=['GET', 'OPTIONS'])
def popular_tv():
    """
    Retrieves a list of popular TV shows.

    Makes a request to the TMDB API's '/tv/popular' endpoint. The response is a
    JSON object containing popular TV shows. Handles API errors.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response with popular TV shows.
        - Error message if there's an API error.
    """
    page = request.args.get('page', 1)
    lang = request.args.get('lang', 'en')

    url = f'{TMDB_URL}/tv/popular?api_key={TMDB_API_KEY}&lang={lang}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@cache.cached(timeout=3600)
@app.route('/api/tv/top_rated', methods=['GET', 'OPTIONS'], endpoint='api_top_rated_shows')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@crossdomain(origin='*')
@app.route('/tv/top_rated', methods=['GET', 'OPTIONS'])
def top_rated_tv():
    """
    Retrieves a list of popular TV shows.

    Makes a request to the TMDB API's '/tv/top_rated' endpoint. The response is a
    JSON object containing popular TV shows. Handles API errors.

    Optional paramters can be passed as well
    1. page: page number
    2. lang: language

    Returns:
        - JSON response with popular TV shows.
        - Error message if there's an API error.
    """
    page = request.args.get('page', 1)
    lang = request.args.get('lang', 'en')

    url = f'{TMDB_URL}/tv/top_rated?api_key={TMDB_API_KEY}&lang={lang}&page={page}'
    response = requests.get(url)

    if response.status_code == 200:
        tv_shows = response.json()
        return jsonify(tv_shows), 200
    else:
        return jsonify({
            'error': 'TV shows not found or API error'
        }), response.status_code


@app.route('/api/tv/<int:tv_show_id>', methods=['GET', 'OPTIONS'], endpoint='api_tv_show_details')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@crossdomain(origin='*')
@app.route('/tv/<int:tv_show_id>', methods=['GET', 'OPTIONS'])
def tv_show(tv_show_id):
    """
    Fetches details of a TV show.

    Uses the TMDB API's '/tv/tv_id' endpoint. Returns a JSON response with the details
    of a TV show. Handles API errors gracefully.

    Optional paramters can be passed as well
    1. lang: language

    Args:
        tv_show_id: The ID of the TV show.

    Returns:
        - JSON response containing details of the TV show.
        - In case of API errors, returns an error message.
    """
    lang = request.args.get('lang', 'en')

    url = f'{TMDB_URL}/tv/{tv_show_id}?api_key={TMDB_API_KEY}&lang={lang}&append_to_response=videos,credits,images,external_ids,release_dates'
    response = requests.get(url)

    if response.status_code == 200:
        tv_show = response.json()
        return jsonify(tv_show), 200
    else:
        return jsonify({
            'error': 'TV show not found or API error'
        }), response.status_code


@app.route('/api/tv/episodes', methods=['GET', 'OPTIONS'], endpoint='api_tv_show_episodes')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@crossdomain(origin='*')
@app.route('/tv/episodes', methods=['GET', 'OPTIONS'])
def tv_show_episodes():
    """
    Fetches details of a TV show.

    Uses the TMDB API's '/tv/tv_id' endpoint. Returns a JSON response with the details
    of a TV show. Handles API errors gracefully.

    Optional paramters can be passed as well
    1. tv_show_id: id of the TV show
    2. season: season number
    3. lang: language

    Returns:
        - JSON response containing details of the TV show.
        - In case of API errors, returns an error message.
    """
    tv_show_id = request.args.get('tv_show_id', '')
    season = request.args.get('season', 1)
    lang = request.args.get('lang', 'en')

    url = f'{TMDB_URL}/tv/{tv_show_id}/season/{season}?api_key={TMDB_API_KEY}&lang={lang}&append_to_response=videos,credits,images,external_ids,release_dates'
    response = requests.get(url)

    if response.status_code == 200:
        tv_show = response.json()
        return jsonify(tv_show), 200
    else:
        return jsonify({
            'error': 'TV show not found or API error'
        }), response.status_code
