import { useLocation } from 'react-router-dom';
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
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import authService from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const location = useLocation();
  const isMenuActive = location.pathname === '/menu';
  const isCartActive = location.pathname === '/cart' || location.pathname === '/checkout';

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    const handleStorageChange = () => {
      const updatedUserStr = localStorage.getItem('user');
      if (updatedUserStr) {
        setUser(JSON.parse(updatedUserStr));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleCartClick = () => {
    if (!user) {
      navigate('/auth/login');
    } else {
      navigate('/cart');
    }
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleMenuClose();
    navigate('/');
    window.location.reload();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: '1px solid #eee'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            cursor: 'pointer' 
          }}
          onClick={() => navigate('/')}
        >
          FairyDragon
          <span style={{ color: '#dd1d1d' }}>.</span>
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography 
            sx={{ 
              cursor: 'pointer',
              color: '#000',
              textDecoration: 'none'
            }}
            onClick={() => navigate('/')}
          >
            home
          </Typography>
          <Typography 
            sx={{ 
              cursor: 'pointer',
              color: '#000',
              textDecoration: isMenuActive ? 'underline' : 'none',
              textUnderlineOffset: '5px'
            }}
            onClick={() => navigate('/menu')}
          >
            menu
          </Typography>
        </Box>

        {/* Right section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          
          <IconButton 
            onClick={handleCartClick}
            sx={{
              color: isCartActive ? '#dd1d1d' : 'inherit',
              borderBottom: isCartActive ? '2px solid #dd1d1d' : 'none',
              borderRadius: isCartActive ? '0' : '50%',
              pb: isCartActive ? '4px' : '0'
            }}
          >
            <ShoppingCartIcon />
          </IconButton>

          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: '#dd1d1d'
                  }}
                >
                  {user.email?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography>
                  Hello {user.email?.split('@')[0]}
                </Typography>
              </Box>

              <IconButton onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    width: 200,
                  }
                }}
              >
                <MenuItem onClick={() => {
                  handleMenuClose();
                  navigate('/orders');
                }}>
                  <ListItemIcon>
                    <ShoppingBagIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">Orders</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Check your order history
                    </Typography>
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                  handleMenuClose();
                  navigate('/profile');
                }}>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">Profile</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Edit your information
                    </Typography>
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                  handleMenuClose();
                  navigate('/change-password');
                }}>
                  <ListItemIcon>
                    <KeyIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">Change password</Typography>
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: '#dd1d1d' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">Log Out</Typography>
                  </ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => navigate('/auth/login')}
                sx={{
                  color: 'black',
                  backgroundColor: 'white',
                  border: '2px solid #ddd',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    border: '2px solid #ddd',
                  }
                }}
                variant="outlined"
              >
                LOG IN
              </Button>
              <Button
                onClick={() => navigate('/auth/signup')}
                sx={{
                  backgroundColor: '#dd1d1d',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#bb1818',
                  }
                }}
                variant="contained"
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