import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Food from "./pages/Food";
import Order from "./pages/Order";
import OrderDetails from "./components/orders/OrderDetails";
import Customer from "./pages/Customer";
import EditCustomer from "./components/customer/EditCustomer";
import Shipper from "./pages/Shipper";
import Voucher from "./pages/Voucher";
import Setting from "./pages/Setting";
import Calendar from "./pages/Calendar";
import Delivery from "./pages/Delivery";
import Report from "./pages/Report";
import Admin from "./pages/Admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="foods" element={<Food />} />
          <Route path="orders" element={<Order />} />
          <Route path="/orders/:order_id" element={<OrderDetails />} />
          <Route path="customers" element={<Customer />} />
          <Route path="customers/:id" element={<EditCustomer />} />
          <Route path="shippers" element={<Shipper />} />
          <Route path="vouchers" element={<Voucher />} />
          <Route path="settings" element={<Setting />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="reports" element={<Report />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
