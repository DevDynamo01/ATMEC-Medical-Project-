import React, { useEffect, useState } from 'react';
import './DoctorChat.css';
import { useLocation } from 'react-router-dom';
import DoctorProfile from './FeatureButtonData/DoctorProfile.json';
import UserProfile from './FeatureButtonData/UserProfile.json';
import VideoCall from './VideoCall';
import { useCookies } from 'react-cookie';

const DoctorChat = () => {
  const location = useLocation();
  const { profile } = location.state || {};
  const [chatDoctor, setChatDoctor] = useState(profile);
  useEffect(() => {
    setChatDoctor(profile);
  }, [profile]);
  console.log(chatDoctor);
  const handleClickProfile = (prof) => {
    setChatDoctor(prof);
  };

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

  return (
    <div className="chatMainComponent component-margin">
      <div className="leftPart">
        {displayObject.map((prof, ind) => {
          return (
            <div className="singleProfile" onClick={() => handleClickProfile(prof)}>
              <div className="chatDoctorImage">
                <img src={prof?.image_url}></img>
              </div>
              <div className="chatdoctordescription">
                <div className="doctorname">{prof?.name}</div>
                <div className="doctorfield">{prof?.field}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rightPart">
        <div className="rightUpperPart">
          <div className="rightUpperPartLeft">
            <div className="rightUpperPartLeftimageDiv">
              <img src={chatDoctor?.image_url} />
            </div>
            <div>{chatDoctor?.name}</div>
          </div>
          <div className="videoCallIcon">
            <img src="videoCall.png" />
          </div>
        </div>
        <div className="rightLowerPart">
          <VideoCall />
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
