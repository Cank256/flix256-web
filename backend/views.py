from backend import app
from flask import jsonify, request


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Hello World!'}), 200