import { Box, InputBase, Badge, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const SearchWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: 480,
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  left: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  color: '#919EAB',
});

const StyledInputBase = styled(InputBase)({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '9px 12px 9px 36px',
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    fontSize: 14,
    width: '100%',
    height: '20px',
    '&::placeholder': {
      color: '#919EAB',
      opacity: 1,
    },
  },
});

const StyledBadge = styled(Badge)(({ color = '#2065D1' }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: color,
    color: '#fff',
    minWidth: 16,
    height: 16,
    padding: '0 4px',
    fontSize: 10,
    top: 4,
    right: 4,
  },
}));

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        px: 3,
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(145, 158, 171, 0.16)',
      }}
    >
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: 18 }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search in here"
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchWrapper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton 
          sx={{ 
            color: '#637381',
            '&:hover': { backgroundColor: '#F4F6F8' }
          }}
        >
          <StyledBadge badgeContent={2}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
          </StyledBadge>
        </IconButton>

        <IconButton 
          sx={{ 
            color: '#637381',
            '&:hover': { backgroundColor: '#F4F6F8' }
          }}
        >
          <StyledBadge badgeContent={3}>
            <NotificationsNoneIcon sx={{ fontSize: 20 }} />
          </StyledBadge>
        </IconButton>

        <IconButton 
          sx={{ 
            color: '#637381',
            '&:hover': { backgroundColor: '#F4F6F8' }
          }}
        >
          <StyledBadge badgeContent={5} color="#FF4842">
            <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
          </StyledBadge>
        </IconButton>

        <IconButton 
          sx={{ 
            color: '#637381',
            '&:hover': { backgroundColor: '#F4F6F8' }
          }}
        >
          <SettingsIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <Box sx={{ mr: 1 }}>
            <Box sx={{ 
              fontSize: 13, 
              fontWeight: 600, 
              color: '#212B36',
              textAlign: 'right'
            }}>
              Hello, Admin
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#919EAB',
              fontSize: 14,
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
