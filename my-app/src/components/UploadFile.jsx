import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import Loader from './Loader';
import AddFileButton from './AddFileButton';
import ImageDisplay from './SampleDataset';
import TableForData from './TableForData';
import Base64Loader from './Base64Loader';
import { useTheme } from 'styled-components';

const UploadFile = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [rowsToProcess, setRowsToProcess] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(''); // State to store the download link
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [isFileExist, setFileExist] = useState(false);
  const [inputJsonData, setInputJsonData] = useState();
  const [outputJsonData, setOutputJsonData] = useState();
  const [outputImageVisualisation, setOutputImageVisualisation] = useState();
  const [inputImageVisualisation, setInputImageVisualisation] = useState();
  const [LoadThisComponent, setLoadThisComponent] = useState('inputtable');

  const loaderHandler = (text) => {
    setLoadThisComponent(text);
  };

  const btnName = [
    { name: 'Input table', path: '/input-table', dataSend: inputJsonData, text: 'table' },
    { name: 'Output table', path: '/output-table', dataSend: outputJsonData, text: 'table' },
    { name: 'Chart', path: '/output-table', dataSend: outputJsonData, text: 'image' },
  ];

  const handleCsvParsing = (jsonData, text) => {
    if (text !== 'table') {
      loaderHandler('image');
      return;
    }
    console.log('data come-> ', jsonData);

    // Array to hold the ordered rows and values
    const rowsArray = [];
    const valuesArray = [];

    // Loop through each row in the JSON data
    jsonData.forEach((row, index) => {
      rowsArray.push({ index: index, keys: Object.keys(row) }); // Include index to maintain order
      valuesArray.push({ index: index, values: Object.values(row) }); // Include index to maintain order
    });

    // Sort rows and values by their index to ensure order
    rowsArray.sort((a, b) => a.index - b.index);
    valuesArray.sort((a, b) => a.index - b.index);

    // Extract the actual rows and values without the index
    const orderedRows = rowsArray.map((row) => row.keys);
    const orderedValues = valuesArray.map((value) => value.values);

    setTableRows(orderedRows[0]); // Set the first row as headers
    setValues(orderedValues.slice(0, 15)); // Limit the values to the first 15 rows
    loaderHandler(text);
  };

  const fetchMetricVisualisationForData = async (JsonData) => {
    const sampleData = {
      dataset: JsonData,
    };
    console.log(sampleData);
    const url = 'http://127.0.0.1:5000/metric-from-json';
    const response = await fetch(url, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(sampleData), // Convert sampleData to JSON and send it in the body
    });
    const result = await response.json();
    // Extract all the keys
    console.log('analysis result', result.visualizations);
    // const keys = Object.keys(result.visualizations);
    return result.visualizations;
  };

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.forEach((d, index) => {
          rowsArray.push({ index: index, keys: Object.keys(d) });
          valuesArray.push({ index: index, values: Object.values(d) });
        });

        // Sort rows and values by their index to ensure order
        rowsArray.sort((a, b) => a.index - b.index);
        valuesArray.sort((a, b) => a.index - b.index);

        // Extract the actual rows and values without the index
        const orderedRows = rowsArray.map((row) => row.keys);
        const orderedValues = valuesArray.map((value) => value.values);

        setParsedData(results.data); // Full parsed data
        setTableRows(orderedRows[0]); // Set the headers (column names)
        setValues(orderedValues); // Set the table values
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

    setInputJsonData(formattedData.sample); // Set input data (maybe a typo, should be setInputJsonData?)

    try {
      console.log('Fetching visualization for input data...');

      // Fetch the visualization for the input data
      const inputData = await fetchMetricVisualisationForData(formattedData.sample);

      // Set the input image visualization
      setInputImageVisualisation(inputData); // Assuming setInputImageVisualisation takes input data as an argument

      // Sending JSON data to backend via axios
      setLoading(true);

      const response = await axios.post(
        'http://127.0.0.1:5000/generate-dataset-from-sample',
        formattedData,
      );
      console.log(response.data.dataset); // Assuming response.data contains the JSON object

      // Step 1: Convert response JSON to CSV
      const outputJsonData = response.data.dataset;
      setOutputJsonData(outputJsonData); // Set output data for further use

      // Fetch the visualization for the output data
      console.log('Fetching visualization for output data...');
      const outputResponse = await fetchMetricVisualisationForData(outputJsonData);

      // Set the output image visualization
      setOutputImageVisualisation(outputResponse); // Assuming setOutputImageVisualisation takes output data as an argument

      // Convert output JSON to CSV using PapaParse
      const csv = Papa.unparse(outputJsonData);

      // Step 2: Create a Blob from the CSV data
      const blob = new Blob([csv], { type: 'text/csv' });

      // Step 3: Create a URL for the Blob and set it for download
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url); // Save the Blob URL for the download
      setFileExist(true);
      loaderHandler('image');
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setLoading(false); // Stop loading
    }
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

  const [loadComponent, setLoadComponent] = useState('input-table');
  return (
    <div className="upload-csv-container component-margin">
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

      <div className="image-container">
        <div className="data-analysis-section">
          {btnName.map((element) => {
            return (
              <button
                className="btn-for-different-section"
                onClick={() => {
                  handleCsvParsing(element.dataSend, element.text);
                }}
              >
                {element.name}
              </button>
            );
          })}
          {loading && (
            <div div className="loader_div">
              <Loader></Loader>
            </div>
          )}
          {/* <button onClick={()=>{}}>{Chart}</button> */}
        </div>
        {LoadThisComponent == 'table' && (
          <TableForData tableRows={tableRows} values={values}></TableForData>
        )}
        {LoadThisComponent == 'image' && (
          <div className="analysis-container-image">
            <div className="input-graph-box">
              {inputImageVisualisation &&
                Object.keys(inputImageVisualisation).map((key) => (
                  <>
                    <p>{key}</p>
                    <Base64Loader imageBase64={inputImageVisualisation[key]} />
                  </>
                ))}
            </div>
            <div className="output-graph-box">
              {outputImageVisualisation &&
                Object.keys(outputImageVisualisation).map((key) => (
                  <>
                    <p>{key}</p>
                    <Base64Loader imageBase64={outputImageVisualisation[key]} />
                  </>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
