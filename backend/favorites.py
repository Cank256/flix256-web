from backend import api_only_limit, app, limiter, models, mongo, utils
from bson import ObjectId
from flask import jsonify, request
from flask_cors import cross_origin


# Access the favorites and user collections
favorites = mongo.db.favorites
users = mongo.db.users


@app.route('/api/favorite', methods=['POST'], endpoint='api_add_favorites')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/favorite', methods=['POST'])
def add_favorite():
    """
    Endpoint to add a favorite movie or TV show for a user.

    Expects 'user_id', 'media_type', 'id', 'title', and 'poster_path'.
    Validates required fields and adds a new favorite movie or tv serie.

    Returns:
        - JSON containing the new favorite's ID on successful addition.
        - JSON with error message if any required fields are missing.
    """
    fields = request.get_json()
    data = fields.get('params') if fields.get('params') else fields

    user_id = data.get('user_id')
    media_type = data.get('media_type')
    id = data.get('id')
    title = data.get('title')
    poster_path = data.get('poster_path')

    # Validate required fields
    error_message = utils.validate_required_fields(
        user_id=user_id,
        media_type=media_type,
        id=id,
        title=title,
        poster_path=poster_path
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
        media_type=media_type,
        id=id,
        title=title,
        poster_path=poster_path
    )
    favorite_id = favorites.insert_one(favorite_data.to_dict()).inserted_id

    return jsonify({'favorite_id': str(favorite_id)}), 201


@app.route('/api/favorite/<user_id>', methods=['GET'], endpoint='api_get_favorites')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
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
        return jsonify(
            results = [utils.serialize_document(doc) for doc in favorites_result]
        ), 200
    else:
        return jsonify({'error': 'No favorites found for user'}), 404


@app.route('/api/favorite', methods=['DELETE'], endpoint='api_delete_favorite')
@limiter.limit(api_only_limit)
@cross_origin(supports_credentials=True)
@app.route('/favorite/<favorite_id>/<user_id>', methods=['DELETE'])
def delete_favorite(favorite_id, user_id):
    """
    Endpoint to delete a favorite movie or TV show for a user.

    Requires 'favorite_id' as part of the URL.

    Returns:
        - JSON with a success message on successful deletion.
        - JSON with error message if the favorite item is not found.
    """
    if not ObjectId.is_valid(favorite_id):
        return jsonify({
            'error': 'favorite_id not provided or it is invalid'
        }), 400

    if not ObjectId.is_valid(user_id):
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
