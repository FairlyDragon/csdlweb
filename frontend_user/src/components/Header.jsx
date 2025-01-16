import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Typography, 
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from '../contexts/CartContext';
import authService from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCartClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/auth/login');
    } else {
      navigate('/cart');
    }
  };

  const handleNavigate = (path) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/auth/login');
    } else {
      navigate(path);
      handleMenuClose();
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleMenuClose();
    navigate('/auth/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1,
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          FAIRY DRAGON
          <span style={{ color: '#dd1d1d' }}>.</span>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ color: 'black' }}
          >
            HOME
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/menu')}
            sx={{ color: 'black' }}
          >
            MENU
          </Button>
          
          <IconButton 
            color="inherit"
            onClick={handleCartClick}
          >
            <Badge badgeContent={user ? cartItems.length : 0} color="error">
              <ShoppingCartIcon sx={{ color: 'black' }} />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <IconButton onClick={handleMenuClick}>
                <Avatar sx={{ bgcolor: '#dd1d1d' }}>
                  {user.email?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1 }
                }}
              >
                <MenuItem onClick={() => handleNavigate('/orders')}>
                  <ListItemIcon>
                    <ShoppingBagIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>Orders</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/profile')}>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/change-password')}>
                  <ListItemIcon>
                    <KeyIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>Change Password</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => navigate('/auth/login')}
                variant="outlined"
                sx={{
                  color: 'black',
                  borderColor: '#ddd'
                }}
              >
                LOG IN
              </Button>
              <Button
                onClick={() => navigate('/auth/signup')}
                variant="contained"
                sx={{
                  bgcolor: '#dd1d1d',
                  '&:hover': {
                    bgcolor: '#bb1818'
                  }
                }}
              >
                SIGN UP
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;