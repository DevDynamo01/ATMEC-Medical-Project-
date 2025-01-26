import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
const DiagnosisReport = ({ data }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  return (
    <div className="relative">
      {/* this is the button */}
      {/* /* From Uiverse.io by andrew-demchenk0 */}
      <div className="absolute right-11 top-7 z-10">
        <button class="buttonFollow" type="button" onClick={() => toPDF()}>
          <span class="buttonFollow__text">Download</span>
          <span class="buttonFollow__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 35"
              id="bdd05811-e15d-428c-bb53-8661459f9307"
              data-name="Layer 2"
              class="svg"
            >
              <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
              <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
              <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
            </svg>
          </span>
        </button>
      </div>
      {/* -------------------- */}
      <div ref={targetRef} className="px-10 py-10">
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border-[3px] border-blue-600 relative">
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
                <div
                  key={idx}
                  className="summary-item w-full flex justify-between border-b-2 border-dashed border-b-yellow-400"
                >
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
      </div>
    </div>
  );
};
export default DiagnosisReport;
