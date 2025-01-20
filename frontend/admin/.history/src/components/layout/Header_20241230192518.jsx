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
  maxWidth: 866,
  height: 56,
  background: '#FDFDFD',
  borderRadius: 8,
  border: '1px solid #EBEBEB',
});

const SearchInput = styled(InputBase)({
  width: '100%',
  height: '100%',
  paddingLeft: 28,
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
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const IconContainer = styled(Box)(({ $variant }) => {
  const colors = {
    notification: {
      bg: 'rgba(45, 156, 219, 0.15)',
      color: '#2D9CDB',
    },
    message: {
      bg: 'rgba(45, 156, 219, 0.15)',
      color: '#2D9CDB',
    },
    gift: {
      bg: 'rgba(94, 108, 147, 0.15)',
      color: '#5E6C93',
    },
    settings: {
      bg: 'rgba(255, 91, 91, 0.15)',
      color: '#FF5B5B',
    },
  };

  const color = colors[$variant] || colors.notification;

  return {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: color.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
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
      fontSize: 12,
      fontFamily: 'Barlow',
      fontWeight: 400,
      minWidth: 19,
      height: 19,
      borderRadius: 48,
      border: '3px solid #F3F2F7',
      padding: '0 3px',
    },
  };
});

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        py: 1.5,
        px: 3,
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

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
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
          gap: 2,
          pl: 3,
          borderLeft: '1px solid #D0D6DE',
          height: 56,
        }}
      >
        <Box sx={{ 
          color: '#464255',
          fontSize: 16,
          fontFamily: 'Barlow',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}>
          <span style={{ fontWeight: 400 }}>Hello,</span>
          <span style={{ fontWeight: 600 }}>Adm1n</span>
        </Box>
        
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: '#D8D8D8',
          }}
        >
          A
        </Avatar>
      </Box>
    </Box>
  );
}

