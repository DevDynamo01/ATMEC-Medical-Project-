from flask import Blueprint
from controllers.appointment_controller import create_appointment, update_appointment, delete_appointment, get_docters_all_appointments, get_users_all_appointments

appointment_routes = Blueprint('appointment', __name__)

appointment_routes.route('/appointment', methods=['POST'])(create_appointment)  # { name, email, docter_id }
appointment_routes.route('/appointment/<id>', methods=['PUT'])(update_appointment)
appointment_routes.route('/appointment/<id>', methods=['DELETE'])(delete_appointment)
appointment_routes.route('/appointments/docter', methods=['POST'])(get_docters_all_appointments)   # { docter_id }
appointment_routes.route('/appointments/user', methods=['POST'])(get_users_all_appointments)   # { user_id }