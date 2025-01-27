import React, { useEffect, useState } from 'react';
import './DoctorChat.css';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import DoctorProfile from './FeatureButtonData/DoctorProfile.json';
import UserProfile from './FeatureButtonData/UserProfile.json';
import VideoCall from './VideoCall';
import { useCookies } from 'react-cookie';

const socket = io('http://localhost:5000');

const DoctorChat = () => {
  const location = useLocation();
  const { profile } = location.state || {};
  const [chatDoctor, setChatDoctor] = useState(profile);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setChatDoctor(profile);
  }, [profile]);

  const handleClickProfile = (prof) => {
    setChatDoctor(prof);
  };

  const [cookies] = useCookies(['medgenai']);
  const role = cookies?.medgenai?.accountType || '';
  const [displayObject, setDisplayObject] = useState([]);
  const [showVideoCall, setShowVideoCall] = useState(false);

  useEffect(() => {
    const fetchDoctorProfiles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/docters');
        if (!response.ok) {
          throw new Error('Failed to fetch doctor profiles');
        }
        const data = await response.json();
        console.log('Fetched profiles:', data);
        setDisplayObject(data);
      } catch (error) {
        console.error('Error fetching doctor profiles:', error);
      }
    };

    const fetchHealthSeakerProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch doctor profiles');
        }
        const data = await response.json();
        console.log('Fetched profiles:', data);
        setDisplayObject(data);
      } catch (error) {
        console.error('Error fetching doctor profiles:', error);
      }
    };
    if (role === 'HEALTHSEAKER') {
      fetchDoctorProfiles();
    } else if (role === 'Doctor') {
      fetchHealthSeakerProfile();
    }
  }, [role, cookies]);

  const toggleVideoCall = () => {
    setShowVideoCall((prevState) => !prevState);
  };

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: cookies?.medgenai?.firstName,
        content: newMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('sendMessage', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="chatMainComponent component-margin">
      <div className="leftPart">
        {displayObject.map((prof, ind) => (
          <div key={ind} className="singleProfile" onClick={() => handleClickProfile(prof)}>
            <div className="chatDoctorImage">
              <img src={prof?.image_url} alt="Doctor" />
            </div>
            <div className="chatdoctordescription">
              <div className="doctorname">{prof?.name}</div>
              <div className="doctorfield">{prof?.field}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rightPart">
        <div className="rightUpperPart">
          <div className="rightUpperPartLeft">
            <div className="rightUpperPartLeftimageDiv">
              <img src={chatDoctor?.image_url} alt="Selected Doctor" />
            </div>
            <div>{chatDoctor?.name}</div>
          </div>
          <div className="videoCallIcon" onClick={toggleVideoCall}>
            <img src="videoCall.png" alt="Video Call Icon" />
          </div>
        </div>
        <div className="rightLowerPart">
          {showVideoCall ? (
            <VideoCall />
          ) : (
            <div className="chatSection">
              <div className="chatMessages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    <strong>{message.sender}:</strong> {message.content}
                    <div className="timestamp">{message.time}</div>
                  </div>
                ))}
              </div>
              <div className="chatInput">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
