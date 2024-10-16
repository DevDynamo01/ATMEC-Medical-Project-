import React, { useState } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// const markdown = `Just a link: www.nasa.gov.`;
const ReportUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseData, setResponseData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResponseData('');
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/extract-report-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponseData(response.data.data);
    } catch (err) {
      setError('Failed to upload the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  items-center min-h-screen p-4">
      <div className="file-upload-container w-full flex justify-evenly">
        <h1 className="text-2xl font-bold mb-4 text-white">Medical Report Uploader</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 px-4 py-2 border rounded-lg text-gray-700 bg-white shadow-sm"
        />

        <button
          onClick={handleUpload}
          className={`w-full max-w-xs px-2  font-medium text-white rounded-lg shadow-md ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload & Extract'}
        </button>

        {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
      </div>
      {responseData && (
        <div className="w-[50%] mt-4 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Extracted Report:</h2>
          {/* <p className="mt-2 text-gray-600 whitespace-pre-line">{responseData}</p> */}
          <Markdown className="w-full text-lg text-black text-start mt-4a" remarkPlugins={[remarkGfm]}>{responseData}</Markdown>
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
