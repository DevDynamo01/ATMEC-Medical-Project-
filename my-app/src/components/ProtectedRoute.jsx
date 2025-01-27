import React from 'react';
import {Navigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(['user']); 
  if (cookies.user) {
    return children;
  } else {
    return (
    <Navigate to="/login" replace />
    )
  }
};

export default ProtectedRoute;
