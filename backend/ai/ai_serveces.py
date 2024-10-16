import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
# from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS

load_dotenv()


# Constants
EMBEDDING_MODEL = "models/embedding-001"
FAISS_INDEX_NAME = "faiss_index"
PDF_DIRECTORY = os.path.join(os.path.dirname(os.path.realpath(__file__)), "files")

# Utility functions
def get_pdf_text(pdf_docs):
    return "".join(page.page_content for page in pdf_docs)

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    return text_splitter.split_text(text)

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL)
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local(FAISS_INDEX_NAME)

def convert_pdfs_to_vectors(dir_path=PDF_DIRECTORY):
    if not os.path.isdir(dir_path):
        raise ValueError(f"The directory '{dir_path}' does not exist.")
    
    for file_name in os.listdir(dir_path):
        if file_name.endswith(".pdf"):
            file_path = os.path.join(dir_path, file_name)
            print(f"Processing {file_name}...")
            loader = PyPDFLoader(file_path)
            documents = loader.load()
            text_chunks = get_text_chunks(get_pdf_text(documents))
            get_vector_store(text_chunks)


def get_conversational_chain():
    prompt_template = """You are a medical practitioner and an expert in analyzing medical related images or symptoms working for a
    very reputed hospital. You will be provided with images or text or both and you need to identify the anomalies, any disease or
    health issues. You need to generate the result in detailed manner. Write all the findings, next steps,
    recommendation, etc. You only need to respond if the image is related to a human body and health issues.

    You may also use the following information:
    Context: \n{context}\n
    Question:\n{question}\n

    Remember, if certain aspects are not clear from the image or text, it's okay to state ‘Unable to determine based on the
    provided image.’ or ask for follow up questions to clarify the situation.

    Now analyze the image or text or both and answer the above questions in the same structured manner defined above."""

    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash-8b", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    return load_qa_chain(model, chain_type="stuff", prompt=prompt)

# Query FAISS Index
def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL)
    faiss_index_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), FAISS_INDEX_NAME)

    if not os.path.exists(faiss_index_path):
        raise FileNotFoundError(f"FAISS index not found at {faiss_index_path}. Run the vector conversion first.")

    new_db = FAISS.load_local(faiss_index_path, embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()
    response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)

    return response

# Example usage
if __name__ == "__main__":
    try:
        result = user_input("I have fever, cold, and some rashing on my skin. What disease can I have?")
        print(result['output_text'])
    except Exception as e:
        print(f"Error: {str(e)}")




