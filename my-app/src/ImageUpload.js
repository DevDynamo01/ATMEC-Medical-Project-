import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css'; // Make sure to import the CSS file

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/disease-from-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseData(response.data.data);
    } catch (error) {
      console.error('Error uploading the image:', error);
      setResponseData('Error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Uploading...' : 'Submit'}
      </button>
      <br />
      {loading && <div className="loader"></div>}
      {responseData && (
        <pre>
          <h3>Diagnosis Report:</h3>
          {responseData}
        </pre>
      )}
    </div>
  );
};

export default ImageUpload;
