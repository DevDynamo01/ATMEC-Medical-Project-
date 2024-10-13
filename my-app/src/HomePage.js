import React from 'react';
import { useRef, useEffect } from 'react';

const HomePage = () => {
  const videoRef = useRef(null);

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
        <div className="heading">Chat Your Cure</div>
        <p className="homePagePara">
          MedGen AI uses cutting-edge AI to provide personalized medical insights from genetic data,
          helping patients and doctors make smarter, data-driven decisions for better health
          outcomes.
        </p>
        <button className="chatButton">Start Chat</button>
        <video ref={videoRef} src="medical.mp4" muted loop />
      </div>
    </div>
  );
};

export default HomePage;
