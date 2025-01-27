import React, { useEffect, useState } from 'react';
import './DoctorChat.css';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useCookies } from 'react-cookie';
import VideoCall from './VideoCall';

const socket = io('http://localhost:5000');

const DoctorChat = () => {
  const location = useLocation();
  const { profile } = location.state || {};
  const [chatDoctor, setChatDoctor] = useState(profile);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [cookies] = useCookies(['medgenai']);
  const role = cookies?.medgenai?.accountType || '';
  const [displayProfiles, setDisplayProfiles] = useState([]);
  const [showVideoCall, setShowVideoCall] = useState(false);

  const currentUser = cookies?.medgenai?.firstName || cookies?.medgenai?.name;

  // Fetch profiles based on user role
  useEffect(() => {
    const fetchProfiles = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const data = await response.json();
        setDisplayProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    if (role === 'HEALTHSEAKER') {
      fetchProfiles('http://127.0.0.1:5000/docters');
    } else {
      fetchProfiles('http://127.0.0.1:5000/users');
    }
  }, [role]);

  // Join socket room
  useEffect(() => {
    if (chatDoctor?._id) {
      socket.emit('join_room', {
        room: chatDoctor._id,
        name: chatDoctor?.name || chatDoctor?.firstName,
      });
    }

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log('message : ', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.emit('leave_room', {
        room: chatDoctor._id,
        name: chatDoctor?.name || chatDoctor?.firstName,
      });
    };
  }, [chatDoctor]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        room: chatDoctor?._id,
        sender: currentUser,
        senderemail: cookies?.medgenai?.email,
        message: newMessage,
        time: new Date().toLocaleTimeString(),
      };

      // Emit message to the room
      socket.emit('sendMessage', messageData);

      // Update local state for the sender
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  const toggleVideoCall = () => setShowVideoCall((prev) => !prev);

  return (
    <div className="chatMainComponent component-margin">
      {/* Left Section: Profiles List */}
      <div className="leftPart">
        {displayProfiles.map((prof, ind) => (
          <div
            key={ind}
            className={`singleProfile ${chatDoctor?.email === prof?.email ? 'active' : ''}`}
            onClick={() => setChatDoctor(prof)}
          >
            <div className="chatDoctorImage">
              <img
                src={
                  prof?.image_url ||
                  'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
                }
                alt={prof?.name || 'Profile'}
              />
            </div>
            <div className="chatDoctorDescription">
              <div className="doctorName">
                {prof?.name ||
                  (prof?.firstName && prof?.lastName
                    ? `${prof.firstName} ${prof.lastName}`
                    : 'No Name Available')}
              </div>
              <div className="doctorField">{prof?.field}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section: Chat and Video Call */}
      <div className="rightPart">
        {/* Chat Header */}
        <div className="rightUpperPart">
          <div className="rightUpperPartLeft">
            <div className="rightUpperPartLeftImageDiv">
              <img
                src={
                  chatDoctor?.image_url ||
                  'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
                }
                alt={chatDoctor?.name || 'Selected Profile'}
              />
            </div>
            <div>
              {chatDoctor?.name ||
                (chatDoctor?.firstName && chatDoctor?.lastName
                  ? `${chatDoctor.firstName} ${chatDoctor.lastName}`
                  : 'No Name Available')}
            </div>
          </div>
          <div className="videoCallIcon" onClick={toggleVideoCall}>
            <img src="videoCall.png" alt="Video Call Icon" />
          </div>
        </div>

        {/* Chat Body */}
        <div className="rightLowerPart">
          {showVideoCall ? (
            <VideoCall />
          ) : (
            <div className="chatSection">
              <div className="chatMessages">
                {messages.map((message, index) => (
                  <div>
                    {chatDoctor?.email === message.senderemail && (
                      <div
                        key={message.senderemail}
                        className={`message ${
                          message.sender === currentUser ? 'sent' : 'received'
                        }`}
                      >
                        <strong>{message.sender}:</strong> {message.message}
                        {/* <div className="timestamp">{message.time}</div> */}
                      </div>
                    )}
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
