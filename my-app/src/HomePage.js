import React from 'react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const videoRef = useRef(null);
  const navigate=useNavigate();
  useEffect(() => {
    const playVideo = async () => {
      try {
        await videoRef.current.play();
      } catch (err) {
        console.log('Video autoplay prevented:', err);
      }
    };
    playVideo();
  }, []);

  return (
    <div className="homePage">
      <div className="imageComponent">
        <div className="heading text-black">Chat Your Cure</div>
        <p className="homePagePara text-black">
          MedGen AI uses cutting-edge AI to provide personalized medical insights from genetic data,
          helping patients and doctors make smarter, data-driven decisions for better health
          outcomes.
        </p>
        <div className='chatButton flex gap-5'>
        <button className="navigateButtons" onClick={()=>{navigate("/chatbot")}}>Start Chat</button>
        <button className="navigateButtons" onClick={()=>{navigate("/diagonsis")}}>Disease Diagonsis</button>
        </div>
        <video ref={videoRef} src="medical.mp4" muted loop />
      </div>
    </div>
  );
};

export default HomePage;
