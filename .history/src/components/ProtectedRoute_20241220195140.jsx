// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

// Simple auth check function
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Protected Route component
const ProtectedRoute = ({ children ) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }
  // If authenticated, render the children (protected content)
  return children;
};

export default ProtectedRoute;
