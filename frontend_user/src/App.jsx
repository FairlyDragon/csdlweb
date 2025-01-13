import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;