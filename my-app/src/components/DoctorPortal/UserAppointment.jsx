import { useState ,useEffect} from "react";
function UserAppointment(){
    const [appointments, setAppointments] = useState([
        { id:"1",name: "Liam James USER", email: "liamjames@example.com", date: "2022-01-01", time: "10:00 AM" },
        { id:"2", name: "Olivia Emma USER", email: "oliviaemma@example.com", date: "2022-01-01", time: "11:00 AM" },
        { id:"3", name: "William Benjamin USER", email: "william.benjamin@example.com", date: "2022-01-02", time: "09:00 AM" },
        { id:"4", name: "Henry Theodore USER", email: "henrytheodore@example.com", date: "2022-01-02", time: "01:00 PM" },
        { id:"5", name: "Amelia Elijah USER", email: "amelia.elijah@example.com", date: "2022-01-03", time: "03:00 PM" }
      ]);
      useEffect(() => {
        // // Fetch appointments from the mock API
        // fetch("http://localhost:5000/appointments")
        //   .then((response) => response.json())
        //   .then((data) => setAppointments(data));
      }, []);
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
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-black">{appointment.name}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.email}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.date}</td>
                    <td className="border border-gray-300 p-2 text-black">{appointment.time}</td>
                    <td className="border border-gray-300 p-2 text-black">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Accept</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    )
}
export default UserAppointment;