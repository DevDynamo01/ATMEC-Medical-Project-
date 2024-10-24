import React, { useState } from 'react';

const Druggeneration = () => {
  // State to store the user input
  const [inputData, setInputData] = useState('');
const [drugData, setDrugData] = useState(null);
const [loading, setLoading] = useState(false);
  // Function to handle input changes
  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  // Function to be called when the button is clicked
  const handleButtonClick = async () => {
    setLoading(true);
    const sampleData = { smiles: inputData };
    const url = 'http://127.0.0.1:5000/drug-from-smile';
    const response = await fetch(url, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(sampleData), // Convert sampleData to JSON and send it in the body
    });
    const result = await response.json();
    console.log(result);
    setDrugData(result)
    setLoading(false);
  };

  return (
    <div className="drug-generation-container">
      <div className="file-upload-container">
        <span className="simple-heading">Enter the molecule</span>
        {/* Input field to capture data from the user */}
        <input
          className="input-field"
          type="text"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Enter drug data"
        />
        {/* Button to trigger the function when clicked */}
        <button onClick={handleButtonClick}>Create</button>
      </div>

      <div className="result-container">
        <div className="basic information">
          <h3>Drug Properties</h3>
          <p>
            <strong>IUPAC Name:</strong> {drugData.IUPAC_name}
          </p>
          <p>
            <strong>Molecular Formula:</strong> {drugData.molecular_formula}
          </p>
          <p>
            <strong>Molecular Weight:</strong> {drugData.molecular_weight} g/mol
          </p>
          <p>
            <strong>LogP:</strong> {drugData.logP}
          </p>
          <p>
            <strong>Solubility:</strong> {drugData.solubility}
          </p>
          <p>
            <strong>Toxicity Prediction:</strong>
          </p>
          <ul>
            <li>
              <strong>Carcinogenicity:</strong> {drugData.toxicity_prediction.carcinogenicity}
            </li>
            <li>
              <strong>Cardiotoxicity:</strong> {drugData.toxicity_prediction.cardiotoxicity}
            </li>
            <li>
              <strong>Hepatotoxicity:</strong> {drugData.toxicity_prediction.hepatotoxicity}
            </li>
            <li>
              <strong>Mutagenicity:</strong> {drugData.toxicity_prediction.mutagenicity}
            </li>
          </ul>
        </div>
        <div className="ADME_properties"></div>
        <div className="drug_likeness"></div>
        <div className="potential_targets"></div>
        <div className="new_drug_candidates"></div>
        <div className="ADME_properties"></div>
      </div>
    </div>
  );
};

export default Druggeneration;
