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
  paddingLeft: 28,
  position: 'relative',
  '& .MuiInputBase-input': {
    fontSize: 16,
    fontFamily: 'Barlow',
    fontWeight: 400,
    color: '#969BA0',
    '&::placeholder': {
      color: '#969BA0',
      opacity: 1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 15,
    width: 2,
    height: 26,
    background: '#2D9CDB',
  },
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  right: 28,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: color.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    '& img': {
      width: 20,
      height: 20,
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
      fontFamily: 'Barlow',
      fontWeight: 400,
      minWidth: 16,
      height: 16,
      borderRadius: 48,
      border: '2px solid #F3F2F7',
      padding: '0 2px',
      transform: 'translate(30%, -30%)',
    },
  };
});

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 0,
        height: 48,
        mx: 3,
      }}
    >
      <SearchWrapper>
        <SearchInput
          placeholder="Search here"
          inputProps={{ 'aria-label': 'search' }}
        />
        <SearchIconWrapper>
          <img src={SearchIcon} alt="search" style={{ width: 24, height: 24 }} />
        </SearchIconWrapper>
      </SearchWrapper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, height: '100%' }}>
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
            <img src={GiftIcon} alt="gift" style={{ width: 26, height: 26 }} />
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
          borderLeft: '1px solid #D0D6DE',
        }}
      >
        <Box sx={{ 
          color: '#464255',
          fontSize: 14,
          fontFamily: 'Barlow',
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
            bgcolor: '#D8D8D8',
            fontSize: 14,
          }}
        >
          A
        </Avatar>
      </Box>
    </Box>
  );
}

