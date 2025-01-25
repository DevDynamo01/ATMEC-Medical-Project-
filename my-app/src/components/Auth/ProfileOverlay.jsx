import React, { useState, useRef, useEffect,useContext} from "react";
import Cookies from "js-cookie"; // Ensure this is installed: `npm install js-cookie`
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/dataContext";
const ProfileOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const overlayRef = useRef(null);
    const {setUser}=useContext(DataContext);
  const handleLogout = () => {
    // Remove the cookie
    console.log("sagar");
    Cookies.remove("medgenai");
    setUser(null);
    // Navigate to the home page or login page
    navigate("/");
    setShowOverlay(false);
  };

  // Close overlay when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setShowOverlay(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Profile Button */}
      {/* <button
        onClick={() => setShowOverlay(!showOverlay)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
      >
        Profile
      </button> */}
    <div className="userProfile" onClick={() => setShowOverlay(true)}>SS</div>
      {/* Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="absolute top-5 right-0 shadow-lg rounded-lg w-48 z-10"
        >
          <button
            onClick={handleLogout}
            className="z-50 block w-full text-left px-4 py-2  bg-blue-500 text-white hover:bg-gray-100 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileOverlay;
