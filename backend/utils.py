from backend import TMDB_API_KEY, TMDB_URL, app, mongo
from bson import ObjectId
from datetime import datetime
from flask import jsonify, request
import requests


# Access the favorites and user collections
favorites = mongo.db.favorites
users = mongo.db.users

@app.route('/favorite', methods=['POST'])
def add_favorite():
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

    favorite_data = {
        k: v for k, v in data.items() if k in [
            'user_id', 'fav_type', 'fav_id', 'fav_title', 'fav_backdrop'
            ]
    }
    favorite_data['createdAt'] = datetime.now()
    favorite_id = favorites.insert_one(favorite_data).inserted_id

    return jsonify({'favorite_id': str(favorite_id)}), 201

@app.route('/favorite/<user_id>', methods=['GET'])
def get_favorites(user_id):

    user_favorites = favorites.find({'user_id': user_id})

    if user_favorites.count() > 0:
        # Convert the generator to a list
        favorites_result = [favorite for favorite in user_favorites]
        return jsonify([serialize_document(doc) for doc in favorites_result]), 200
    else:
        return jsonify({'error': 'No favorites found for user'}), 404
    
@app.route('/favorite/<favorite_id>', methods=['DELETE'])
def delete_favorite(favorite_id):
    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(favorite_id):
        return jsonify({'error': 'Invalid user ID format'}), 400

    favorite = favorites.delete_one({'_id': ObjectId(favorite_id)})

    if favorite.deleted_count:
        # Convert user document to a returnable format
        return jsonify({'message': 'Favorite deleted'}), 200
    else:
        return jsonify({'error': 'Favorite not found'}), 404

# Validate the fields required for given routes
def validate_required_fields(**fields):
    missing_fields = [field_name for field_name, value in fields.items() if not value]

    if missing_fields:
        # Constructing the error message based on missing fields
        error_message = f"{' and '.join(missing_fields)} \
                {'is' if len(missing_fields) == 1 else 'are'} required"
        return error_message
    return None

# Function to convert non-serializable types
def serialize_document(doc):
    # Convert ObjectId to string
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    # Convert datetime to string
    if 'createdAt' in doc:
        doc['createdAt'] = doc['createdAt'].strftime('%Y-%m-%d %H:%M:%S')
    if 'updatedAt' in doc:
        doc['updatedAt'] = doc['createdAt'].strftime('%Y-%m-%d %H:%M:%S')
    return doc