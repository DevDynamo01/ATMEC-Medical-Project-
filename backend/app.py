from flask import Flask, jsonify
from flask_cors import CORS
from routes.user_routes import user_routes
from routes.ai_routes import ai_routes
from routes.docter_routes import docter_routes

app = Flask(__name__)

CORS(app)

# app.config.from_object()

# Register blueprints
app.register_blueprint(user_routes)
app.register_blueprint(ai_routes)
app.register_blueprint(docter_routes)



@app.route('/')
def index():
    return jsonify({"message":"Welcome to the ATMEC Medical Project API!"}) 

if __name__ == '__main__':
    app.run(debug=True)
