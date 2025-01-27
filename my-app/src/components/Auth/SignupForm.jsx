import { useState} from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tab from "./Tab";
import Loader from "../Loader";
function SignupForm() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("HEALTHSEAKER");
  const [loading,setLoading]=useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    appointmentPrice: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { firstName, lastName, email, password, confirmPassword, specialization, appointmentPrice } = formData;

  // Handle input fields when some value changes
  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle Form Submission
  async function SignUpUser(data) {
    try {
      console.log(data);
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/user/register", data);
      console.log("API call received");
      console.log(response);
      navigate("/login");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const signupData = { ...formData, accountType };
    SignUpUser(signupData);
  }

  // Data to pass to Tab component
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

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic",
    "Neurologist",
    "Psychiatrist",
    "Gynecologist",
    "General Physician",
    "ENT Specialist",
    "Radiologist",
  ];

  return (
    <div
      className="relative bg-cover bg-center text-center p-6 rounded-lg shadow-lg"
      style={{
        backgroundImage:
          "url('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v996-026-kroiri0r.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=4577c6079475aabe21bb30ef2ce85b71')",
      }}
    >
      {/* Tab */}
      {loading && (<Loader></Loader>)}
      <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType} />

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            {/* First Name */}
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black font-bold">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter First Name"
              name="firstName"
              className="bg-[#b2dded] text-black text-lg rounded-[0.5rem] w-full p-[12px] border-2 border-[#999999]"
            />
          </label>

          <label>
            {/* Last Name */}
            <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter Last Name"
              name="lastName"
              className="bg-[#b2dded] text-black text-lg rounded-[0.5rem] w-full p-[12px] border-2 border-[#999999]"
            />
          </label>
        </div>

        <label className="w-full">
          {/* Email */}
          <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter Email"
            name="email"
            className="bg-[#b2dded] text-black text-lg rounded-[0.5rem] w-full p-[12px] border-2 border-[#999999]"
          />
        </label>
            {/* Specialization */}
            <div className="flex gap-x-4">
          {/* Create Password */}
          <label className="relative">
            <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleOnChange}
              value={password}
              placeholder="Enter Password"
              className="bg-[#b2dded] text-black text-lg rounded-[0.5rem] w-full p-[12px] border-2 border-[#999999]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative">
            <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleOnChange}
              value={confirmPassword}
              placeholder="Confirm Password"
              className="bg-[#b2dded] text-black text-lg rounded-[0.5rem] w-full p-[12px] border-2 border-[#999999]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        {accountType=="DOCTOR" && (
        <div className="flex gap-x-4">
            <label className="w-full">
              <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">
                Specialization <sup className="text-pink-200">*</sup>
              </p>
              <select
                required
                name="specialization"
                value={specialization}
                onChange={handleOnChange}
                className="bg-[#b2dded] text-black text-lg rounded-[0.5rem] w-full p-[12px] border-2 border-[#999999]"
              >
                <option value="">Select Specialization</option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </label>

            {/* Appointment Price */}
            <label className="w-full">
              <p className="text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]">
                Appointment Price<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="number"
                name="appointmentPrice"
                value={appointmentPrice}
                onChange={handleOnChange}
                placeholder="Enter Appointment Price"
                className="bg-[#b2dded] text-black text-lg rounded-[0.5rem] w-full p-[12px] border-2 border-[#999999]"
              />
            </label>
            </div>
            )}
        <button>Create an account</button>

      </form>
    </div>
  );
}

export default SignupForm;
