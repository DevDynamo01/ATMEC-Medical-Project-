import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const ModelTrainerWithValidation = () => {
    const [trainingCode, setTrainingCode] = useState("");
    const [csvFile, setCsvFile] = useState(null);
    const [status, setStatus] = useState("");
    const [validateModel, setValidateModel] = useState(null);

    // Handle CSV file upload
    const handleFileUpload = (e) => {
        setCsvFile(e.target.files[0]);
    };

    // Handle training code input
    const handleCodeChange = (e) => {
        setTrainingCode(e.target.value);
    };
    function updateProgress(progress) {
        const progre = `Training in progress. ${progress}% completed.`
        setStatus(progre)
    }

    function describeDataset(data) {
        const numSamples = data.length;
        const numFeatures = data[0].length - 1; // All columns except the label column
    
        // Extract unique labels
        const uniqueLabels = [...new Set(data.map(row => row[row.length - 1]))];
    
        return {
            numSamples,
            numFeatures,
            labelClasses: uniqueLabels,
            description: `Dataset contains ${numSamples} samples with ${numFeatures} features each. Labels include ${uniqueLabels.length} disease classes: ${uniqueLabels.join(', ')}.`
        };
    }
    
    async function saveModelToServer(model, modelName, serverUrl) {
        try {
            // Create a custom IOHandler to convert model weights to a binary buffer
            const modelArtifacts = await model.save(tf.io.withSaveHandler(tf.io.http(serverUrl)));
    
            // Convert the model artifacts to a binary format
            const binaryData = new Blob([modelArtifacts], { type: 'application/octet-stream' });
    
            const formData = new FormData();
            formData.append('model', binaryData, `${modelName}.bin`);
    
            // Send the model to the backend
            const response = await fetch(`${API_URL}/models`, {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`Error saving model: ${response.statusText}`);
            }
    
            console.log(`Model ${modelName} saved successfully!`);
        } catch (error) {
            console.error('Error saving model:', error);
        }
    }
    
    
    

    // Train the model using the provided code and dataset
    const handleTrainModel = async () => {
        if (!csvFile || !trainingCode) {
            setStatus("Please provide both training code and a dataset.");
            return;
        }
        setStatus("Loading data...");
    
        try {
            // Read and parse CSV data
            const data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const parsedData = e.target.result
                        .trim()
                        .split('\n')
                        .map(row => row.split(','));
                    resolve(parsedData);
                };
                reader.onerror = reject;
                reader.readAsText(csvFile);
            });
            const userTrainModel = new Function("data", "tf" , trainingCode);
            console.log("function : ", userTrainModel)
            const model = await userTrainModel(data, tf);
            const description = describeDataset(data);
            console.log("model : ", model)
            saveModelToServer(model, "modle1")
    
            setStatus("Training complete!");
        } catch (error) {
            console.error("Error during training:", error);
            setStatus("Error during training.");
        }
    };
    
    

    // Function to test validation (for demonstration)
    const handleValidate = () => {
        if (!validateModel) {
            setStatus("Train the model first before validation.");
            return;
        }

        const sampleData = tf.tensor2d([[1, 2]]); // Replace with actual data for validation
        const prediction = validateModel(sampleData);
        prediction.print();
        setStatus("Validation complete. See console for details.");
    };

    return (
        <div className='mt-[70px]'>
            <h2>Paste Training Code and Upload Dataset</h2>
            <textarea
                placeholder="Paste your training code here..."
                value={trainingCode}
                onChange={handleCodeChange}
                className='border-2 border-black rounded-md p-2'
                rows={20}
                cols={100}
            />
            <div>
                <label>CSV Dataset:</label>
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
            <button onClick={() => handleTrainModel()}>Train Model</button>
            <button onClick={handleValidate} disabled={!validateModel}>
                Validate Model
            </button>
            <p>{status}</p>
        </div>
    );
};

export default ModelTrainerWithValidation;
