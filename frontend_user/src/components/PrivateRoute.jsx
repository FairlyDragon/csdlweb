import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ children, roles }) => {
  const user = authService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;