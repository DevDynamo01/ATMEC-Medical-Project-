# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing.image import img_to_array, load_img
# from PIL import Image
# import io
# import os

# base_dir = os.path.dirname(os.path.abspath(__file__))
# skin_model_path = os.path.join(base_dir, 'models', 'best_balanced_model.keras')
# xray_model_path = os.path.join(base_dir, 'models', 'my_model.h5')

# skin_model = load_model(skin_model_path)
# xray_model = load_model(xray_model_path) 

# #==============================X-Ray Analysis Model=========================================#

# def predict_xray(image_data):
#     img_size = 224
#     image_file = io.BytesIO(image_data)
#     img = load_img(image_file, target_size=(img_size, img_size)) 
#     img_array = img_to_array(img)  
#     img_array = img_array / 255.0  
#     img_array = np.expand_dims(img_array, axis=0)

#     predictions = xray_model.predict(img_array)

#     class_names = ['COVID19', 'NORMAL', 'PNEUMONIA', 'TUBERCULOSIS']

#     predicted_class_idx = np.argmax(predictions[0])
#     confidence_score = predictions[0][predicted_class_idx]
#     predicted_class = class_names[predicted_class_idx]

#     return predicted_class, confidence_score


# #==============================Skin Disease Model=========================================#
# class_names = [
#     'Acne and Rosacea Photos',
#     'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions',
#     'Atopic Dermatitis Photos',
#     'Cellulitis Impetigo and other Bacterial Infections',
#     'Eczema Photos',
#     'Exanthems and Drug Eruptions',
#     'Herpes HPV and other STDs Photos',
#     'Light Diseases and Disorders of Pigmentation',
#     'Lupus and other Connective Tissue diseases',
#     'Melanoma Skin Cancer Nevi and Moles',
#     'Poison Ivy Photos and other Contact Dermatitis',
#     'Psoriasis pictures Lichen Planus and related diseases',
#     'Seborrheic Keratoses and other Benign Tumors',
#     'Systemic Disease',
#     'Tinea Ringworm Candidiasis and other Fungal Infections',
#     'Urticaria Hives',
#     'Vascular Tumors',
#     'Vasculitis Photos',
#     'Warts Molluscum and other Viral Infections'
# ]
# def predict_skin(image_data):
#     img_size = 192
#     img = Image.open(io.BytesIO(image_data)).convert('RGB')  # Ensure 3 channels
#     img = img.resize((img_size, img_size))
#     img_array = img_to_array(img)
#     img_array = img_array / 255.0  # Rescale
#     img_array = np.expand_dims(img_array, axis=0)
    
#     try:
#         predictions = skin_model.predict(img_array)
#     except ValueError as e:
#         raise ValueError(f"Error during model prediction: {e}")
    
#     if predictions.shape[-1] != len(class_names):
#         raise ValueError(f"Model output shape {predictions.shape[-1]} does not match number of class names {len(class_names)}.")
    
#     predicted_class_idx = np.argmax(predictions[0])
#     confidence_score = predictions[0][predicted_class_idx]
#     predicted_class = class_names[predicted_class_idx]
    
#     return predicted_class, confidence_score
