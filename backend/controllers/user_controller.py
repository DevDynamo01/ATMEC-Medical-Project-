from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from flask import jsonify, request
from utils.mongo_utils import db
import bcrypt

users_collection = db['users']

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def get_all_users():
    users = list(users_collection.find({}))
    for user in users:
        user['_id'] = str(user['_id']) 
        del user['password'] 
    return jsonify(users)

def get_user_by_id(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        user['_id'] = str(user['_id']) 
        del user['password'] 
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

# Add user with password hashing
def add_user():
    user = request.json
    # user = jsonify(user)
    # print(type(user), user)
    existing_user = users_collection.find_one({"email": user['email']})
    if existing_user:
        return jsonify({"error": "User already exists"}), 400
    
    user['password'] = hash_password(user['password'])
    
    try:
        result = users_collection.insert_one(user)
        user['_id'] = str(result.inserted_id) 
        del user['password'] 
        return jsonify(user), 201
    except DuplicateKeyError:
        return jsonify({"error": "User already exists"}), 400

def signin():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    # Retrieve user by email
    user = users_collection.find_one({"email": email})
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        user['_id'] = str(user['_id']) 
        del user['password'] 
        del user['confirmPassword']
        return jsonify(user), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

def get_users_by_specialization():
    specialization = request.args.get('specialization', '') 
    filters = {"accountType": "DOCTOR"}  

   
    if specialization:
        filters["specialization"] = specialization

    
    users = list(users_collection.find(filters))
    for user in users:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        del user['password']  # Remove sensitive information like passwords

    return jsonify(users), 200