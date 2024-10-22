import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import Loader from './Loader';
import AddFileButton from './AddFileButton';

const UploadFile = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [rowsToProcess, setRowsToProcess] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(''); // State to store the download link
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [isFileExist, setFileExist] = useState(false);

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

  const handleSubmit = async () => {
    const formattedData = {
      size: rowsToProcess, // Total number of rows
      sample: parsedData.slice(0, parsedData.length), // Limit rows if specified
    };

    console.log(formattedData);

    // Sending JSON data to backend
    setLoading(true);
    await axios
      .post('http://127.0.0.1:5000/generate-dataset-from-sample', formattedData)
      .then((response) => {
        console.log(response.data.dataset); // Assuming response.data contains the JSON object

        // Step 1: Convert JSON to CSV
        const jsonToConvert = response.data.dataset; // Assuming `dataset` is the key holding JSON data

        const csv = Papa.unparse(jsonToConvert); // Convert JSON to CSV using PapaParse
        // Step 2: Create a Blob from the CSV data
        const blob = new Blob([csv], { type: 'text/csv' });

        // Step 3: Create a URL for the Blob and set it for download
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url); // Save the Blob URL for the download
        setFileExist(true);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    setLoading(false);
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
        <span className="simple-heading">Choose file to generate data</span>
        <AddFileButton fileInputRef={fileInputRef} />
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: 'none', margin: '10px auto' }}
        />
        {/* Input field for number of rows */}
        {/* <input
          className="size-input-of-dataset"
          type="number"
          placeholder="Enter number of rows to process"
          value={rowsToProcess}
          onChange={rowChangeHandler}
          style={{ display: 'block', margin: '10px auto' }}
        /> */}
        <div className="input-container">
          <input
            placeholder="Enter number of rows to process"
            className="input-field"
            type="text"
            value={rowsToProcess}
            onChange={rowChangeHandler}
          />
          <label for="input-field" className="input-label">
            Enter number of rows to process
          </label>
          <span className="input-highlight"></span>
        </div>
        {/* Button to submit and call API */}

        <div className="flex gap-2 items-center">
          {/* {loading && <Loader></Loader>} */}
          <button className="generate-btn" onClick={handleSubmit}>
            <svg
              height="24"
              width="24"
              fill="#FFFFFF"
              viewBox="0 0 24 24"
              data-name="Layer 1"
              id="Layer_1"
              className="sparkle"
            >
              <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
            </svg>

            <span className="text">{loading ? 'Generating...' : 'Generate'}</span>
          </button>
        </div>

        {/* Display the download button if the downloadUrl is available */}
        {/* /* From Uiverse.io by satyamchaudharydev */}

        {/* <div class="download-btn" data-tooltip="Size: 20Mb">
          <div class="button-wrapper">
            <div class="text">Download</div>
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="2em"
                height="2em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                ></path>
              </svg>
            </span>
          </div>
        </div> */}

        {/* {downloadUrl && ( */}
        <button
          disabled={isFileExist == false}
          onClick={downloadFile}
          style={{ display: 'block', margin: '10px auto' }}
          className="download-button"
        >
          Download CSV
        </button>
        {/* )} */}
      </div>

      {loading && (
        <div div className="loader_div">
          <Loader></Loader>
        </div>
      )}

      {/* Display table, if data exists */}
      {tableRows.length > 0 && (
        <div>
          <h3>---Data You Uploaded---</h3>
        </div>
      )}
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
