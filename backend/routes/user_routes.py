from flask import Blueprint
from controllers.user_controller import get_users, create_user

user_routes = Blueprint('user', __name__)

# Define routes
user_routes.route('/users', methods=['GET'])(get_users)
user_routes.route('/users', methods=['POST'])(create_user)
