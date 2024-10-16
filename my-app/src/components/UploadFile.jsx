import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const UploadFile = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [rowsToProcess, setRowsToProcess] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(''); // State to store the download link

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data); // Full parsed data
        setTableRows(rowsArray[0]); // Set the headers (column names)
        setValues(valuesArray); // Set the table values
      },
    });
  };

  const rowChangeHandler = (event) => {
    setRowsToProcess(event.target.value); // Store the number of rows to process
  };

const handleSubmit = () => {
  const formattedData = {
    size: rowsToProcess, // Total number of rows
    sample: parsedData.slice(0, parsedData.length), // Limit rows if specified
  };

  console.log(formattedData);

  // Sending JSON data to backend
  axios
    .post('http://127.0.0.1:5000/generate-dataset-from-sample', formattedData)
    .then((response) => {
      console.log(response.data.dataset); // Assuming response.data contains the JSON object

      // Step 1: Convert JSON to CSV
      const jsonToConvert = response.data.dataset; // Assuming `dataset` is the key holding JSON data
// =====================

        jsonToConvert.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data); // Full parsed data
        setTableRows(rowsArray[0]); // Set the headers (column names)
        setValues(valuesArray);



// ==================


      const csv = Papa.unparse(jsonToConvert); // Convert JSON to CSV using PapaParse
      // Step 2: Create a Blob from the CSV data
      const blob = new Blob([csv], { type: 'text/csv' });

      // Step 3: Create a URL for the Blob and set it for download
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url); // Save the Blob URL for the download
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
};

// Function to download the CSV file
const downloadFile = () => {
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', 'processed_data.csv'); // Set filename
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link); // Clean up after the download
};



  return (
    <div className="upload-csv-container">
      {/* File Uploader */}
      <div className="file-upload-container">
        <h5>Choose file to generate data</h5>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: 'block', margin: '10px auto' }}
        />

        {/* Input field for number of rows */}
        <input
          className="size-input-of-dataset"
          type="number"
          placeholder="Enter number of rows to process"
          value={rowsToProcess}
          onChange={rowChangeHandler}
          style={{ display: 'block', margin: '10px auto' }}
        />

        {/* Button to submit and call API */}
        <button onClick={handleSubmit} style={{ display: 'block', margin: '10px auto' }}>
          Submit
        </button>

        {/* Display the download button if the downloadUrl is available */}
        {downloadUrl && (
          <button
            onClick={downloadFile}
            style={{ display: 'block', margin: '10px auto' }}
            className="download-button"
          >
            Download Processed CSV
          </button>
        )}
      </div>

      {/* Display table, if data exists */}
      {tableRows.length > 0 &&
        <div>
          <h3>---Data You Uploaded---</h3>
        </div>
      }
      {tableRows.length > 0 && (
        <div className="table_container">
          <br />
          <table>
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => {
                return (
                  <tr key={index}>
                    {value.map((val, i) => {
                      return <td key={i}>{val}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
