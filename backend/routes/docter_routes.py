from flask import Blueprint
from controllers.user_controller import get_all_users, get_user_by_id, add_user, signin
from controllers.docter_controller import add_docter, get_all_docters, get_docter_by_id, signin

docter_routes = Blueprint('docter', __name__)

docter_routes.route('/docter/register', methods=['POST'])(add_docter)
docter_routes.route('/docter/signin', methods=['POST'])(signin)

docter_routes.route('/docter/<id>', methods=['GET'])(get_docter_by_id)
docter_routes.route('/docters', methods=['GET'])(get_all_docters)
