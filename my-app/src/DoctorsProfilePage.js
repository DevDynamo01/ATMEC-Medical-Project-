import React, { useEffect, useState,useContext} from 'react';
import './DoctorProfilePage.css';
import DoctorProfile from './FeatureButtonData/DoctorProfile.json';
import UserProfile from './FeatureButtonData/UserProfile.json';
import IndividualDoctorProfile from './IndividualDoctorProfile';
import { useCookies } from 'react-cookie';
import DataContext from './context/dataContext';
import axios from 'axios';
const DoctorsProfilePage = () => {
    const url="http://127.0.0.1:5000";
    const {user}=useContext(DataContext);
    const [doctors,setDoctors]=useState([]);
    const [specialization,setSpecialization]=useState("");
    const getAvailableDoctors = async (specialization) => {
      try {
        const response = await axios.get(`${url}/docters/get-by-specialization`, {
          params: {
            specialization: specialization
          }
        });
        console.log(response.data);
        setDoctors(response?.data);
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(()=>{
      getAvailableDoctors(specialization)
    },[specialization]);
  return (
    <div className="doctor-profile-page">
      <div className="container">
        <h4>Connect With Our Doctors</h4>
        <div className="containerofIndividualDoctorProfile">
            {doctors && doctors.length>0 &&(
              doctors.map((profile, index) => (
                <IndividualDoctorProfile key={index} profile={profile} user_id={user?._id}/>
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfilePage;
