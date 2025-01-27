import React, { useState, useEffect } from 'react';
import './IndividualDoctorProfile.css';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
const IndividualDoctorProfile = ({ profile ,user,setLoading}) => {
  const navigate = useNavigate();
  const limitDescription = (description) => {
    if (!description) return '';
    const words = description.split(' ');
    return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : description;
  };

  async function bookAppointment(){
      try{
          // console.log(profile?._id,user_id);
          setLoading(true);
          const url="http://127.0.0.1:5000";
          const response=await axios.post(`${url}/appointment`,
            {"user_id":user?._id,
              "docter_id":profile?._id,
              "user_name":user?.firstName,
              "user_email":user?.email,
              "doctor_name":profile?.name,
              "doctor_email":profile?.email
            });
          console.log(response);
          toast.success("Appointment created!! check status on Dashboard");
          setLoading(false);
      }
      catch(err){
        setLoading(false);
        console.log(err);
      }
  }

  return (
    <div className="individual-doctor-profile relative">
      <div className="upper">
        <div className="imageContainer">
          <img src={profile?.image_url} alt={profile?.name}></img>
        </div>
        <div>
          <div className="name">{profile?.name}</div>
          <div className="field">{profile?.field}</div>
          {/* */}
          {profile?.consultation_fee && (
            <div className="fee">Consultation Fee: ${profile?.consultation_fee}</div>
          )}
          {profile?.mobile && (
            <div className="mobema">
              <div>Mobile: {profile?.mobile}</div>
              <div>Email: {profile?.email}</div>
            </div>
          )}
        </div>
      </div>
      <div className="lower">
        <div className="talknow">
          <div className="desc">{limitDescription(profile?.description)}</div>
          <div className='flex gap-2 w-full p-2'>
            <button className="w-1/2 text-[12px] bg-[ #05c37d] hover:bg-[#04a16c]" onClick={bookAppointment}>

              Book Appointment ${profile?.consultation_fee}/hour
            </button>
            <button  className="w-1/2 text-[12px] hover:bg-[#04a16c]" onClick={() => navigate('/doctor-chat', { state: { profile } })}>Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDoctorProfile;