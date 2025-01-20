import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const admin = localStorage.getItem('admin');
  
  if (!user) {
    return <Navigate to="/auth/signin" />;
  }
  
  return children;
};

export default PrivateRoute;