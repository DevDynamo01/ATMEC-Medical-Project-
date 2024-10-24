from flask import Flask, jsonify
from flask_cors import CORS
from routes.user_routes import user_routes
from routes.ai_routes import ai_routes

# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
# import base64
# from flask import request
# from io import BytesIO

app = Flask(__name__)

CORS(app)



# def generate_dataset_from_description():
#     try:
#         data = request.json
#         size = int(data['size'])
#         fields = data['fields']
#         descriptions = data['descriptions']
        
#         dataset = {field: np.random.rand(size) for field in fields}
#         dataset['description'] = descriptions * size

#         return jsonify({'dataset': dataset})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400


# def calculate_covariance():
#     try:
#         data = request.json
#         dataset = pd.DataFrame(data['dataset'])

#         covariance_matrix = dataset.cov()

#         covariance_dict = covariance_matrix.to_dict()

#         return jsonify({'covariance_matrix': covariance_dict})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400


# def generate_accuracy_graph():
#     try:
#         accuracy = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
#         epochs = [5, 10, 15, 20]

#         plt.figure()
#         plt.plot(epochs, accuracy, label='Accuracy')
#         plt.xlabel('Epochs')
#         plt.ylabel('Accuracy')
#         plt.title('Model Accuracy over Epochs')
#         plt.legend()

#         img = BytesIO()
#         plt.savefig(img, format='png')
#         img.seek(0)

#         img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')
#         plt.close()

#         return jsonify({'accuracy_graph': img_base64})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400


# app.config.from_object()

# Register blueprints
app.register_blueprint(user_routes)
app.register_blueprint(ai_routes)



@app.route('/')
def index():
    return jsonify({"message":"Welcome to the ATMEC Medical Project API!"}) 

if __name__ == '__main__':
    app.run(debug=True)
