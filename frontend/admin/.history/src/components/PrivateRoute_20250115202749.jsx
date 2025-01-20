import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('us');
  
  if (!user) {
    return <Navigate to="/auth/signin" />;
  }
  
  return children;
};

export default PrivateRoute;