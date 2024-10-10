from flask import jsonify, request

def predict():
    return jsonify({'message': 'Prediction successful'}), 200   