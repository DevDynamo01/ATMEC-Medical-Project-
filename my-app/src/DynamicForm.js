import React, { useState } from 'react';
import Papa from 'papaparse';
const DynamicForm = () => {
  const [fields, setFields] = useState([{ field: '', description: '' }]);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false); // Loader state
  const [dataset, setDataset] = useState(null); // State to store the dataset
  const [downloadUrl, setDownloadUrl] = useState([]);
  const [showDownBut, setDownloadButton] = useState(false);
  // Add more fields
  const handleAddMore = () => {
    setFields([...fields, { field: '', description: '' }]);
  };

  // Handle input change for fields
  const handleInputChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when API call starts
    setDownloadButton(true);
    const data = {
      size: size,
      fields: fields.map((item) => item.field),
      descriptions: fields.map((item) => item.description),
    };

    // const handleGenerateDataset = async () => {
    //   setLoading(true);
    //   const data = {
    //     size: size,
    //     fields: fields.map((item) => item.field),
    //     descriptions: fields.map((item) => item.description),
    //   }
    // };

    try {
      const response = await fetch('http://127.0.0.1:5000/generate-dataset-from-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Response from server:', result);

      // Assuming the dataset is in result.dataset
      if (result?.dataset) {
        setDataset(result.dataset);
        setDownloadButton(true);
        // =====================
        const csv = Papa.unparse(result.dataset); // Convert JSON to CSV using PapaParse
        // Step 2: Create a Blob from the CSV data
        const blob = new Blob([csv], { type: 'text/csv' });

        // Step 3: Create a URL for the Blob and set it for download
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url); // Save the Blob URL for the download
        // =====================
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false); // Hide loader once API call completes
    }
  };

  // const handleCalculateCovariance = async () => {
  //   if (!dataset) return;
  //   setLoading(true);

  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/calculate-covariance', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ dataset }),
  //     });

  //     const result = await response.json();
  //     if (result?.covariance_matrix) {
  //       setCovarianceMatrix(result.covariance_matrix);
  //     }
  //   } catch (error) {
  //     console.error('Error calculating covariance matrix:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGenerateAccuracyGraph = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/generate-accuracy-graph', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ dataset }), // If your accuracy graph depends on the dataset
  //     });

  //     const result = await response.json();
  //     if (result?.accuracy_graph) {
  //       setAccuracyData(result.accuracy_graph);
  //     }
  //   } catch (error) {
  //     console.error('Error generating accuracy graph:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Function to download CSV
  const downloadCSV = () => {
    if (!dataset) return;

    const csvRows = [];

    // Create headers
    const headers = ['Field', 'Description'];
    csvRows.push(headers.join(','));

    // Add rows from the dataset
    dataset.forEach((row) => {
      const values = [row.field, row.description];
      csvRows.push(values.join(','));
    });

    // Convert to CSV format
    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join('\n')}`;

    // Create download link
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'generated_dataset.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'processed_data.csv'); // Set filename
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link); // Clean up after the download
  };
  return (
    <div className="datasetGen">
      <div className="datasetfromdesc">
        <h2 className="datasetfromdeschead">Generate Data</h2>

        {/* Size input */}
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={size !== 0 ? size : ''}
          onChange={(event) => setSize(event.target.value)}
          className="sizeInputBox"
        />

        {/* Form for dynamic fields */}
        <form onSubmit={handleSubmit} className="datasetgenform">
          {fields.map((field, index) => (
            <div key={index} className="datasetgeninput">
              <input
                type="text"
                name="field"
                placeholder="Field"
                value={field.field}
                onChange={(event) => handleInputChange(index, event)}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={field.description}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
          ))}
          <div className="buttons">
            <button type="button" onClick={handleAddMore} className="addmorebutton">
              Add More
            </button>
            <button type="submit" className="submitbutton">
              Submit
            </button>
            {/* <button onClick={handleCalculateCovariance} className="covariancebutton">
              Covariance Matrix
            </button>
            <button onClick={handleGenerateAccuracyGraph} className="accuracybutton">
              Accuracy Graph
            </button> */}
          </div>
        </form>

        {/* Loader display */}
        {loading && <p>Loading...</p>}

        {/* Download CSV button */}
        {downloadUrl && showDownBut && (
          <button
            onClick={downloadFile}
            style={{ display: 'block', margin: '10px auto' }}
            className="download-button-csv"
          >
            Download Processed CSV
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
