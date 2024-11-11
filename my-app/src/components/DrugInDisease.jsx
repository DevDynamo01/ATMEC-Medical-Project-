import React, { useState } from 'react';
import Loader from './Loader';

const DrugInDisease = () => {
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
    const sampleData = { disease: inputData };
    if (!inputData) {
      alert('input Drug field');
      setLoading(false);
      return;
    }
    console.log('input drug', sampleData);
    const url = 'http://127.0.0.1:5000/drug-from-disease';
    const response = await fetch(url, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(sampleData), // Convert sampleData to JSON and send it in the body
    });
    const result = await response.json();
    console.log(result);
    setDrugData(result);
    setLoading(false);
  };

  return (
    <div className="drug-generation-container component-margin">
      <div className="file-upload-container">
        <span className="simple-heading width500px">Enter the Disease</span>
        {/* Input field to capture data from the user */}
        <input
          className="input-field width200px"
          type="text"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Enter drug data"
        />
        {/* Button to trigger the function when clicked */}
        <button onClick={handleButtonClick} disabled={loading}>
          {loading ? 'Analysing. . .' : 'Drug Analysis'}
        </button>
      </div>

      {loading && (
        <div div className="loader_div_in_drug_generation">
          <Loader></Loader>
        </div>
      )}

      {drugData && (
        <div className="result-container">
          <div className="general-Info ">
            <div>Disease: {drugData.disease}</div>
            <div className="redcolrtext">Note: {drugData.important_note}</div>
          </div>

          <div className="big-container">
            <div className="simple-heading">Known Treatment Drug </div>
            <div className="known-treatment-drug-container">
              {drugData.known_treatments &&
                drugData.known_treatments.map((element) => {
                  return (
                    <>
                      <div className="drug-card-from-fever">
                        <div>Drug : {element.drug}</div>
                        <div>Target : {element.target}</div>
                        <div>Mechanism: {element.mechanism}</div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <div className="big-container">
            <div className="simple-heading">Drugs that have Potential to Use</div>
            <div className=" known-treatment-drug-container novices-drug-container">
              {drugData.novice_drugs &&
                drugData.novice_drugs.map((element) => {
                  return (
                    <>
                      <div className="drug-card-from-fever">
                        <div>Drug : {element.drug_candidate}</div>
                        <div>Potential Target : {element.targets}</div>
                        <div>Mechanism: {element.potential_mechanism}</div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugInDisease;
