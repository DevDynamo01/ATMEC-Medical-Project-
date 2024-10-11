# controllers/user_controller.py

from pymongo import MongoClient
from flask import jsonify, request
from config import Config

# # Initialize MongoDB client
# client = MongoClient(Config.MONGODB_URI)
# db = client['<database_name>'] 

def get_users():
    """Retrieve all users."""
    # users = list(db.users.find())
    # return jsonify(users)

    return jsonify({"message": "Hello, World!"})

def create_user():
    """Create a new user."""
    # user_data = request.json
    # db.users.insert_one(user_data)
    return jsonify({"message": "User created successfully!"}), 201
