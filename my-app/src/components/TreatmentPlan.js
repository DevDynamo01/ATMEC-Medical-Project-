import React from 'react';

const TreatmentPlan = ({ data }) => {
  const { diagnosis, disclaimer, follow_up, lifestyle_modifications, medications, patient_details } = data.treatment_plan;
 
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Diagnosis and Disclaimer */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">{diagnosis}</h2>
        <p className="text-gray-700 mt-2 text-left">{disclaimer}</p>
      </div>

      {/* Follow-up Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Follow-up Instructions</h3>
        <div className="bg-gray-100 p-4 rounded-lg ">
          <p className='flex justify-between border-b-2 border-dashed border-b-yellow-300'><strong>Instructions:</strong> {follow_up.instructions}</p>
          <p className='flex justify-between border-b-2 border-dashed border-b-yellow-300'><strong>Timeframe:</strong> {follow_up.timeframe}</p>
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
            <p className='flex justify-between border-b-2 border-dashed border-b-yellow-300'><strong>Type:</strong> {medication.type}</p>
            <p className='flex justify-between border-b-2 border-dashed border-b-yellow-300'><strong>Dose:</strong> {medication.dose}</p>
            <p className='text-left mt-4'><strong>Instructions:</strong> {medication.instructions}</p>
          </div>
        ))}
      </div>

      {/* Patient Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Patient Details</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          {Object.keys(patient_details).map((key, index) => (
            <p className='flex justify-between border-b-2 border-dashed border-b-yellow-300' akey={index}>
              <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {patient_details[key]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TreatmentPlan;