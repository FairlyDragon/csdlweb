import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MenuList from './components/menu/MenuList';
import OrderList from './components/order/OrderList';
import UserList from './components/users/UserList';
import SystemConfig from './components/system/SystemConfig';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<MenuList />} />
          <Route path="customers" element={<OrderList />} />
          <Route path="analytics" element={<UserList />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="foods" element={<Foods />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

