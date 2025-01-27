import { useState ,useEffect,useContext} from "react";
import DataContext from "../../context/dataContext";
import axios from 'axios';
import AppointmentScheduler from "./AppointmentScheduler";
import {toast} from 'react-hot-toast'
function UserAppointment(){
  const {user}=useContext(DataContext);
  const [selectAppointment,setSelectAppointment]=useState();
    const [appointments, setAppointments] = useState([]);
    const [displayoverlay,setDisplayOverlay]=useState(false);
      const getAppointment=async()=>{
        try{
          const url="http://localhost:5000"
          const response=await axios.post(`${url}/appointments/docter`,{docter_id:user?._id});
          // console.log(response);
          setAppointments(response?.data);
        }catch(err){
          console.log(err);
        }
      }
      const deleteAppointment=async(id)=>{
        try{
        const url="http://localhost:5000"
        const response = await axios.delete(`${url}/appointment/${id}`);
        toast.success("Appointment deleted successfully!!")
        getAppointment();
        }catch(err){
          toast.error("Error in deleting Appointment!!")
          console.log(err);
        }
      }
      useEffect(() => {
        getAppointment();
      }, []);
    return(
        <div className="relative">
          { displayoverlay &&(
          <AppointmentScheduler appointment={selectAppointment} getAppointment={getAppointment} setDisplayOverlay={setDisplayOverlay}></AppointmentScheduler>
          )} 
          <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
            <table className="w-full  border-collapse border border-gray-300">
              <thead>
                <tr className="bg-white text-black">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-black">{appointment.user_name}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.user_email}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.date}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.time}</td>
                    <td className="border border-gray-300 p-2 text-black">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={()=>{setSelectAppointment(appointment);setDisplayOverlay(true)}}>Accept</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>deleteAppointment(appointment?._id)}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    )
}
export default UserAppointment;