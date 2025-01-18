import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Food from "./pages/Food";
import Order from "./pages/Order";
import Customer from "./pages/Customer";
import Shipper from "./pages/Shipper";
import Voucher from "./pages/Voucher";
import Setting from "./pages/Setting";
import Calendar from "./pages/Calendar";
import Delivery from "./pages/Delivery";
import Report from "./pages/Report";
import Admin from "./pages/Admin";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import theme from "./styles/theme";
import authService from "./services/authService";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/signin"
            element={
              !authService.isAuthenticated() ? (
                <LogIn />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            }
          />
          <Route path="/auth/signup" element={<SignUp />} />

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="foods" element={<Food />} />
                    <Route path="orders" element={<Order />} />
                    <Route path="customers" element={<Customer />} />
                    <Route path="shippers" element={<Shipper />} />
                    <Route path="reports" element={<Report />} />
                    <Route path="vouchers" element={<Voucher />} />
                    <Route path="delivery" element={<Delivery />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="settings" element={<Setting />} />
                    <Route path="admins" element={<Admin />} />
                    <Route path="" element={<Navigate to="dashboard" />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
