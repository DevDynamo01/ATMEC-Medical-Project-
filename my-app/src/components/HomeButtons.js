import { useNavigate } from "react-router-dom";
const HomeButton=({text,path})=>{
    const navigate=useNavigate();
    return(
        <button className="btn" onClick={()=>{navigate(path)}}>{text}</button>
    )
}
export default HomeButton;