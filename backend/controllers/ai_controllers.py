from flask import jsonify, request
from ai.ai_serveces import user_input
from ai.gemini import chat_with_gemini, gen_ai_json
from ai.prompts import question_generation_prompt, predict_disease_prompt, treatment_questions_prompt, treatment_plan_generation_prompt, dataset_generation_prompt
import json

def predict():
    return jsonify({'message': 'Prediction successful'}), 200   

def send_message():
    question = request.json.get('message')
    result = user_input(question)
    return jsonify(result), 200


def chat_with_ai():
    message = request.json.get('message')

    result = chat_with_gemini(message, history=[])
    print("chat :  ", result)

    return jsonify({"data":result}), 200


def generate_follow_up_questions():
    initial_symptoms = request.json.get('symptoms')
    print("initial_symptoms ", initial_symptoms)
    result = gen_ai_json(initial_symptoms, prompts=question_generation_prompt)
    result = json.loads(result)
    print("result " , result)

    return jsonify(result), 200

def predict_disease():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=predict_disease_prompt)
    result = json.loads(result)
    print("predict_disease ", result)
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
    print("generate_treatement_plan ", result)
    return jsonify(result), 200

def generate_dataset_from_sample():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=dataset_generation_prompt)
    result = json.loads(result)
    print("generated dataset ", result)
    return jsonify(result), 200

def generate_dataset_from_description():
    data = request.json
    data_string = json.dumps(data)
    result = gen_ai_json(data_string, prompts=dataset_generation_prompt)
    result = json.loads(result)
    print("generated dataset ", result)
    return jsonify(result), 200

def chat_with_image():
    message = request.json.get('message')
    image = request.json.get('image')

    result = gen_ai_image(message, image, prompts=[])
    print("chat :  ", result)

    return jsonify({"data":result}), 200