from backend import TMDB_API_KEY, TMDB_URL, app, mongo
from flask import jsonify
import requests


# Access the favorites collections
favorites = mongo.db.favorites


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


@app.route('/tv/recommended/<user_id>', methods=['GET'])
def get_tv_recommendations(user_id):
    """
    Fetches TV show recommendations for a specific user based on their
    favorite TV shows.

    Args:
        user_id (str): The user's unique identifier.

    Returns:
        list: A list of recommended TV shows from TMDB, filtered to avoid
        duplicates.
    """
    tv_favorites = favorites.find({'user_id': user_id, 'fav_type': 'tv'})
    tv_recommendations = []
    seen_tv_ids = set()

    if tv_favorites.count() < 1:
        return jsonify({
            'error': 'First add favorite Tv shows to get recommendations'
            }), 422

    for favorite in tv_favorites:
        tmdb_id = favorite['fav_id']
        tmdb_url = f"{TMDB_URL}/tv/{tmdb_id}/recommendations\
                ?api_key={TMDB_API_KEY}&page=1"
        response = requests.get(tmdb_url)

        if response.status_code == 200:
            data = response.json()
            print(data['total_results'])
            if data['total_results'] > 0:
                for rec in data['results']:
                    if rec['id'] not in seen_tv_ids:
                        tv_recommendations.append(rec)
                        seen_tv_ids.add(rec['id'])
            else:
                return jsonify({
                    'error': 'No TV show recommendations obtained. \
                    Add more favorite TV for recommendations'
                }), 500
        else:
            return jsonify({'error': 'No recommendations or API error'}), 500

    return jsonify(tv_recommendations), 200
