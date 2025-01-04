import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Food from './pages/Food';
import Order from './pages/Order';
import Customer from './pages/Customer';
import Shipper from './pages/Shipper';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='foods' element={<Food />} />
          <Route path='orders' element={<Order />} />
          <Route path='customers' element={<Customer />} />
          <Route path='shippers' element={<Shipper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

