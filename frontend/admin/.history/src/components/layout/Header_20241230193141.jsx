import { Box, InputBase, Badge, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationIcon from '../../assets/header/notification.svg';
import MessageIcon from '../../assets/header/message.svg';
import GiftIcon from '../../assets/header/gift.svg';
import SettingsIcon from '../../assets/header/settings.svg';
import SearchIcon from '../../assets/header/search.svg';

const SearchWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: 480,
  height: 40,
  background: '#FDFDFD',
  borderRadius: 8,
  border: '1px solid #EBEBEB',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 24,
});

const SearchInput = styled(InputBase)({
  width: '100%',
  height: '100%',
  paddingLeft: 16,
  position: 'relative',
  '& .MuiInputBase-input': {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 400,
    color: '#969BA0',
    paddingRight: 40,
    '&::placeholder': {
      color: '#969BA0',
      opacity: 1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 2,
    height: 20,
    background: '#2D9CDB',
  },
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  right: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: 20,
  height: 20,
});

const IconContainer = styled(Box)(({ $variant }) => {
  const colors = {
    notification: {
      bg: 'rgba(45, 156, 219, 0.08)',
      color: '#2D9CDB',
    },
    message: {
      bg: 'rgba(45, 156, 219, 0.08)',
      color: '#2D9CDB',
    },
    gift: {
      bg: 'rgba(94, 108, 147, 0.08)',
      color: '#5E6C93',
    },
    settings: {
      bg: 'rgba(255, 91, 91, 0.08)',
      color: '#FF5B5B',
    },
  };

  const color = colors[$variant] || colors.notification;

  return {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: color.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    '& img': {
      width: 18,
      height: 18,
    },
  };
});

const NotificationBadge = styled(Badge)(({ $variant }) => {
  const colors = {
    notification: '#2D9CDB',
    message: '#2D9CDB',
    gift: '#5E6C93',
    settings: '#FF5B5B',
  };

  return {
    '& .MuiBadge-badge': {
      backgroundColor: colors[$variant] || colors.notification,
      color: 'white',
      fontSize: 10,
      fontFamily: 'Inter',
      fontWeight: 500,
      minWidth: 14,
      height: 14,
      borderRadius: '50%',
      border: '2px solid #FFFFFF',
      padding: '0 2px',
      transform: 'translate(40%, -40%)',
    },
  };
});

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: 0,
        height: 48,
        mx: 3,
        backgroundColor: '#FFFFFF',
      }}
    >
      <SearchWrapper>
        <SearchInput
          placeholder="Search here"
          inputProps={{ 'aria-label': 'search' }}
        />
        <SearchIconWrapper>
          <img src={SearchIcon} alt="search" style={{ width: 16, height: 16 }} />
        </SearchIconWrapper>
      </SearchWrapper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <IconContainer $variant="notification">
          <NotificationBadge badgeContent={21} $variant="notification">
            <img src={NotificationIcon} alt="notifications" />
          </NotificationBadge>
        </IconContainer>
        
        <IconContainer $variant="message">
          <NotificationBadge badgeContent={53} $variant="message">
            <img src={MessageIcon} alt="messages" />
          </NotificationBadge>
        </IconContainer>
        
        <IconContainer $variant="gift">
          <NotificationBadge badgeContent={15} $variant="gift">
            <img src={GiftIcon} alt="gift" />
          </NotificationBadge>
        </IconContainer>

        <IconContainer $variant="settings">
          <NotificationBadge badgeContent={19} $variant="settings">
            <img src={SettingsIcon} alt="settings" />
          </NotificationBadge>
        </IconContainer>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          pl: 2,
          ml: 2,
          height: '100%',
          borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box sx={{ 
          color: '#111827',
          fontSize: 14,
          fontFamily: 'Inter',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}>
          <span style={{ fontWeight: 400 }}>Hello,</span>
          <span style={{ fontWeight: 600 }}>Admin</span>
        </Box>
        
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#E7E7E7',
            color: '#212B36',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          A
        </Avatar>
      </Box>
    </Box>
  );
}

