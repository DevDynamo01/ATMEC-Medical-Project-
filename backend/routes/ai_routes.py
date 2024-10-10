from flask import Blueprint
from controllers.ai_controllers import predict

ai_routes = Blueprint('ai', __name__)

# Define routes
ai_routes.route('/predict', methods=['GET'])(predict)
