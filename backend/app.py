from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit
from routes.user_routes import user_routes
from routes.ai_routes import ai_routes
from routes.docter_routes import docter_routes
from routes.appointment_routes import appointment_routes
from flask_socketio import SocketIO, emit
import os
import gridfs
from utils.mongo_utils import db

fs = gridfs.GridFS(db)

# Initialize Flask app and Socket.IO
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app)


# app.config.from_object()

# Register blueprints
app.register_blueprint(user_routes)
app.register_blueprint(ai_routes)
app.register_blueprint(docter_routes)
app.register_blueprint(appointment_routes)


MODEL_DIR = 'aimodels/'
os.makedirs(MODEL_DIR, exist_ok=True)

@app.route('/models', methods=['POST'])
def save_model():
    """Endpoint to save the model."""
    if 'model' not in request.files:
        return jsonify({"error": "No model file provided"}), 400

    model_file = request.files['model']
    model_data = model_file.read()

    model_file.save(os.path.join(MODEL_DIR, model_file.filename))

    # print(model_file)

    # Store the model data in GridFS
    # model_id = fs.put(model_data, filename=model_file.filename)

    # model_path = os.path.join(MODEL_DIR, model_file.name)

    # with open(model_path, 'wb') as f:
    #     f.write(model_data)

    return jsonify({"message": f"Model saved successfully with ID: {1}"}), 201



@app.route('/models/<model_name>', methods=['GET'])
def load_model(model_name):
    """Endpoint to load the model."""
    model_path = os.path.join(MODEL_DIR, model_name)
    
    if not os.path.exists(model_path):
        return jsonify({"error": "Model not found"}), 404

    with open(model_path, 'r') as f:
        model_data = f.read()  # Read the model data from the file

    return jsonify({"model_data": model_data}), 200

# Basic HTTP route
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the ATMEC Medical Project API!"})

# Socket.IO events
@socketio.on('join_room')
def handle_join_room(data):
    room = data['room']
    username = data.get('name', 'Guest')
    join_room(room)
    emit('joinRoom', {'name': 'System', 'message': f"{username} has joined the room."}, room=room)

@socketio.on('leave_room')
def handle_leave_room(data):
    room = data['room']
    username = data.get('name', 'Guest')
    leave_room(room)
    emit('leftRoom', {'name': 'System', 'message': f"{username} has left the room."}, room=room)

@socketio.on('send_message')
def handle_send_message(data):
    print(data)
    emit('message', data, room=data['room'])

# Run the app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
