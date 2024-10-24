import React from 'react';
import './FeaturesButtonCard.css';
import { useNavigate } from 'react-router-dom';

const FeaturesButtonCard = ({ feature }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="cardImageContainer">
        <div className="cardImage">
          <img src={feature.imageURL} />
        </div>
      </div>
      <div className="cardButton" onClick={() => navigate(feature.routeTo)}>
        <button class="button">
          <span>{feature.buttonText} </span>
        </button>
      </div>
      {/* <div className="cardDescription">{feature.description}</div> */}
    </div>
  );
};

export default FeaturesButtonCard;
