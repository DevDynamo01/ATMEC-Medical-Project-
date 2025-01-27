from flask import jsonify, request
import requests
from ai.ai_serveces import user_input
from ai.gemini import chat_with_gemini, gen_ai_json, gen_ai_image, gen_ai_image_json
from ai.prompts import question_generation_prompt, predict_disease_prompt, treatment_questions_prompt, treatment_plan_generation_prompt, dataset_generation_prompt
from ai.prompts import disease_from_image_prompt, extract_from_image_prompt, drug_discovery_prompt, drug_from_disease_prompt, mental_state_prompt
import json
from ai.gemini import upload_url_to_gemini, upload_to_gemini
# from ai.local_models import predict_xray, predict_skin


def predict():
    return jsonify({'message': 'Prediction successful'}), 200  

def send_message():
    question = request.json.get('message')
    result = user_input(question)
    return jsonify(result), 200


def chat_with_ai():
    message = request.json.get('message')
    image_url = request.json.get('image')
    history = request.json.get('history', [])

    # for history_item in history:
    #     if history_item.image:
    #         image_url = request.files.get('image')
    print("message : ",message)
    print("image_url : ", image_url)

    if image_url:
        mime_type = "image/" + str(image_url).split('.')[-1]
        response = requests.get(image_url)
        if response.status_code == 200:
            image = response.content
            file = upload_to_gemini(image, mime_type)

            print("file ", file)
            history.append({"role": "user", "parts": [file]})

    result = chat_with_gemini(message, history=history)

    return jsonify({"data":result}), 200


def generate_follow_up_questions():
    initial_symptoms = request.json.get('symptoms')
    print("initial_symptoms ", initial_symptoms)
    result = gen_ai_json(initial_symptoms, prompts=question_generation_prompt)
    result = json.loads(result)

    return jsonify(result), 200

def predict_disease():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=predict_disease_prompt)
    result = json.loads(result)
    return jsonify(result), 200

def questions_for_treatement():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=treatment_questions_prompt)
    result = json.loads(result)
    return jsonify(result), 200

def generate_treatement_plan():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=treatment_plan_generation_prompt)
    result = json.loads(result)
    return jsonify(result), 200

def generate_dataset_from_sample():
    data = request.json
    print("printing data")
    print(data)
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=dataset_generation_prompt)
    result = json.loads(result)
    return jsonify(result), 200

def generate_dataset_from_description():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=dataset_generation_prompt)
    result = json.loads(result)
    return jsonify(result), 200

def mental_prediction():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=mental_state_prompt)
    result = json.loads(result)
    return jsonify(result), 200

from flask import request, jsonify

def chat_with_image():
    message = request.form.get('message')
    image = request.files.get('image')

    if image:
        image_data = image.read()
        mime_type = image.mimetype
        print(f"Received image: {image.filename} with mime type: {mime_type}")
        result = gen_ai_image(message, image_data, mime_type, prompts=['Analyze given images and user queries and answer them carefully.'])
        return jsonify({"data": result}), 200
    else:
        return jsonify({"error": "Image not provided"}), 400

def class_of_image(image_data, mime_type):
    parts = [
        "you will be given an image of some disease and you have to predict the class, class can be  \"xray\" (for chest x-ray images) , \"skin\" ( for skin related disease images ) and \"other\" if it is neither.\nfor example for some image your output maybe : {\"class\": \"xray\"} or {\"class\": \"skin\"} or {\"class\": \"other\"} .",
    ]
    result = gen_ai_image_json('', image_data, mime_type, prompts=parts)
    result = json.loads(result)
    print(type(result), " , result: ", result)
    return result['class']

# def predict_disease_from_image():
#     image = request.files.get('image')

#     if image:
#         image_data = image.read()
#         mime_type = image.mimetype
#         print(f"Received image: {image.filename} with mime type: {mime_type}")
#         image_class = class_of_image(image_data, mime_type)
#         disease_report_prompt = ["You are a medical expert. you will be given an image of x-ray or some skin disease. you will also be given predicted disease result from our local model. you have to create a detailed structured report with disease at the top followed by detailed analysis."]

#         if image_class == "other":
#             result = gen_ai_image('', image_data, mime_type, prompts=disease_from_image_prompt)
#         elif image_class == "skin":
#             predicted_class, confidence_score = predict_skin(image_data)
#             result = gen_ai_image(f'local model reslut : "disease" : {predicted_class}, "confidence_score": {confidence_score}.', image_data, mime_type, prompts=disease_report_prompt)
#         elif image_class == "xray":
#             predicted_class, confidence_score = predict_xray(image_data)
#             result = gen_ai_image(f'local model reslut : "disease" : {predicted_class}, "confidence_score": {confidence_score}.', image_data, mime_type, prompts=disease_report_prompt)
        
#         return jsonify({"data": result}), 200
#     else:
#         return jsonify({"error": "Image not provided"}), 400
    

def predict_disease_from_image():
    image = request.files.get('image')

    if image:
        image_data = image.read()
        mime_type = image.mimetype
        print(f"Received image: {image.filename} with mime type: {mime_type}")
        result = gen_ai_image('', image_data, mime_type, prompts=disease_from_image_prompt)
        return jsonify({"data": result}), 200
    else:
        return jsonify({"error": "Image not provided"}), 400
    
def extract_med_from_image():
    image = request.files.get('image')

    if image:
        image_data = image.read()
        mime_type = image.mimetype
        print(f"Received image: {image.filename} with mime type: {mime_type}")
        result = gen_ai_image('', image_data, mime_type, prompts=extract_from_image_prompt)
        return jsonify({"data": result}), 200
    else:
        return jsonify({"error": "Image not provided"}), 400

def drug_from_smiles():
    smile = request.json.get('smiles')
    result = gen_ai_json(smile, prompts=drug_discovery_prompt)
    result = json.loads(result)
    return jsonify(result), 200

def drug_from_disease():
    disease = request.json.get('disease')
    result = gen_ai_json(disease, prompts=drug_from_disease_prompt)
    result = json.loads(result)
    return jsonify(result), 200

