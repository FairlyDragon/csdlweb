import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Button, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const navigate = useNavigate();

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
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography 
            sx={{ 
              cursor: 'pointer',
              color: 'gray'
            }}
            onClick={() => navigate('/')}
          >
            home
          </Typography>
          <Typography 
            sx={{ 
              cursor: 'pointer',
              textDecoration: 'underline'
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
          
          <IconButton onClick={() => navigate('/cart')}>
            <ShoppingCartIcon />
          </IconButton>

          {/* Sign In/Sign Up buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => navigate('/auth/signin')}
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
              Sign In
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
              Sign Up
            </Button>
          </Box>

          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;