import * as React from 'react';
import { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import PopUp from '../PopUp';

function ResponsiveAppBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState(null); // Store dynamic data for the pop-up

  const analyseImage = {
    headText: 'Image Analysis',
    button1Text: 'Image Diagnosis',
    button1Route: '/uploadImage',
    button2Text: 'Medical Report',
    button2Route: '/handle-uploader',
  };

  const dataset = {
    headText: 'Dataset Generation',
    button1Text: 'From Sample',
    button1Route: '/generateDataFromSample',
    button2Text: 'From Field',
    button2Route: '/generateData',
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuClick = (data) => {
    setPopUpData(data);
    setShowPopUp(true);
  };

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">MEDGEN AI</div>
      <div className="links">
        <ul className="ulLinks">
          <li className="linkItem">
            <a href="/">Home</a>
          </li>
          <li className="linkItem">
            <a href="/chatbot">Chat Bot</a>
          </li>
          <li className="linkItem">
            <a href="/diagonsis">Disease Diagnosis</a>
          </li>
          <li className="linkItem" onClick={() => handleMenuClick(analyseImage)}>
            Image Analysis
          </li>
          <li className="linkItem" onClick={() => handleMenuClick(dataset)}>
            Dataset Generation
          </li>
          {showPopUp && <PopUp onClose={() => setShowPopUp(false)} data={popUpData} />}{' '}
          {/* Pass popUpData to PopUp */}
          <li className="linkItem">
            <a href="/doctors-profile">Connect with Doctor</a>
          </li>
          <li className="linkItem">
            <a href="/druggeneration">Drug Generation From Smiles</a>
          </li>
          <li className="linkItem">
            <a href="/druggenerationfromdisease">Drug Generation From Disease</a>
          </li>
        </ul>
      </div>
      <div className="userProfile">SS</div>
    </div>
  );
}

export default ResponsiveAppBar;
