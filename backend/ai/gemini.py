import os
import google.generativeai as genai
from ai.prompts import system_prompt_1, question_generation_prompt


genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

def upload_to_gemini(path, mime_type=None):
  """Uploads the given file to Gemini.

  See https://ai.google.dev/gemini-api/docs/prompting_with_media
  """
  file = genai.upload_file(path, mime_type=mime_type)
  print(f"Uploaded file '{file.display_name}' as: {file.uri}")
  return file

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