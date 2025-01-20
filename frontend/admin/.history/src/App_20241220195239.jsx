import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import OrderList from './components/orders/OrderList';
import MenuList from './components/menu/MenuList';
import UserList from './components/users/UserList';
import SystemConfig from './components/settings/SystemConfig';
import LoginForm from './components/auth/LoginForm';
// import ProtectedRoute from './components/ProtectedRoute'; // Make sure to import the ProtectedRoute component

/*************  ✨ Codeium Command 🌟  *************/
/**
 * Checks if the user is authenticated.
 * @returns {boolean} true if the user is authenticated, false otherwise.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
/**
 * Component that wraps a route and checks if the user is authenticated. If not,
 * redirects to the login page.
 * @param {{ children: React.ReactChild }} props
 * @returns {React.ReactElement} The protected route component.
 */
        <Route path="/login" element={<LoginForm />} />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Box sx={{ display: 'flex' }}>
                <CssBaseline />
/**
 * Main application component.
 * @returns {React.ReactElement} The main app component.
 */
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
/******  240c783f-7dbf-41a1-877f-dcdb74122064  *******/
