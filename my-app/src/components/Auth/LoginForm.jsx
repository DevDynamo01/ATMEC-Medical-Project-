import { useState,useContext} from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Cookies from "js-cookie";
import DataContext from "../../context/dataContext";
import Loader from "../Loader";
import Tab from "./Tab";
function LoginForm(){
  const {user,setUser}=useContext(DataContext);
  const [accountType, setAccountType] = useState("HEALTHSEAKER");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({email: "",  password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData
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
  const handleSetCookie = (data) => {
    const serializedData = JSON.stringify(data);
    // Set the token in the cookie
    Cookies.set("medgenai", serializedData, { 
      expires: 7, // Cookie expires in 7 days
      secure: true, // Ensures the cookie is sent over HTTPS
    });
    navigate("/");

  }
  function handleOnChange(e) {
    setFormData( (prevData) =>({ ...prevData , [e.target.name] : e.target.value })                    
)}

  
  async function handleOnSubmit(e){
    e.preventDefault() 
    var targetroute=(accountType=="HEALTHSEAKER"?"user":"docter");
    try{ 
        console.log(formData)
        setLoading(true);
        const response=await axios.post(`http://127.0.0.1:5000/${targetroute}/signin`,{"email":email,"password":password});
        const cookieData=response?.data;
        handleSetCookie(cookieData);
        setUser(response?.data);
        console.log(response);
        setLoading(false);
    }catch(err){
      setLoading(false);
      console.log(err);
    }
    
  }


  return (
    <div  className="relative bg-cover bg-center text-center p-6 rounded-lg shadow-lg"
    style={{
      backgroundImage: "url('https://img.rawpixel.com/s3afs-private/rawpixel_images/website_content/v996-026-kroiri0r.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=4577c6079475aabe21bb30ef2ce85b71')",
    }}>
      {loading && <Loader></Loader>}
      <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType} />
    <form onSubmit = {handleOnSubmit} className="flex flex-col w-full gap-y-4 mt-6">

        <label className='w-full'>
            <p className='text-[0.875rem]  text-black font-bold mb-1 leading-[1.375rem]'> Email Address <sup className='text-pink-200'>*</sup>  </p>
            <input required type="email"  value = {email} onChange={handleOnChange} placeholder="Enter email address" name="email"  style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]' />
        </label>

        <label className='relative'>
            <p className='text-[0.875rem] text-black font-bold mb-1 leading-[1.375rem]'>  Password <sup className='text-pink-200'>*</sup>  </p>
            <input required type= {showPassword ? ("text") : ("password")}  value = {password} onChange={handleOnChange} placeholder="Enter Password" name="password" style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}} className='bg-[#b2dded] text-black text-lg rounded-[0.5rem]  w-full p-[12px] border-2 border-[#999999]' />   

            <span className='absolute right-3 top-[38px] cursor-pointer'  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}  
            </span>                                                                        {/* here showPassword insert eye_icon which indicate that password is visible or not */}
            
            <Link to="/forgot-password"> <p className='text-xs mt-1 text-[rgba(18,83,191,1)] font-bold max-w-max ml-auto'> Forgot Password </p> </Link>
                
        </label>

        <button className='bg-[#4caf50] rounded-[8px] font-bold text-richblack-900 px-[12px] py-[8px] mt-6'> Sign In </button>
    
    </form>
    </div>
 )}


 
export default LoginForm