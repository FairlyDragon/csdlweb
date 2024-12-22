import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

const menuItems = [
  { icon: DashboardIcon, label: 'Dashboard', path: '/' },
  { icon: ListAltIcon, label: 'Order List', path: '/orders' },
  { icon: PeopleIcon, label: 'Customer', path: '/customers' },
  { icon: InsightsIcon, label: 'Analytics', path: '/analytics' },
  { icon: StarBorderIcon, label: 'Reviews', path: '/reviews' },
  { icon: RestaurantIcon, label: 'Foods', path: '/foods' },
  { icon: CalendarTodayIcon, label: 'Calendar', path: '/calendar' },
  { icon: EmailIcon, label: 'Inbox', path: '/inbox' },
  { icon: AccountBalanceWalletIcon, label: 'Wallet', path: '/wallet' },
];

const SidebarContainer = styled(Box)({
  width: 280,
  height: '100vh',
  backgroundColor: '#fff',
  borderRight: '1px solid rgba(145, 158, 171, 0.12)',
  position: 'fixed',
  left: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  transition: 'width 0.3s ease-in-out',
  overflow: 'hidden',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
});

const MenuItem = styled(Link)(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 12px',
  margin: '4px 8px',
  borderRadius: '8px',
  textDecoration: 'none',
  color: active ? '#00A76F' : '#637381',
  backgroundColor: active ? 'rgba(0, 167, 111, 0.08)' : 'transparent',
  '&:hover': {
    backgroundColor: active ? 'rgba(0, 167, 111, 0.08)' : 'rgba(145, 158, 171, 0.08)',
  },
}));

export default function Sidebar(isCollapsed, setIsCollapsed) {
  const location = useLocation();

  return (
    <SidebarContainer sx={{ width: isCollapsed ? 64 : 280 }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
        {!isCollapsed && (
          <Typography
            variant="h5"
            sx={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#212B36',
            }}
          >
            Fairy
            <br />
            Dragon.
          </Typography>
        )}
        <IconButton 
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{ 
            ml: isCollapsed ? 'auto' : 0,
            mr: isCollapsed ? 'auto' : 0,
            color: '#637381'
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <MenuItem key={item.path} to={item.path} active={isActive ? 1 : 0}>
              <Icon sx={{ 
                fontSize: 22,
                minWidth: 22,
                mr: isCollapsed ? 0 : 2,
                color: isActive ? '#00A76F' : 'inherit'
              }} />
              {!isCollapsed && (
                <Typography sx={{ 
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500
                }}>
                  {item.label}
                </Typography>
              )}
            </MenuItem>
          );
        })}
      </Box>

      {!isCollapsed && (
        <Box sx={{ p: 2.5 }}>
          <Box
            sx={{
              p: 2.5,
              bgcolor: 'rgba(0, 167, 111, 0.08)',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <RestaurantIcon sx={{ color: '#00A76F', fontSize: 24 }} />
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                color: '#637381',
                mb: 2,
                lineHeight: 1.5,
              }}
            >
              Please, organize your
              <br />
              menus through button
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#00A76F',
                '&:hover': {
                  bgcolor: '#007867',
                },
                textTransform: 'none',
                borderRadius: 1,
                boxShadow: 'none',
                py: 1,
              }}
            >
              Add Menus
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: 12,
              color: '#637381',
              mb: 0.5
            }}>
              FairyDragon Restaurant Admin Dashboard
            </Typography>
            <Typography sx={{ 
              fontSize: 12,
              color: '#637381'
            }}>
              © 2024 All Rights Reserved
            </Typography>
            <Typography sx={{ 
              fontSize: 12,
              color: '#637381',
              mt: 0.5
            }}>
              Made by FairyDragon team
            </Typography>
          </Box>
        </Box>
      )}
    </SidebarContainer>
  );
}

