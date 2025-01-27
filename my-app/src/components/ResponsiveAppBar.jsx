import * as React from 'react';
import { useState, useEffect,useContext} from 'react';
import 'reactjs-popup/dist/index.css';
import PopUp from '../PopUp';
import DataContext from '../context/dataContext';
import ProfileOverlay from './Auth/ProfileOverlay';
function ResponsiveAppBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState(null); // Store dynamic data for the pop-up
  const {user}=useContext(DataContext);
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
      {user ?( <ProfileOverlay></ProfileOverlay>):(<div className='flex gap-2 justify-center'><a href="/login" className='text-lg rounded-lg bg-[#209978] hover:bg-[#4caf50] p-3 text-white px-4'>Login</a><a href="/signup" className='text-lg rounded-lg bg-[#209978] hover:bg-[#4caf50] p-3 text-white px-4'>SignUp</a></div>)}
     
    </div>
  );
}

export default ResponsiveAppBar;
