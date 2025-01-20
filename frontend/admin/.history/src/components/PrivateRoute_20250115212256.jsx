import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('user')).token : null;
  
  if (!token) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRoute;
