from flask import Flask, jsonify
from flask_cors import CORS
from routes.user_routes import user_routes
from routes.ai_routes import ai_routes
from config import Config

app = Flask(__name__)

# Configure CORS
CORS(app)

# Load configuration
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(user_routes)
app.register_blueprint(ai_routes)

# Define the root route
@app.route('/')
def index():
    return jsonify({"message":"Welcome to the ATMEC Medical Project API!"}) 

if __name__ == '__main__':
    app.run(debug=True)
