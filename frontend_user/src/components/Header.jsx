import { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tạm thời dùng state, sau này sẽ dùng context hoặc redux

  // Kiểm tra xem có đang ở trang menu không
  const isMenuPage = location.pathname === '/menu';

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.200'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* Logo */}
        <Typography 
          variant="h5" 
          component="h1"
          sx={{ 
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          onClick={() => navigate('/')}
        >
          FairyDragon<span style={{ color: '#FFA500' }}>.</span>
        </Typography>

        {/* Navigation */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mx: 4,
          '& .MuiButton-root': {
            color: 'text.primary',
            minWidth: 'unset',
            px: 2
          }
        }}>
          <Button 
            onClick={() => navigate('/')}
            sx={{
              borderBottom: !isMenuPage ? '2px solid #000' : 'none',
              borderRadius: 0
            }}
          >
            home
          </Button>
          <Button 
            onClick={() => navigate('/menu')}
            sx={{
              borderBottom: isMenuPage ? '2px solid #000' : 'none',
              borderRadius: 0
            }}
          >
            menu
          </Button>
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>

          {isMenuPage ? (
            // Hiển thị Hello User khi ở trang menu
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              ml: 1,
              color: 'text.secondary'
            }}>
              <Typography variant="body2">
                Hello
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonOutlineIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  User1
                </Typography>
              </Box>
            </Box>
          ) : (
            // Hiển thị nút Sign In/Sign Up khi không ở trang menu
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
          )}

          <IconButton sx={{ ml: 1 }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;