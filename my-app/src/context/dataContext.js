import { createContext ,useState} from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
   const [loadingChat,setLoadingChat]=useState(false);
   const [sendImagePreview,setSendImagePreview]=useState(false);
    return (
        <DataContext.Provider value={{loadingChat,setLoadingChat,sendImagePreview,setSendImagePreview}}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;