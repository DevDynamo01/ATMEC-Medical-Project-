import React from 'react';
import './FollowUpQuestions.css';
import { usePDF } from 'react-to-pdf';
import { useNavigate } from 'react-router-dom';
const TreatmentPlan = ({ data }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const navigate = useNavigate();
  const {
    diagnosis,
    disclaimer,
    follow_up,
    lifestyle_modifications,
    medications,
    patient_details,
  } = data.treatment_plan;

  return (
    <div className="relative">
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
      <div ref={targetRef} className="px-10 py-10">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border-[3px] border-blue-600 relative">
          {' '}
          {/* Diagnosis and Disclaimer */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-600">{diagnosis}</h2>
            <p className="text-gray-700 mt-2 text-left">{disclaimer}</p>
          </div>
          {/* Follow-up Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Follow-up Instructions</h3>
            <div className="bg-gray-100 p-4 rounded-lg ">
              <p className="flex justify-between border-b-2 border-dashed border-b-yellow-300">
                <strong>Instructions:</strong> {follow_up.instructions}
              </p>
              <p className="flex justify-between border-b-2 border-dashed border-b-yellow-300">
                <strong>Timeframe:</strong> {follow_up.timeframe}
              </p>
            </div>
          </div>
          {/* Lifestyle Modifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Lifestyle Modifications</h3>
            <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg text-left">
              {lifestyle_modifications.map((modification, index) => (
                <li key={index}>{modification}</li>
              ))}
            </ul>
          </div>
          {/* Medications Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Medications</h3>
            {medications.map((medication, index) => (
              <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg">
                <h4 className="text-md font-bold text-blue-600">{medication.name}</h4>
                <p className="flex justify-between border-b-2 border-dashed border-b-yellow-300">
                  <strong>Type:</strong> {medication.type}
                </p>
                <p className="flex justify-between border-b-2 border-dashed border-b-yellow-300">
                  <strong>Dose:</strong> {medication.dose}
                </p>
                <p className="text-left mt-4">
                  <strong>Instructions:</strong> {medication.instructions}
                </p>
              </div>
            ))}
          </div>
          {/* Patient Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Patient Details</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              {Object.keys(patient_details).map((key, index) => (
                <p
                  className="flex justify-between border-b-2 border-dashed border-b-yellow-300"
                  akey={index}
                >
                  <strong>
                    {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}:
                  </strong>{' '}
                  {patient_details[key]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/doctors-profile')}>Connnect with Doctor</button>
    </div>
  );
};
export default TreatmentPlan;
