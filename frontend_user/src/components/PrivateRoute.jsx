import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    return children;
};

export default PrivateRoute;