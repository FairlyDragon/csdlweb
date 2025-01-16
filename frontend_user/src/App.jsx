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
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/SignUp';

// Shipper pages
import WaitingOrders from './pages/shipper/WaitingOrders';
import PickupOrder from './pages/shipper/PickupOrder';
import DeliveringOrder from './pages/shipper/DeliveringOrder';
import DeliveredOrder from './pages/shipper/DeliveredOrder';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <OrderProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/auth/login" element={<LogIn />} />
              <Route path="/auth/signup" element={<SignUp />} />

              {/* Customer routes */}
              <Route path="/" element={
                <CustomerLayout>
                  <Home />
                </CustomerLayout>
              } />
              <Route path="/menu" element={
                <CustomerLayout>
                  <Menu />
                </CustomerLayout>
              } />
              <Route path="/cart" element={
                <PrivateRoute roles={['customer']}>
                  <CustomerLayout>
                    <Cart />
                  </CustomerLayout>
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute roles={['customer']}>
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
                <PrivateRoute roles={['customer']}>
                  <CustomerLayout>
                    <ChangePassword />
                  </CustomerLayout>
                </PrivateRoute>
              } />

              {/* Shipper routes */}
              <Route path="/shipper/waiting" element={
                <ShipperLayout>
                  <WaitingOrders />
                </ShipperLayout>
              } />
              <Route path="/shipper/pickup" element={
                <ShipperLayout>
                  <PickupOrder />
                </ShipperLayout>
              } />
              <Route path="/shipper/delivering" element={
                <ShipperLayout>
                  <DeliveringOrder />
                </ShipperLayout>
              } />
              <Route path="/shipper/delivered" element={
                <ShipperLayout>
                  <DeliveredOrder />
                </ShipperLayout>
              } />

             
            </Routes>
          </Router>
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;