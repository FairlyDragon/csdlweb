import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';  
import PrivateRoute from './components/PrivateRoute';
import theme from './styles/theme';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders'; 


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>  {/* Wrap toàn bộ Router trong CartProvider */}
        <OrderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={
              <PrivateRoute>
              <Cart />
            </PrivateRoute>
            } />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={
              <PrivateRoute>
                <Orders />
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