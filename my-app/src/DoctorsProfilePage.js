import React from 'react';
import './DoctorProfilePage.css';
import DoctorProfile from './FeatureButtonData/DoctorProfile.json';
import IndividualDoctorProfile from './IndividualDoctorProfile';

const DoctorsProfilePage = () => {
  return (
    <div className="doctor-profile-page">
      <div className="container">
        <h4>Connect With Our Doctors</h4>
        <div className="containerofIndividualDoctorProfile">
          {DoctorProfile.map((profile, index) => {
            return <IndividualDoctorProfile key={index} profile={profile} rat={profile?.rating} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfilePage;
