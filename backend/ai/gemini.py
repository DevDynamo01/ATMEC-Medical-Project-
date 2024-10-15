import os
import google.generativeai as genai
from ai.prompts import system_prompt_1, question_generation_prompt


genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

from io import BytesIO

def upload_to_gemini(image_data, mime_type=None, name=None, display_name=None):
    """Uploads the given image data to Gemini.

    Args:
        image_data (bytes): The image data received from the frontend.
        mime_type (str): The MIME type of the image (e.g., 'image/jpeg', 'image/png').
        name (str): Optional name for the file in the destination.
        display_name (str): Optional display name of the file.

    Returns:
        file_types.File: The response of the uploaded file.
    """
    image_io = BytesIO(image_data)

    if mime_type is None:
        raise ValueError("mime_type must be provided when passing image data")
    
    file = genai.upload_file(image_io, mime_type=mime_type, name=name, display_name=display_name)
    
    print(f"Uploaded image as: {file.uri}")
    return file

# def upload_to_gemini(path, mime_type=None):
#   """Uploads the given file to Gemini.

#   See https://ai.google.dev/gemini-api/docs/prompting_with_media
#   """
#   file = genai.upload_file(path, mime_type=mime_type)
#   print(f"Uploaded file '{file.display_name}' as: {file.uri}")
#   return file

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}
generation_config_json = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}



# files = [upload_to_gemini("Image October 11, 2024 - 11:21AM.jpeg", mime_type="image/jpeg"),]

model1 = genai.GenerativeModel(
  model_name="gemini-1.5-flash-8b",
  generation_config=generation_config,
  system_instruction=system_prompt_1,
)
# history :  {role : "user" | "model", parts:[files[0], text, text] }

def chat_with_gemini(input_text, history=[]):
  chat_session = model1.start_chat(history=history)
  response = chat_session.send_message(input_text)
  return response.text


model2 = genai.GenerativeModel(
  model_name="gemini-1.5-flash-002",
  generation_config=generation_config_json,
)

def gen_ai_json(question, prompts):
  prompts.append(f"input: {question}")
  prompts.append("output: ")
  response = model2.generate_content(prompts)
  return  response.text

def gen_ai_image(question, image, prompts):
  files = [
    upload_to_gemini(image, mime_type="application/jpeg"),
  ]
  prompts.append(files[0])
  prompts.append(f"input: {question}")
  prompts.append("output: ")
  response = model2.generate_content([prompts, image])
  return response.text