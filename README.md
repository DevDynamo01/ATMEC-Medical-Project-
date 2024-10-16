# MedGenAI

## Overview

**MedGenAI** is an innovative project designed to revolutionize the healthcare industry by leveraging cutting-edge artificial intelligence. By integrating multimodal AI technologies, this solution aims to enhance diagnostic accuracy, accelerate medical research with synthetic data, and provide personalized treatment plans. Through the use of large language models (LLMs) like GPT-4, AI-driven image analysis, and generative models, MedGenAI offers a holistic approach to improving healthcare outcomes, reducing costs, and optimizing the patient experience.

### Key Features:
- **Multimodal AI for Diagnosis:** AI-powered text and image analysis for precise diagnosis.
- **Synthetic Medical Data Generation:** Create synthetic data for research and training, ensuring privacy through federated learning.
- **Personalized Treatment Plans:** AI-refined treatment recommendations based on real-time patient data.
- **Federated Learning for Privacy:** Ensures that patient data remains secure and private during model training.
- **AI-Driven Chatbots:** Collect patient data, answer queries, and build medical profiles for improved care.
- **Accelerated Drug Discovery:** Use generative models to discover and validate novel molecular structures for pharmaceuticals.

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Applications](#applications)
- [License](#license)

---

## Tech Stack

**Backend:**
- Python
- Flask (API development)
- PyTorch, Hugging Face Transformers (AI Models)
- TensorFlow Federated, PySyft (Federated Learning)
- PyCryptodome (Encryption)
- RDKit, AutoDock Vina, DeepChem (Drug Discovery)
- DICOM standards
- Cloud Platforms: AWS, Google Health Cloud

**Frontend:**
- React.js
- Custom APIs
- Healthcare APIs

**Other Tools:**
- GANs (Generative Adversarial Networks)
- Differential Privacy Techniques
- QSAR models (Quantitative Structure-Activity Relationship)

---

## Project Structure

```bash
/MedGenAI
│
├── /backend
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   └── /models
│       └── *Trained AI models*
│
├── /frontend
│   ├── /my-app
│   ├── public
│   └── src
│       └── *React components*
│
└── README.md


```
# MedGenAI

MedGenAI is a medical-based AI platform designed to assist with various healthcare-related tasks. This guide will help you set up the project locally, both for the backend and the frontend.

## Prerequisites

Make sure you have the following installed on your system:
- Python 3.x
- Node.js
- pip (Python package installer)
- npm (Node package manager)


## How to run project

# For python backend:

- cd backend<br>
- pip install -r requirements.txt
- creaet a .env file and add GOOGLE_API_KEY="..." # Gemini Api key from https://aistudio.google.com
- python app.py

# For the react frontend
- cd my-app
- npm install
- npm start

---



