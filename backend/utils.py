from backend import api_only_limit, app, limiter, models, mongo,TMDB_API_KEY, TMDB_URL
from bson import ObjectId
from flask import jsonify, request
import requests


# Access the favorites and user collections
favorites = mongo.db.favorites
users = mongo.db.users


@app.route('/api/favorite', methods=['POST'], endpoint='api_add_favorites')
@limiter.limit(api_only_limit)
@app.route('/favorite', methods=['POST'])
def add_favorite():
    """
    Endpoint to add a favorite movie or TV show for a user.

    Expects 'user_id', 'fav_type', 'fav_id', 'fav_title', and 'fav_backdrop'.
    Validates required fields and adds a new favorite movie or tv serie.

    Returns:
        - JSON containing the new favorite's ID on successful addition.
        - JSON with error message if any required fields are missing.
    """
    data = request.get_json()

    user_id = data.get('user_id')
    fav_type = data.get('fav_type')
    fav_id = data.get('fav_id')
    fav_title = data.get('fav_title')
    fav_backdrop = data.get('fav_backdrop')

    # Validate required fields
    error_message = validate_required_fields(
        user_id=user_id,
        fav_type=fav_type,
        movie_id=fav_id,
        movie_title=fav_title,
        movie_backdrop=fav_backdrop
    )

    if error_message:
        return jsonify({'error': error_message}), 400

    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(user_id):
        return jsonify({'error': 'Invalid user_id format'}), 400

    # Check if user exists
    user = users.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({
            'error': 'You are not authorized to perform this action.'
        }), 405

    favorite_data = models.Favorite(
        user_id=user_id,
        fav_type=fav_type,
        fav_id=fav_id,
        fav_title=fav_title,
        fav_backdrop=fav_backdrop
    )
    favorite_id = favorites.insert_one(favorite_data.to_dict()).inserted_id

    return jsonify({'favorite_id': str(favorite_id)}), 201


@app.route('/api/favorite/<user_id>', methods=['GET'], endpoint='api_get_favorites')
@limiter.limit(api_only_limit)
@app.route('/favorite/<user_id>', methods=['GET'])
def get_favorites(user_id):
    """
    Endpoint to retrieve all favorite movies or TV shows for a specific user.

    Requires 'user_id' as part of the URL.
    Fetches all favorites for the user and returns them.
    Converts MongoDB documents to JSON serializable format before returning.

    Returns:
        - JSON list of favorite items for the user.
        - JSON with error message if no favorites are found.
    """

    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(user_id):
        return jsonify({'error': 'Invalid user_id format'}), 400

    # Check if user exists
    user = users.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({
            'error': 'You are not authorized to perform this action.'
        }), 405

    user_favorites = favorites.find({'user_id': user_id})

    if user_favorites.count() > 0:
        # Convert the generator to a list
        favorites_result = [favorite for favorite in user_favorites]
        return jsonify([
            serialize_document(doc) for doc in favorites_result
        ]), 200
    else:
        return jsonify({'error': 'No favorites found for user'}), 404


@app.route('/api/favorite', methods=['DELETE'], endpoint='api_delete_favorite')
@limiter.limit(api_only_limit)
@app.route('/favorite', methods=['DELETE'])
def delete_favorite():
    """
    Endpoint to delete a favorite movie or TV show for a user.

    Requires 'favorite_id' as part of the URL.

    Returns:
        - JSON with a success message on successful deletion.
        - JSON with error message if the favorite item is not found.
    """
    # Validate if user_id and favorite_id are valid ObjectIds
    data = request.get_json()

    favorite_id = data.get('favorite_id')
    if not ObjectId.is_valid(favorite_id):
        return jsonify({
            'error': 'favorite_id not provided or it is invalid'
        }), 400

    user_id = data.get('user_id')
    if not user_id or not ObjectId.is_valid(user_id):
        return jsonify({
            'error': 'user_id not provided or it is invalid'
        }), 400

    # Validate that the favorite belongs to the user
    check_favorite = favorites.find_one({
            '_id': ObjectId(favorite_id),
            'user_id': user_id
        })
    if not check_favorite:
        return jsonify({
            'error': 'You are not authorized to delete this resource'
        }), 401

    favorite = favorites.delete_one({'_id': ObjectId(favorite_id)})

    if favorite.deleted_count:
        # Convert user document to a returnable format
        return jsonify({'message': 'Favorite deleted'}), 200
    else:
        return jsonify({'error': 'Favorite not found'}), 404


