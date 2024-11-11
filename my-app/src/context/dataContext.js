import { createContext, useState } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [loadingChat, setLoadingChat] = useState(false);
  const [sendImagePreview, setSendImagePreview] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  return (
    <DataContext.Provider
      value={{ loadingChat, setLoadingChat, file, setFile, fileDataURL, setFileDataURL }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
