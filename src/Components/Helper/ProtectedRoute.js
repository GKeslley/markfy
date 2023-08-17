import React from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../../UserContext';

const ProtectedRoute = ({ children }) => {
  const { userData } = React.useContext(GlobalContext);

  return userData ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
