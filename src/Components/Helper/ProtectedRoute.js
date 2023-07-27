import React from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../../UserContext';

const ProtectedRoute = ({ children }) => {
  const verifyLoginUser = React.useContext(GlobalContext);

  return verifyLoginUser.userData ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;
