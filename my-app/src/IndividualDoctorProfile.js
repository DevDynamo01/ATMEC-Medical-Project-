import React, { useState, useEffect } from 'react';
import './IndividualDoctorProfile.css';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useNavigate } from 'react-router-dom';

const IndividualDoctorProfile = ({ profile, rat }) => {
  const [rating, setRating] = useState(rat);
  const navigate = useNavigate();
  useEffect(() => {
    setRating(rat);
  }, [rat]);

  const limitDescription = (description) => {
    if (!description) return '';
    const words = description.split(' ');
    return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : description;
  };

  return (
    <div className="individual-doctor-profile">
      <div className="upper">
        <div className="imageContainer">
          <img src={profile?.image_url} alt={profile?.name}></img>
        </div>
        <div>
          <div className="name">{profile?.name}</div>
          <div className="field">{profile?.field}</div>
          {/* */}
          <div className="fee">Consultation Fee: ${profile?.consultation_fee}</div>
          <div className="mobema">
            <div>Mobile: {profile?.mobile}</div>
            <div>Email: {profile?.email}</div>
          </div>
        </div>
      </div>
      <div className="lower">
        <div className="talknow">
          <div className="desc">{limitDescription(profile?.description)}</div>
          <button
            onClick={() => navigate('/doctor-chat', { state: { profile } })}
            className="talknowbutton"
          >
            Talk Now @{profile?.consultation_fee}/hour
          </button>
        </div>
        <div>{/* <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} /> */}</div>
      </div>
    </div>
  );
};

export default IndividualDoctorProfile;