def validate_required_fields(**fields):
    """
    Validates the presence of required fields.

    Args:
        **fields: Arbitrary number of keyword arguments representing fields to
        validate.

    Returns:
        - Error message string if any fields are missing.
        - None if all required fields are present.
    """
    missing_fields = [
        field_name for field_name, value in fields.items() if not value
    ]

    if missing_fields:
        # Constructing the error message based on missing fields
        error_message = f"{' and '.join(missing_fields)} {'is' if len(missing_fields) == 1 else 'are'} required"
        return error_message
    return None


def serialize_document(doc):
    """
    Converts MongoDB document fields to JSON serializable formats.

    Args:
        doc: The MongoDB document to serialize.

    Returns:
        - The serialized document with JSON serializable fields.
    """
    # Convert ObjectId to string
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    # Convert datetime to string
    if 'createdAt' in doc:
        doc['createdAt'] = doc['createdAt'].strftime('%Y-%m-%d %H:%M:%S')
    if 'updatedAt' in doc:
        doc['updatedAt'] = doc['createdAt'].strftime('%Y-%m-%d %H:%M:%S')
    return doc


@app.route('/api/search', methods=['GET'], endpoint='api_search')
@limiter.limit(api_only_limit)
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


@app.route('/api/recommended/<user_id>', methods=['GET'], endpoint='api_recommendations')
@limiter.limit(api_only_limit)
@app.route('/recommended/<user_id>', methods=['GET'])
def get_movie_tv_recommendations(user_id):
    """
    Fetches a combined list of movie and TV show recommendations for a specific
    user.

    Args:
        user_id (str): The user's unique identifier.

    Returns:
        list: A merged and alternating list of movie and TV show
        recommendations from TMDB.
    """
    user_favorites = favorites.find({'user_id': user_id})
    favorites_list = list(user_favorites)

    movie_recommendations = []
    tv_recommendations = []
    seen_movie_recommendations = set()
    seen_tv_recommendations = set()

    if user_favorites.count() < 1:
        return jsonify({
            'error': 'First add favorite Movies and Tv shows to get recommendations'
        }), 422

    for favorite in favorites_list:
        tmdb_id = favorite['fav_id']
        fav_type = favorite['fav_type']  # 'movie' or 'tv'
        tmdb_url = f"{TMDB_URL}/{fav_type}/{tmdb_id}/recommendations?api_key={TMDB_API_KEY}&page=1"

        response = requests.get(tmdb_url)
        if response.status_code == 200:
            tmdb_recommendations = response.json().get('results', [])
            for rec in tmdb_recommendations:
                rec_id = rec.get('id')
                if fav_type == 'movie' and rec_id not in seen_movie_recommendations:
                    movie_recommendations.append(rec)
                    seen_movie_recommendations.add(rec_id)
                elif fav_type == 'tv' and rec_id not in seen_tv_recommendations:
                    tv_recommendations.append(rec)
                    seen_tv_recommendations.add(rec_id)

    # Merge recommendations, alternating between movie and tv
    combined_recommendations = []
    for movie, tv in zip(movie_recommendations, tv_recommendations):
        combined_recommendations.extend([movie, tv])

    # Add remaining recommendations if one list is longer than the other
    longest_list = movie_recommendations if len(movie_recommendations) > len(tv_recommendations) else tv_recommendations
    combined_recommendations.extend(longest_list[len(combined_recommendations) // 2:])

    return jsonify(combined_recommendations), 200
