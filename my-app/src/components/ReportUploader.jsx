import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ImageUpload.css';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [formattedText, setFormattedText] = useState('');

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
      const response = await axios.post('http://127.0.0.1:5000/extract-report-image', formData, {
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

  useEffect(() => {
    if (responseData) {
      setFormattedText(responseData);
    }
  }, [responseData]);

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const text = formattedText;

    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);

    doc.text(lines, margin, margin);

    doc.save('Diagnosis_Report.pdf');
  };

  return (
    <div className="uploadImageContainer component-margin">
      <div className="mainContent">
        <h2>Medical Report Uploader</h2>
        <input type="file" onChange={handleFileChange} />
        <br />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
        <br />
        {loading && <div className="loader"></div>}
        {responseData && (
          <div className="showReport pre">
            <h3>Extracted Report:</h3>
            <ReactMarkdown>{responseData}</ReactMarkdown>
            <div className="downloadButtonCont">
              <button className="button" type="button" onClick={handleDownload}>
                <span className="button__text">Download</span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 35"
                    id="bdd05811-e15d-428c-bb53-8661459f9307"
                    data-name="Layer 2"
                    className="svg"
                  >
                    <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                    <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                    <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
