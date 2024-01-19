from backend import app, mongo
from bson import ObjectId
from datetime import datetime
from flask import jsonify, request


# Access the users collection
users = mongo.db.users

@app.route('/auth/signup', methods=['POST'])
def signup():
    """
    Endpoint for user registration.

    Requires username and email in the request JSON. It checks for the existence
    of these fields and whether the user already exists in the database.
    If validation passes, it creates a new user and returns the user ID.

    Returns:
        - JSON containing the new user's ID on successful registration.
        - JSON with error message for missing fields or if user already exists.
    """
    data = request.get_json()

    # Check if both username and email are provided
    if not data.get('username') or not data.get('email'):
        return jsonify({'error': 'Both username and email are required'}), 400

    signup_data = {k: v for k, v in data.items() if k in ['username', 'email', 'lang']}
    if not signup_data:
        return jsonify({"error": "No valid fields to signup"}), 400

    # Extract username and email for duplicate check
    username = data.get('username')
    email = data.get('email')

    # Check if the user already exists with given username or email
    if users.find_one({'$or': [{'username': username}, {'email': email}]}):
        return jsonify({'error': 'User already exists'}), 400
    
    signup_data['createdAt'] = datetime.now()
    signup_data['updatedAt'] = datetime.now()

    user_id = users.insert_one(signup_data).inserted_id

    return jsonify({'user_id': str(user_id)}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    """
    Endpoint for user login.

    Requires either username or email. It checks the users collection for a match.
    If a user is found, it returns the user ID.

    Returns:
        - JSON with user ID on successful login.
        - JSON with error message if user is not found.
    """
    data = request.json

    # Check if username or email is provided
    username = data.get('username')
    if not username:
        return jsonify({'error': 'Username or email is required'}), 400

    user = users.find_one({
        '$or': [{'username': username}, {'email': username}]
    })

    if user:
        return jsonify({'user_id': str(user['_id'])}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """
    Endpoint to retrieve user information.

    Requires a valid user ID as part of the URL. It checks if the ID is valid and
    if the user exists, then returns the user's information.

    Returns:
        - JSON with user's data if found.
        - JSON with error message if user ID is invalid or user is not found.
    """
    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(user_id):
        return jsonify({'error': 'Invalid user ID format'}), 400

    user = users.find_one({'_id': ObjectId(user_id)})

    if user:
        # Convert user document to a returnable format
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        return jsonify(user), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    """
    Endpoint to update user information.

    Requires a valid user ID in the URL and accepts username, email, and language
    in the request JSON for updates. It checks for a valid user ID and valid fields
    for update, then updates the user's information.

    Returns:
        - JSON with a success message on successful update.
        - JSON with error message if user ID is invalid, no valid fields for update,
        or user is not found.
    """
    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(user_id):
        return jsonify({'error': 'Invalid user ID format'}), 400

    data = request.get_json()
    
    # Construct an update object
    update_data = {k: v for k, v in data.items() if k in ['username', 'email', 'lang']}
    if not update_data:
        return jsonify({"error": "No valid fields to update"}), 400

    update_data['updatedAt'] = datetime.now()

    update = users.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': update_data}
    )

    if update.modified_count:
        return jsonify({'message': 'User updated'}), 200
    else:
        return jsonify({'error': 'User not found'}), 400

@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    Endpoint to delete a user.

    Requires a valid user ID as part of the URL. It checks if the ID is valid and
    if the user exists, then deletes the user.

    Returns:
        - JSON with a success message on successful deletion.
        - JSON with error message if user ID is invalid or user is not found.
    """
    # Validate if user_id is a valid ObjectId
    if not ObjectId.is_valid(user_id):
        return jsonify({'error': 'Invalid user ID format'}), 400

    user = users.delete_one({'_id': ObjectId(user_id)})

    if user.deleted_count:
        # Convert user document to a returnable format
        return jsonify({'message': 'User deleted'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404
