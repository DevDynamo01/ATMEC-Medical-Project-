import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import DataContext from '../../context/dataContext';
const PrivateRoute = ({children}) => {

    const {user}=useContext(DataContext);
    console.log(user);
    if(user !== null)
        return children
    else
        return <Navigate to="/login" />

}

export default PrivateRoute
