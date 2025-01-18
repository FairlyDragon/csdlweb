import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Food from "./pages/Food";
import Order from "./pages/Order";
import OrderDetails from "./components/orders/OrderDetails";
import Customer from "./pages/Customer";
import EditCustomer from "./components/customer/EditCustomer";
import Shipper from "./pages/Shipper";
import EditShipper from "./components/shipper/EditShipper";
import Voucher from "./pages/Voucher";
import Setting from "./pages/Setting";
import Calendar from "./pages/Calendar";
import Delivery from "./pages/Delivery";
import Report from "./pages/Report";
import Admin from "./pages/Admin";
import LogIn from "./pages/auth/SIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="foods" element={<Food />} />
            <Route path="orders" element={<Order />} />
            <Route path="orders/:order_id" element={<OrderDetails />} />
            <Route path="customers" element={<Customer />} />
            <Route path="customers/:id" element={<EditCustomer />} />
            <Route path="shippers" element={<Shipper />} />
            <Route path="shippers/:id" element={<EditShipper />} />
            <Route path="vouchers" element={<Voucher />} />
            <Route path="settings" element={<Setting />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="reports" element={<Report />} />
            <Route path="admins" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
