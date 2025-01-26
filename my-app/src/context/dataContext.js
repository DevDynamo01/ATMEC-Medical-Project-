import { createContext, useState } from 'react';
import Cookies from "js-cookie";
const DataContext = createContext();
const handleGetCookie = () => {
  const cookieData = Cookies.get("medgenai");

  if (cookieData) {
    try {
      const parsedData = JSON.parse(cookieData);
      console.log("Retrieved cookie data:", parsedData);
      return parsedData;
    } catch (error) {
      console.error("Error parsing cookie data:", error);
    }
  } else {
    console.log("Cookie not found!");
    return null;
  }
};
export const DataContextProvider = ({ children }) => {
  const [loadingChat, setLoadingChat] = useState(false);
  const [sendImagePreview, setSendImagePreview] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [user,setUser]=useState(handleGetCookie());
  return (
    <DataContext.Provider
      value={{ loadingChat, setLoadingChat, file, setFile, fileDataURL, setFileDataURL,user,setUser}}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
