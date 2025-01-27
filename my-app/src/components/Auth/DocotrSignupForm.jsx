import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function DoctorSignupForm() {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    field: "",
    consultation_fee: "",
    address: "",
    mobile: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
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

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/docter/register", {
        ...formData,
        accountType: "DOCTOR",
      });
      console.log(response);
    console.log(formData);
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
      <h2 className="text-2xl font-bold mb-4">Signup as Doctor</h2>
      <form onSubmit={handleOnSubmit} className="space-y-4">
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            placeholder="Name"
            style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
          />
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          placeholder="Email Address"
          style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
        />
          <input
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Password"
            style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
          />
        <select
          required
          name="field"
          value={formData.field}
          onChange={handleOnChange}
          style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
        >
          <option value="" disabled>
            Select Specialization
          </option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        <input
          required
          type="number"
          name="consultation_fee"
          value={formData.consultation_fee}
          onChange={handleOnChange}
          placeholder="Appointment Price"
          style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
        />
        <input
          required
          type="text"
          name="address"
          value={formData.address}
          onChange={handleOnChange}
          placeholder="Address"
         style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
        />
        <input
          required
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleOnChange}
          placeholder="Mobile Number"
          style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
        />
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={handleOnChange}
          placeholder="Description"
          style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]'
        />
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

export default DoctorSignupForm;
