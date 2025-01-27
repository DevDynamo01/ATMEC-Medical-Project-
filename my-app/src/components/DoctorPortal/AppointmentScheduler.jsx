import React, { useState } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import Loader from "../Loader";
import {toast} from 'react-hot-toast'
const AppointmentScheduler = ({getAppointment,appointment,setDisplayOverlay}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading,setLoading]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }

    const formattedDateTime = `${date}T${time}`;
    try {
      setLoading(true);
      const url="http://127.0.0.1:5000";
      const response = await axios.put(`${url}/appointment/${appointment?._id}`, {
        date:date,
        time:time,
      });
      console.log("API Response:", response.data);
      getAppointment();
      toast.success("Appointment schedule successfully!!")
      setDisplayOverlay(false);
      setLoading(false)
    } catch (err) {
      console.error("Error scheduling appointment:", err.message);
      toast.error("Error in scheduling Appointment")
      setLoading(false);
    }
  };

  return (
    <div className="absolute backdrop-blur-3xl rounded-lg left-1/3 border-gray-400" style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {loading && (<Loader></Loader>)}
      <h2>Schedule an Appointment</h2>
      <ImCross onClick={()=>{setDisplayOverlay(false)}} className="absolute right-5 top-5"/>
      <p className="text-black">with: {appointment?.user_email}</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
            className="w-full px-4 py-2 text-black bg-gray-300 rounded-md shadow-sm  border-2 border-blue-500"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="time">Select Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
             className="w-full px-4 py-2 text-black bg-gray-300 rounded-md shadow-sm  border-2 border-blue-500"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentScheduler;
