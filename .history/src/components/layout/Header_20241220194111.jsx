import { 
    AppBar,
    Toolbar,
    InputBase,
    IconButton,
    Badge,
    Avatar,
    Box,
    Typography,
    styled,
  } from '@mui/material';
  import {
    Search,
    Message,
    Notifications,
    ShoppingCart,
  } from '@mui/icons-material';
  
  const StyledAppBar = styled(AppBar)({
    backgroundColor: '#ffffff',
    color: '#1F2937',
    boxShadow: 'none',
    borderBottom: '1px solid #E5E7EB',
  });
  
  const SearchWrapper = styled('div')({
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: 16,
    marginLeft: 0,
    width: '100%',
    maxWidth: 400,
  });
  
  const SearchIconWrapper = styled('div')({
    padding: '0 16px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
  
  const StyledInputBase = styled(InputBase)({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: '8px 8px 8px 48px',
    },
  });
  
  export default function Header() {
    return (
      <StyledAppBar position="fixed" sx={{ ml: '280px', width: 'calc(100% - 280px)' }}>
        <Toolbar>
          <SearchWrapper>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search in here"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchWrapper>
  
          <Box sx={{ flexGrow: 1 }} />
  
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={2} color="primary">
                <Message />
              </Badge>
            </IconButton>
            
            <IconButton size="large" color="inherit">
              <Badge badgeContent={3} color="primary">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton size="large" color="inherit">
              <Badge badgeContent={5} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
  
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Box sx={{ mr: 2, textAlign: 'right' }}>
                <Typography variant="body2" fontWeight="medium">
                  Hello, Admin
                </Typography>
              </Box>
              <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
    );
  }
  
  