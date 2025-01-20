import { Box, InputBase, Badge, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 480,
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color: '#919EAB',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2, 1.5, 5),
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    fontSize: 14,
    width: '100%',
    '&::placeholder': {
      color: '#919EAB',
    },
  },
}));

const IconButton = styled(Box)(() theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#637381',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#F4F6F8',
  },
}));

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 3,
        backgroundColor: '#fff',
        borderBottom: '1px solid #F4F6F8',
      }}
    >
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search in here"
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchWrapper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton>
          <Badge badgeContent={2} color="primary">
            <EmailOutlinedIcon />
          </Badge>
        </IconButton>
        
        <IconButton>
          <Badge badgeContent={3} color="primary">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
        
        <IconButton>
          <Badge badgeContent={5} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Box sx={{ mr: 2, textAlign: 'right' }}>
            <Box sx={{ fontSize: 14, fontWeight: 600, color: '#212B36' }}>
              Hello, Admin
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#919EAB',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            A
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}

