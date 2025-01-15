import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import CustomerLayout from './layouts/CustomerLayout';
import ShipperLayout from './layouts/ShipperLayout';
import PrivateRoute from './components/PrivateRoute';
import theme from './styles/theme';

// Customer pages
import Home from './pages/Home';
import Menu from './pages/customer/Menu';
import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';
import ChangePassword from './pages/customer/ChangePassword';

// Auth pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// Shipper pages
import Dashboard from './pages/shipper/Dashboard';  // Sửa tên import
import DeliveryOrders from './pages/shipper/DeliveryOrders';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <OrderProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />

              {/* Customer routes */}
              <Route path="/" element={
                <CustomerLayout>
                  <Home />
                </CustomerLayout>
              } />
              <Route path="/menu" element={
                <PrivateRoute roles={['customer']}>
                  <CustomerLayout>
                    <Menu />
                  </CustomerLayout>
                </PrivateRoute>
              } />
              <Route path="/cart" element={
                <PrivateRoute roles={['customer']}>
                  <CustomerLayout>
                    <Cart />
                  </CustomerLayout>
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <CustomerLayout>
                    <Profile />
                  </CustomerLayout>
                </PrivateRoute>
              } />
              <Route path="/checkout" element={
                <PrivateRoute roles={['customer']}>
                  <CustomerLayout>
                    <Checkout />
                  </CustomerLayout>
                </PrivateRoute>
              } />
              <Route path="/orders" element={
                <PrivateRoute roles={['customer']}>
                  <CustomerLayout>
                    <Orders />
                  </CustomerLayout>
                </PrivateRoute>
              } />
              <Route path="/change-password" element={
                <PrivateRoute>
                  <CustomerLayout>
                    <ChangePassword />
                  </CustomerLayout>
                </PrivateRoute>
              } />

                {/* Shipper routes */}
                <Route path="/shipper" element={
                <PrivateRoute roles={['shipper']}>
                  <ShipperLayout>
                    <Dashboard />  {/* Sử dụng đúng tên component */}
                  </ShipperLayout>
                </PrivateRoute>
              } />
              <Route path="/shipper/orders" element={
                <PrivateRoute roles={['shipper']}>
                  <ShipperLayout>
                    <DeliveryOrders />
                  </ShipperLayout>
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;