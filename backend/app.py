# from flask import Flask, jsonify
# from flask_cors import CORS
# from routes.user_routes import user_routes
# from routes.ai_routes import ai_routes
# from routes.docter_routes import docter_routes

# app = Flask(__name__)

# CORS(app)

# # app.config.from_object()

# # Register blueprints
# app.register_blueprint(user_routes)
# app.register_blueprint(ai_routes)
# app.register_blueprint(docter_routes)



# @app.route('/')
# def index():
#     return jsonify({"message":"Welcome to the ATMEC Medical Project API!"}) 

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit
from routes.user_routes import user_routes
from routes.ai_routes import ai_routes
from routes.docter_routes import docter_routes

# Initialize Flask app and Socket.IO
app = Flask(__name__)
CORS(app)
import os
secret_key = os.urandom(24).hex()  # Generate a 24-byte secure key
print(secret_key)
  # Replace with a secure key
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable cross-origin requests

# Register blueprints
app.register_blueprint(user_routes)
app.register_blueprint(ai_routes)
app.register_blueprint(docter_routes)

# Basic HTTP route
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the ATMEC Medical Project API!"})

# Socket.IO events
@socketio.on('join_room')
def handle_join_room(data):
    room = data['room']
    username = data.get('username', 'Guest')
    join_room(room)
    emit('message', {'username': 'System', 'message': f"{username} has joined the room."}, room=room)

@socketio.on('leave_room')
def handle_leave_room(data):
    room = data['room']
    username = data.get('username', 'Guest')
    leave_room(room)
    emit('message', {'username': 'System', 'message': f"{username} has left the room."}, room=room)

@socketio.on('send_message')
def handle_send_message(data):
    room = data['room']
    username = data['username']
    message = data['message']
    emit('message', {'username': username, 'message': message}, room=room)

# Run the app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
