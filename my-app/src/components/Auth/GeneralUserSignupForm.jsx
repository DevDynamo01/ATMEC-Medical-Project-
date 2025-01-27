import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function GeneralUserSignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/user/register", {
        ...formData,
        accountType: "HEALTHSEEKER",
      });
      console.log(response);
      toast.success("Account created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Signup as Health Seeker</h2>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <input
            required
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="First Name"
            style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
          />
          <input
            required
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Last Name"
            style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
          />
        </div>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Email Address"
         style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
        />
        <div className="flex space-x-4">
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Password"
           style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
          />
          <input
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm Password"
           style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default GeneralUserSignupForm;
