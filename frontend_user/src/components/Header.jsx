import { AppBar, Toolbar, Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Thay thế bằng MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'grey.200'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        {/* Logo */}
        <Typography 
          variant="h5" 
          component="h1"
          sx={{ 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          FairyDragon
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Button 
            color="inherit"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button 
            color="inherit"
            onClick={() => navigate('/menu')}
          >
            Menu
          </Button>
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          
          <IconButton onClick={() => navigate('/cart')}>
            <ShoppingCartIcon />
          </IconButton>
          <Button
  onClick={() => navigate('/auth/signin')}
  sx={{
    color: 'black',
    backgroundColor: 'white',
    border: '2px solid #ddd',
    mr: 2,
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;