from backend import TMDB_API_KEY, TMDB_URL, app, models, mongo
from bson import ObjectId
from datetime import datetime
from flask import jsonify, request
import requests


# Access the favorites and user collections
favorites = mongo.db.favorites
users = mongo.db.users

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
    
    user_id = request.json.get('user_id')
    fav_type = request.json.get('fav_type')
    fav_id = request.json.get('fav_id')
    fav_title = request.json.get('fav_title')
    fav_backdrop = request.json.get('fav_backdrop')

    # Validate required fields
    error_message = validate_required_fields(
        user_id = user_id,
        fav_type = fav_type,
        movie_id = fav_id,
        movie_title = fav_title,
        movie_backdrop = fav_backdrop
    )

    if error_message:
        return jsonify({'error': error_message}), 400

    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(user_id):
        return jsonify({'error': 'Invalid user ID format'}), 400

    # Check if user exists
    user = users.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    favorite_data = models.Favorite(
        user_id = user_id,
        fav_type = fav_type,
        fav_id = fav_id,
        fav_title = fav_title,
        fav_backdrop = fav_backdrop
    )
    favorite_id = favorites.insert_one(favorite_data.to_dict()).inserted_id

    return jsonify({'favorite_id': str(favorite_id)}), 201

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
        return jsonify({'error': 'Invalid user ID format'}), 400

    # Check if user exists
    user = users.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user_favorites = favorites.find({'user_id': user_id})

    if user_favorites.count() > 0:
        # Convert the generator to a list
        favorites_result = [favorite for favorite in user_favorites]
        return jsonify([serialize_document(doc) for doc in favorites_result]), 200
    else:
        return jsonify({'error': 'No favorites found for user'}), 404

@app.route('/favorite/<favorite_id>', methods=['DELETE'])
def delete_favorite(favorite_id):
    """
    Endpoint to delete a favorite movie or TV show for a user.

    Requires 'favorite_id' as part of the URL.
    
    Returns:
        - JSON with a success message on successful deletion.
        - JSON with error message if the favorite item is not found.
    """
    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(favorite_id):
        return jsonify({'error': 'Invalid user ID format'}), 400

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
        **fields: Arbitrary number of keyword arguments representing fields to validate.

    Returns:
        - Error message string if any fields are missing.
        - None if all required fields are present.
    """
    missing_fields = [field_name for field_name, value in fields.items() if not value]

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

@app.route('/search', methods=['GET'])
def search():
    """
    Endpoint to search for movies and TV shows on TMDB.

    This endpoint expects a 'query' parameter in the URL. It uses this query to search
    both the movies and TV shows on TMDB. The search is performed separately for movies
    and TV shows, and the results are combined in the response.

    Args:
        query (str): The search keyword provided as a URL parameter.

    Returns:
        - On success: JSON object containing separate lists of movies and TV shows found.
        - On failure: JSON object with an error message. This could be due to a failure
        in one or both of the TMDB API requests.
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