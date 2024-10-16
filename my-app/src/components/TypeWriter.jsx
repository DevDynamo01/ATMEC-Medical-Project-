import { useEffect } from "react";
import useTypewriter from "../hooks/useTypewriter";
const TypeWriter = ({ text, speed}) => {
    const displayText = useTypewriter(text, speed);
  
    return <p>{displayText}</p>;
  };
  
  export default TypeWriter;