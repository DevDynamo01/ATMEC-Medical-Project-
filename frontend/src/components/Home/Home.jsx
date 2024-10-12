import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="homeComponent">
        <div className="imagePart">
          <img src="patient.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
