import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  const token = localStorage.getItem('token');

  if (!userInfo || !token) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
