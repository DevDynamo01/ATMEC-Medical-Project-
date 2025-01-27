from flask import Blueprint
from controllers.ai_controllers import predict_disease, send_message, chat_with_ai, generate_follow_up_questions, questions_for_treatement, \
    generate_treatement_plan, generate_dataset_from_sample, generate_dataset_from_description, chat_with_image, \
    predict_disease_from_image, extract_med_from_image, drug_from_smiles, drug_from_disease, mental_prediction

from controllers.metrics import get_matrix_from_file , get_metrics_from_json

from controllers.docking import dock_smile

ai_routes = Blueprint('ai', __name__)

# ai_routes.route('/message', methods=['POST'])(send_message)

## [ for general rag chatbot ]
ai_routes.route('/chat', methods=['POST'])(chat_with_ai)       # { message : "String"}  


## [ for disease prediction and treatment plan generation ]
ai_routes.route('/follow-up-questions', methods=['POST'])(generate_follow_up_questions) # { symptoms : "Symptoms in string format"}

ai_routes.route('/predict', methods=['POST'])(predict_disease)

ai_routes.route('/questions-for-treatment', methods=['POST'])(questions_for_treatement) 

ai_routes.route('/treatment-plan', methods=['POST'])(generate_treatement_plan)








## [ Generating datasets ]
ai_routes.route('/generate-dataset-from-sample', methods=['POST'])(generate_dataset_from_sample)  #  {size , sample}

ai_routes.route('/generate-dataset-from-description', methods=['POST'])(generate_dataset_from_description)  # {size, fields, descriptions}






## [ Queriying from image ]
ai_routes.route('/chat-with-image', methods=['POST'])(chat_with_image)

ai_routes.route('/disease-from-image', methods=['POST'])(predict_disease_from_image) # {image}

ai_routes.route('/extract-report-image', methods=['POST'])(extract_med_from_image) # {image}

ai_routes.route('/drug-from-smile', methods=['POST'])(drug_from_smiles)  # {smiles : CCO}

ai_routes.route('/drug-from-disease', methods=['POST'])(drug_from_disease)  # {disease : fever}

ai_routes.route('/validate-reaction', methods=['POST'])(dock_smile)  # {smiles : C1=CC=C(C=C1N)S(=O)(=O)O, target: 1dxa}

ai_routes.route('/metric-from-file', methods=['POST'])(get_matrix_from_file)  # { files[file] }

ai_routes.route('/metric-from-json', methods=['POST'])(get_metrics_from_json)  # { dataset : [ { ... }, { ... } , ... ] }

ai_routes.route('/stress-prediction', methods=['POST'])(mental_prediction) 