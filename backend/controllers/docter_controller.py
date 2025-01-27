from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from flask import jsonify, request
from utils.mongo_utils import db
import bcrypt

docter_db = db['docter']

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def add_docter():
    docter = request.json
    
    existing_docter = docter_db.find_one({"email": docter.get("email")}) 
    
    if existing_docter:
        return jsonify({"error": "Docter already exists"}), 400
    
    docter['password'] = hash_password(docter['password'])
    
    try:
        result = docter_db.insert_one(docter)
        docter['_id'] = str(result.inserted_id) 
        del docter['password'] 
        return jsonify(docter), 201
    except DuplicateKeyError:
        return jsonify({"error": "Docter already exists"}), 400
    
def update_docter(id):
    docter = request.json
    try:
        result = docter_db.update_one({"_id": ObjectId(id)}, {"$set": docter})
        if result.modified_count > 0:
            return jsonify({"message": "Docter updated successfully"}), 200
        else:
            return jsonify({"error": "Docter not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def signin():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    # Retrieve the doctor by email
    docter = docter_db.find_one({"email": email})
    
    if docter and bcrypt.checkpw(password.encode('utf-8'), docter['password'].encode('utf-8')):
        # Successful sign in
        docter['_id'] = str(docter['_id'])  # Convert ObjectId to string for the response
        del docter['password']  # Remove password from the response
        return jsonify(docter), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

def get_docter_by_id(id):
    try:
        # Ensure that the provided ID is a valid ObjectId
        if not ObjectId.is_valid(id):
            return jsonify({"error": "Invalid doctor ID"}), 400

        docter = docter_db.find_one({"_id": ObjectId(id)})
        
        if docter:
            docter['_id'] = str(docter['_id'])  # Convert ObjectId to string for the response
            del docter['password']  # Optionally remove password
            return jsonify(docter), 200
        else:
            return jsonify({"error": "Doctor not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_all_docters():
    docters = list(docter_db.find({}))
    for docter in docters:
        docter['_id'] = str(docter['_id'])
        if 'password' in docter:
            del docter['password']  # Optionally remove passwords
    return jsonify(docters), 200

def get_doctors_by_specification():
    specialization = request.args.get('specialization', '')  # Get specialization from query params
    filters = {}
    
    if specialization:
        filters["field"] = specialization
    
    doctors = list(docter_db.find(filters))
    for doctor in doctors:
        doctor['_id'] = str(doctor['_id'])
    return jsonify(doctors), 200
