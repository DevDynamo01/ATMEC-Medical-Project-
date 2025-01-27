import React, { useState, useEffect,useContext} from "react";
import DoctorAppointment from "./DoctorAppointment";
import UserAppointement from "./UserAppointment";
import DataContext from "../../context/dataContext";
const App = () => {
  const {user}=useContext(DataContext);
  console.log(user);
  const [activePage, setActivePage] = useState("Appointments");



  const renderPage = () => {
    switch (activePage) {
      case "Appointments":
        return (user.accountType=="DOCTOR"?<DoctorAppointment></DoctorAppointment>:<UserAppointement></UserAppointement>)
      case "Video Call":
        return <h2 className="text-2xl font-bold">Video Call Page</h2>;
      case "Profile":
        return <h2 className="text-2xl font-bold">Profile Page</h2>;
      default:
        return <h2 className="text-2xl font-bold">Dashboard</h2>;
    }
  };

  return (
    <div className="flex h-screen mt-[60px]">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r p-4 flex flex-col gap-2 text-black font-semibold">
        <div 
            className={`w-full text-left p-2 rounded-md cursor-pointer ${activePage === "Appointments" ? "bg-gray-300" : ""}`}
                onClick={() => setActivePage("Appointments")}
            >
            Appointment</div>
        <div 
            className={`w-full text-left p-2 rounded-md cursor-pointer ${activePage === "Video Call" ? "bg-gray-300" : ""}`}
                onClick={() => setActivePage("Video Call")}
            >
            VideoCall</div>
        <div 
            className={`w-full text-left p-2 rounded-md cursor-pointer ${activePage === "Profile" ? "bg-gray-300" : ""}`}
                onClick={() => setActivePage("Profile")}
            >
            Profile</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
