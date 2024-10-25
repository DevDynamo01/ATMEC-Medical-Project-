import React, { useState } from 'react';
import Loader from './Loader';

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
    if(!inputData){
            alert("input Drug field");
            setLoading(false);
      return;
    }
    console.log('input drug', sampleData);
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
    setDrugData(result);
    setLoading(false);
  };

  return (
    <div className="drug-generation-container">
      <div className="file-upload-container">
        <span className="simple-heading width500px">Enter the molecule</span>
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
          <div className="basic-information bottomborder-bottom-padding">
            <div className="simple-heading width100">Drug Properties</div>
            <div className="width100 flexinrow">
              <div className="drug-info-content">
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
                  <strong>metabolism:</strong> {drugData?.ADME_properties?.metabolism}
                </p>

                <p>
                  <strong>H_bond_acceptors:</strong> {drugData.H_bond_acceptors}
                </p>
                <p>
                  <strong>H_bond_donors:</strong> {drugData.H_bond_donors}
                </p>

                <p>
                  <strong>rotatable_bonds:</strong> {drugData.rotatable_bonds}
                </p>

                <p>
                  <strong>binding_affinity_prediction:</strong>{' '}
                  {drugData.binding_affinity_prediction}
                </p>
                <p>
                  <strong>binding_affinity_prediction:</strong>{' '}
                  {drugData.binding_affinity_prediction}
                </p>
              </div>

              <div className="drug-info-content">
                <p>
                  <strong>--ADME_properties--</strong>
                </p>

                <p>
                  <strong>Metabolism:</strong> {drugData?.ADME_properties?.metabolism}
                </p>
                <p>
                  <strong>Absorption:</strong> {drugData?.ADME_properties?.absorption}
                </p>
                <p>
                  <strong>distribution:</strong> {drugData?.ADME_properties?.distribution}
                </p>
                <p>
                  <strong>excretion:</strong> {drugData?.ADME_properties?.excretion}
                </p>

                <ul className="list-style">
                  <p>
                    <strong className="flexcenter">--Toxicity Prediction--</strong>
                  </p>
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
            </div>
          </div>

          {drugData.drug_likeness && (
            <div className="drug_likeness bottomborder-bottom-padding">
              <div className="simple-heading width100">Drug Likeness</div>
              <div className="width100 flexinrow">
                <div className="drug-info-content">
                  <p>
                    <strong>Lipinski_violations</strong>{' '}
                    {drugData.drug_likeness.Lipinski_violations}
                  </p>
                </div>

                <div className="drug-info-content">
                  <p>
                    <strong>rule_of_five_compatible</strong>{' '}
                    {drugData.drug_likeness.rule_of_five_compatible ? 'true' : 'false'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {drugData.potential_targets && (
            <div className="potential_targets bottomborder-bottom-padding">
              <div className="simple-heading width100">Potential Target</div>
              <div className="width100 flexinrow scrollinx">
                {drugData.potential_targets &&
                  drugData.potential_targets.map((element, index) => {
                    return (
                      <div className="drug-info-content" key={index}>
                        <p>
                          <strong>target_name</strong> {element.target_name}
                        </p>
                        <p>
                          <strong>
                            <strong>target_type</strong> {element.target_type}
                          </strong>
                        </p>
                        <p>
                          <strong>activity</strong> {element.activity}
                        </p>
                      </div>
                    );
                  })}

                {/* <div className="drug-info-content">
                  <p>
                    <strong>rule_of_five_compatible</strong>{' '}
                    {drugData.drug_likeness.rule_of_five_compatible ? 'true' : 'false'}
                  </p>
                </div> */}
              </div>
            </div>
          )}

          {drugData.new_drug_candidates && (
            <div className="new_drug_candidates bottomborder-bottom-padding">
              <div className="simple-heading width100">Related Drug Candidates</div>
              <div className="width100 flexincol scrollinx target-drug-card-container">
                {drugData.new_drug_candidates &&
                  drugData.new_drug_candidates.map((element, index) => {
                    return (
                      <div className="new-drug-candidate-card" key={index}>
                        <div className="left-box">
                          <span className="key-index-repeater">{index + 1}</span>
                          <p>
                            <strong>IUPAC Name:</strong> {element.SMILES}
                          </p>
                          <p>
                            <strong>IUPAC Name:</strong> {element.logP}
                          </p>

                          <p>
                            <strong>IUPAC Name:</strong> {element.molecular_formula}
                          </p>
                          <p>
                            <strong>IUPAC Name:</strong> {element.molecular_weight}
                          </p>
                          <p>
                            <strong>IUPAC Name:</strong> {element.predicted_activity}
                          </p>
                          <ul className="list-style">
                            <p>
                              <strong className="flexcenter">--Toxicity Prediction--</strong>
                            </p>
                            <li>
                              <strong>Carcinogenicity:</strong>{' '}
                              {element.toxicity_prediction.carcinogenicity}
                            </li>
                            <li>
                              <strong>Mutagenicity:</strong>{' '}
                              {element.toxicity_prediction.mutagenicity}
                            </li>
                          </ul>
                        </div>
                        <div className="right-box">
                          <img
                            src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${element.SMILES}/PNG`}
                            alt="molecular image"
                          ></img>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Druggeneration;
