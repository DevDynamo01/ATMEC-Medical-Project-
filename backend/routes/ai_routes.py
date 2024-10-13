from flask import Blueprint
from controllers.ai_controllers import predict_disease, send_message, chat_with_ai, generate_follow_up_questions, questions_for_treatement, generate_treatement_plan

ai_routes = Blueprint('ai', __name__)

# ai_routes.route('/message', methods=['POST'])(send_message)

## [ for general rag chatbot ]
ai_routes.route('/chat', methods=['POST'])(chat_with_ai)       # { message : "String"}  


## [ for diseas prediction and treatment plan generation ]
ai_routes.route('/follow-up-questions', methods=['POST'])(generate_follow_up_questions) # { symptoms : "Symptoms in string format"}

ai_routes.route('/predict', methods=['POST'])(predict_disease)

ai_routes.route('/questions-for-treatment', methods=['POST'])(questions_for_treatement) 

ai_routes.route('/treatment-plan', methods=['POST'])(generate_treatement_plan)