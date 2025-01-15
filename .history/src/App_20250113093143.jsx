import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Food from "./pages/Food";
import Order from "./pages/Order";
import Customer from "./pages/Customer";
import Shipper from "./pages/Shipper";
import Voucher from "./pages/Voucher";
import Setting from "./pages/Setting";
import Calendar from "./pages/Calendar";
import Delivery from "./pages/Delivery";
import Report from "./pages/Report";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
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
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
