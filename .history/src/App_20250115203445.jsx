import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import PrivateRoute from './components/PrivateRoute';
import theme from './styles/theme';

// Layout
import Layout from "./components/layout/Layout";

// Pages
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
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="foods" element={<Food />} />
            <Route path="orders" element={<Order />} />
            <Route path="customers" element={<Customer />} />
            <Route path="shippers" element={<Shipper />} />
            <Route path="vouchers" element={<Voucher />} />
            <Route path="settings" element={<Setting />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="reports" element={<Report />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
