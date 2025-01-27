import { useState} from "react";
import { useNavigate } from "react-router-dom";
import Tab from "./Tab";
import GeneralUserSignupForm from "./GeneralUserSignupForm";
import DoctorAppointment from "../DoctorPortal/DoctorAppointment";
import DoctorSignupForm from "./DocotrSignupForm";
function SignupForm() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("HEALTHSEAKER");
  const [loading,setLoading]=useState(false);
  const tabData = [
    {
      id: 1,
      tabName: "Health_Seaker",
      type: "HEALTHSEAKER",
    },
    {
      id: 2,
      tabName: "Doctor",
      type: "DOCTOR",
    },
  ];

 

  return (
    <div
      className="relative bg-cover bg-center text-center p-6 rounded-lg shadow-lg"
      style={{
        backgroundImage:
          "url('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v996-026-kroiri0r.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=4577c6079475aabe21bb30ef2ce85b71')",
      }}
    >
      {loading && (<Loader></Loader>)}
      <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType} />
      {accountType=="HEALTHSEAKER" && (<GeneralUserSignupForm></GeneralUserSignupForm>)}
      {accountType=="DOCTOR" && (<DoctorSignupForm></DoctorSignupForm>)}
      
    </div>
  );
}

export default SignupForm;
