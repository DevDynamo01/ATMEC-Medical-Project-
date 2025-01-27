from flask import Blueprint
from controllers.user_controller import get_all_users, get_user_by_id, add_user, signin,get_users_by_specialization

user_routes = Blueprint('user', __name__)

# Define routes
user_routes.route('/users', methods=['GET'])(get_all_users)               
user_routes.route('/user/<user_id>', methods=['GET'])(get_user_by_id) 

user_routes.route('/user/register', methods=['POST'])(add_user)         # {email, name, password }
user_routes.route('/user/signin', methods=['POST'])(signin)         # {email, password}
# user_routes.route('/docters/get-by-specialization', methods=['GET'])(get_users_by_specialization)

