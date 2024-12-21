import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import OrderList from './components/orders/OrderList';
import MenuList from './components/menu/MenuList';
import UserList from './components/users/UserList';
import SystemConfig from './components/settings/SystemConfig';
import LoginForm from './components/auth/LoginForm';

// Simple auth check
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Protected Route component
function ProtectedRoute( {children} ) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children};
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Sidebar />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    ml: '280px',
                    mt: '64px',
                    bgcolor: '#F9FAFB',
                    minHeight: '100vh',
                    p: 3,
                  }}
                >
                  <Header />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/menu" element={<MenuList />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/settings" element={<SystemConfig />} />
                  </Routes>
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

