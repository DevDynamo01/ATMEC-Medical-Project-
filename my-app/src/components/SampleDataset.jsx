import React, { useState } from 'react';
import axios from 'axios';

const MetricsDashboard = () => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendDataToBackend = async () => {
    const dataset = {
      dataset: [
        { age: 24, gender: "male", heart_beat: 70, name: "Jon" },
        { age: 22, gender: "female", heart_beat: 80, name: "Alice" }
      ]
    };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/metric-from-json', dataset);
      console.log('Response from backend:', response.data);
      setdata(response.data); // Store visualizations separately
      console.log("data : ",data)
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <button onClick={()=>(console.log("clivk: ",data))}>click it</button>
      <button onClick={sendDataToBackend}>Get Metrics</button>
      {data && (
        <div>
          <h3>Summary Statistics</h3>
          <pre>{JSON.stringify(data.summary_statistics)}</pre>
          
          <h3>Missing Values</h3>
          <pre>{JSON.stringify(data.missing_values)}</pre>
        </div>
      )}
      {/* {Object.keys(data.visualizations).length > 0 && (
        <div>
          <h3>Visualizations</h3>
          {Object.entries(visualizations).map(([key, value]) => (
            <div key={key}>
              <h4>{key.replace(/_/g, ' ').toUpperCase()}</h4>
              <img src={`data:image/png;base64,${value}`} alt={key} />
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default MetricsDashboard;
