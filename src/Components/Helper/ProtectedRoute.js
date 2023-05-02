import React from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../../Hooks/UserContext';

const ProtectedRoute = ({ children }) => {
  const verifyLoginUser = React.useContext(GlobalContext);

  return verifyLoginUser.userData ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;
