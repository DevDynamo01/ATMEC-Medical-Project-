from flask import Flask, request, jsonify
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use a non-GUI backend
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64

def get_matrix_from_file():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    
    # Load the CSV file into a pandas DataFrame
    df = pd.read_csv(file)
    
    # Get basic insights
    summary = df.describe().to_dict()  # Summary statistics
    missing_values = df.isnull().sum().to_dict()  # Missing values count

    # Create a correlation heatmap in-memory
    plt.figure(figsize=(10, 6))
    sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
    
    # Save the image to a BytesIO object
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)  # Rewind the buffer
    
    # Encode the image to base64 to send to the frontend
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')
    
    # Close the plot to avoid memory leaks
    plt.close()
    
    # Return insights and the image as base64
    return jsonify({
        'summary_statistics': summary,
        'missing_values': missing_values,
        'heatmap_image': img_base64
    })

def get_metrics_from_json():
    json_data = request.get_json()

    # Check if "dataset" key exists
    if not json_data or 'dataset' not in json_data:
        return "No dataset provided", 400

    # Extract the dataset and convert it to a pandas DataFrame
    df = pd.DataFrame(json_data['dataset'])

    # --- Basic Insights ---
    summary = df.describe(include='all').to_dict()  # General summary statistics
    missing_values = df.isnull().sum().to_dict()    # Count of missing values

    # --- Visualizations ---
    images = {}

    # 1. Correlation Heatmap (for numeric data)
    numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
    if len(numeric_cols) > 1:
        plt.figure(figsize=(10, 6))
        sns.heatmap(df[numeric_cols].corr(), annot=True, cmap='coolwarm')
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        images['heatmap'] = base64.b64encode(img.getvalue()).decode('utf-8')
        plt.close()

    # 2. Histograms (for numeric columns)
    if len(numeric_cols) > 0:
        df[numeric_cols].hist(figsize=(10, 6), bins=20)
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        images['numeric_distribution'] = base64.b64encode(img.getvalue()).decode('utf-8')
        plt.close()

    # 3. Count plots (for categorical columns)
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    for col in categorical_cols:
        plt.figure(figsize=(6, 4))
        sns.countplot(x=col, data=df)
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        images[f'{col}_distribution'] = base64.b64encode(img.getvalue()).decode('utf-8')
        plt.close()

    # 4. Pairplot (if there are multiple numeric columns)
    if len(numeric_cols) > 1:
        sns.pairplot(df[numeric_cols])
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        images['pairplot'] = base64.b64encode(img.getvalue()).decode('utf-8')
        plt.close()

    # Return insights and the visualizations
    return jsonify({
        'summary_statistics': summary,
        'missing_values': missing_values,
        'visualizations': images
    })
