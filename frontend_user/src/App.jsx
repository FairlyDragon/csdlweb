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
import DeliveredOrder from './pages/shipper/DeliveredOrder';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <OrderProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <CustomerLayout>
                  <Home />
                </CustomerLayout>
              } />
              <Route path="/auth/login" element={<LogIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/menu" element={
                <CustomerLayout>
                  <Menu />
                </CustomerLayout>
              } />

              {/* Customer routes */}
              <Route path="/cart" element={
                
                  <CustomerLayout>
                    <Cart />
                  </CustomerLayout>
               
              } />
              <Route path="/profile" element={
                
                  <CustomerLayout>
                    <Profile />
                  </CustomerLayout>
                
              } />
              <Route path="/orders" element={
              
                  <CustomerLayout>
                    <Orders />
                  </CustomerLayout>
               
              } />
              <Route path="/checkout" element={
                
                  <CustomerLayout>
                    <Checkout />
                  </CustomerLayout>
                
              } />
              <Route path="/change-password" element={
               
                  <CustomerLayout>
                    <ChangePassword />
                  </CustomerLayout>
               
              } />

              {/* Shipper routes */}
              <Route path="/shipper/*" element={
                <PrivateRoute roles={['shipper']}>
                  <ShipperLayout>
                    <Routes>
                      <Route path="/waiting" element={<WaitingOrders />} />
                      <Route path="/pickup" element={<PickupOrder />} />
                      <Route path="/delivered" element={<DeliveredOrder />} />
                    </Routes>
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