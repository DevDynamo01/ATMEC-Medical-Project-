import React from 'react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import FeatureButtonJSON from './FeatureButtonData/FeatureButtonJSON.json';
import FeaturesButtonCard from './FeaturesButtonCard';
const HomePage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
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
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '700px',
        }}
      >
        <div className="homepage-background-image">
          <div className="description">
            <h3>
              <span className="Homepageheading">MEDGEN AI: </span>
              <TypeAnimation
                sequence={['Chat Your Cure', 3000, '']}
                repeat={Infinity}
                // omitDeletionAnimation={true}
              ></TypeAnimation>
            </h3>
            <p>
              MedGen AI uses cutting-edge AI to provide personalized medical insights from genetic
              data, helping patients and doctors make smarter, data-driven decisions for better
              health outcomes.
            </p>
          </div>
          <div className="videoFile">
            <video ref={videoRef} src="medical.mp4" muted loop />
          </div>
        </div>
      </div>
      <div className="cardCompnent">
        {FeatureButtonJSON.map((feature, index) => {
          return <FeaturesButtonCard key={index} feature={feature} />;
        })}
      </div>
      {/* {FeatureButtonJSON.map((data, key) => {});
      <div className="cardCompnent">
        {data.imageURL}
        <FeaturesButtonCard />
      </div>
     } */}
      {/* <div className="imageComponent">
        <div className="heading text-black">Chat Your Cure</div>
        <p className="homePagePara text-black">
          MedGen AI uses cutting-edge AI to provide personalized medical insights from genetic data,
          helping patients and doctors make smarter, data-driven decisions for better health
          outcomes.
        </p>
        <div className="chatButton flex flex-col gap-10">
          <HomeButton text={'Start Chat'} path={'/chatbot'}></HomeButton>
          <HomeButton text={'Disease Diagonsis'} path={'/diagonsis'}></HomeButton>
          <HomeButton text={'Generate DataSet By Description'} path={'/generateData'}></HomeButton>
          <HomeButton
            text={'Generate DataSet from Sample'}
            path={'/generateDataFromSample'}
          ></HomeButton>
          <HomeButton text={'Analyze Image'} path={'/uploadImage'}></HomeButton>
          <HomeButton text={'Analyze Medical Documents'} path={'/handle-uploader'}></HomeButton>
        </div>
        <video ref={videoRef} src="medical.mp4" muted loop />
      </div> */}
    </div>
  );
};

export default HomePage;
