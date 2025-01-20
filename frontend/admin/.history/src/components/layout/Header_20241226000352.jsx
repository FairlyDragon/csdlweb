import { Box, InputBase, Badge, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const SearchWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: 480,
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  left: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  color: '#637381',
  display: 'flex',
});

const StyledInputBase = styled(InputBase)({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '10px 16px 10px 44px',
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    fontSize: 14,
    width: '100%',
    '&::placeholder': {
      color: '#919EAB',
      opacity: 1,
    },
    '&:focus': {
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 0px 0px 1px #919EAB',
    },
  },
});

const StyledBadge = styled(Badge)(({ color = 'primary' }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: color === 'error' ? '#F04438' : '#2E90FA',
    color: '#fff',
    minWidth: 18,
    height: 18,
    padding: '0 4px',
    fontSize: 12,
    top: 4,
    right: 4,
  },
}));

const IconContainer = styled(IconButton)({
  width: 40,
  height: 40,
  borderRadius: 8,
  color: '#637381',
  '&:hover': {
    backgroundColor: '#F4F6F8',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        px: 3,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F2F4F7',
      }}
    >
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: 20 }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search in here"
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchWrapper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconContainer>
            <StyledBadge badgeContent={2}>
              <EmailOutlinedIcon />
            </StyledBadge>
          </IconContainer>
          
          <IconContainer>
            <StyledBadge badgeContent={3}>
              <NotificationsNoneIcon />
            </StyledBadge>
          </IconContainer>
          
          <IconContainer>
            <StyledBadge badgeContent={5} color="error">
              <ShoppingCartOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer>
            <SettingsOutlinedIcon />
          </IconContainer>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            pl: 2,
            borderLeft: '1px solid #F2F4F7'
          }}
        >
          <Box sx={{ textAlign: 'right' }}>
            <Box 
              sx={{ 
                fontSize: 14,
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              Hello, <span style={{ fontWeight: 500 }}>Admin</span>
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#F4F6F8',
              color: '#637381',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            A
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}

