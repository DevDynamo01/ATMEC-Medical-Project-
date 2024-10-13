import React from 'react';

const DiagnosisReport = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Disease and Confidence */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">{data?.disease}</h2>
        <p className="text-sm text-gray-500">Confidence: {data?.confidence}</p>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
            {/*=========  */}
            {Object.entries(data.summary).map(([key, value], idx) => (
                <div key={idx} className="summary-item w-full flex justify-between border-b-2 border-dashed border-b-yellow-400">
                <span className="summary-key font-bold">{key}:</span> 
                <span className="summary-value font-bold">{value}</span>
                </div>
            ))}
            {/* ========== */}
          {/* <p><strong>Symptoms:</strong> {data?.summary?.symptoms}</p>
          <p><strong>Severity of Shortness of Breath:</strong> {data?.summary.severity_of_shortness_of_breath}</p>
          <p><strong>Phlegm:</strong> {data?.summary.phlegm}</p>
          <p><strong>Recent Exposure:</strong> {data?.summary.recent_exposure}</p>
          <p><strong>Respiratory History:</strong> {data?.summary.respiratory_history}</p> */}
        </div>
      </div>

      {/* Details Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Details</h3>
        <p className="text-gray-700 text-left">{data?.details}</p>
      </div>

      {/* Next Steps Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Next Steps</h3>
        <ul className="list-disc list-inside text-gray-700 text-left">
          {data?.next_steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      {/* Disclaimer Section */}
      <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500">
        <p className="text-yellow-800 text-sm">{data?.disclaimer}</p>
      </div>
    </div>
  );
};
export default DiagnosisReport;