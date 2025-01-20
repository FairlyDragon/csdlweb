import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import Customer from './pages/Customer';
import Analytics from './pages/Analytics';
import Reviews from './pages/Reviews';
import Foods from './pages/Foods';
import Calendar from './pages/Calendar';
import Inbox from './pages/Inbox';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import MenuList from './components/menu/MenuList';
import OrderList from './components/order/OrderList';
import UserList from './components/users/UserList';
import Settings from './pages/Settings';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<MenuList />} />
          <Route path="customers" element={<Customer />} />
          <Route path="analytics" element={<Analytics />} />
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

