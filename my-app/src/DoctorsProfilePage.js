import React, { useEffect, useState } from 'react';
import './DoctorProfilePage.css';
import DoctorProfile from './FeatureButtonData/DoctorProfile.json';
import UserProfile from './FeatureButtonData/UserProfile.json';
import IndividualDoctorProfile from './IndividualDoctorProfile';
import { useCookies } from 'react-cookie';

const DoctorsProfilePage = () => {
  const [cookies] = useCookies(['userinfo']);
  const role = cookies?.userinfo?.role?.role || '';
  const [displayObject, setDisplayObject] = useState([]);

  useEffect(() => {
    console.log('Cookies:', cookies);
    console.log('Role:', role);

    if (role === 'patient') {
      setDisplayObject(DoctorProfile);
    } else {
      setDisplayObject(UserProfile);
    }
  }, [role, cookies]);

  console.log('Display object:', displayObject);

  return (
    <div className="doctor-profile-page">
      <div className="container">
        <h4>Connect With Our Doctors</h4>
        <div className="containerofIndividualDoctorProfile">
          {displayObject.map((profile, index) => (
            <IndividualDoctorProfile key={index} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfilePage;
