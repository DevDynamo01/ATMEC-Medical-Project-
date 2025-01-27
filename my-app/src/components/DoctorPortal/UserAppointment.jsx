import { useState ,useEffect,useContext} from "react";
import DataContext from "../../context/dataContext";
import axios from 'axios';
function UserAppointment(){
    const [appointments, setAppointments] = useState();
    const {user}=useContext(DataContext);
      const getAppointment=async()=>{
              try{
                const url="http://localhost:5000"
                const response=await axios.post(`${url}/appointments/user`,{user_id:user?._id});
                // console.log(response);
                setAppointments(response?.data);
              }catch(err){
                console.log(err);
              }
            }
        useEffect(()=>{
          getAppointment();
        },[])
    return(
        <div>
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
                {appointments && appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-black">{appointment.doctor_name}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.doctor_email}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.date}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.time}</td>
                    {appointment?.date && (
                      <td className="border border-gray-300 p-2 text-black">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Join</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    )
}
export default UserAppointment;