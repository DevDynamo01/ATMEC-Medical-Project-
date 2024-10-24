import React from 'react';
import './PopUp.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const PopUp = ({ onClose, data }) => {
  const navigate = useNavigate();

  // Function to handle button click and close the pop-up
  const handleClick = (route) => {
    navigate(route); // Navigate to the route
    onClose(); // Close the pop-up
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="upperPart">
          <h3>{data?.headText}</h3>
          <div onClick={onClose} className="closeButton">
            X
          </div>
        </div>
        <div className="buttonDiv">
          <button className="popup-button" onClick={() => handleClick(data?.button1Route)}>
            {data?.button1Text}
          </button>
          <button className="popup-button" onClick={() => handleClick(data?.button2Route)}>
            {data?.button2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
