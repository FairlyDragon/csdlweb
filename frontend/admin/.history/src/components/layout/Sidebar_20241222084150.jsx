import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import GridViewIcon from '@mui/icons-material/GridView';
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
  { icon: GridViewIcon, label: 'Dashboard', path: '/' },
  { icon: ListAltIcon, label: 'Order List', path: '/orders' },
  { icon: PeopleIcon, label: 'Customer', path: '/customers' },
  { icon: InsightsIcon, label: 'Analytics', path: '/analytics' },
  { icon: StarBorderIcon, label: 'Reviews', path: '/reviews' },
  { icon: RestaurantIcon, label: 'Foods', path: '/foods' },
  { icon: CalendarTodayIcon, label: 'Calendar', path: '/calendar' },
  { icon: EmailIcon, label: 'Inbox', path: '/inbox' },
  { icon: AccountBalanceWalletIcon, label: 'Wallet', path: '/wallet' },
];

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  transition: 'width 0.3s ease',
  borderRight: '1px solid rgba(0, 0, 0, 0.08)',
  zIndex: 1200,
  overflow: 'hidden'
}));

const MenuButton = styled(IconButton)({
  width: 40,
  height: 40,
  borderRadius: 8,
  color: '#637381',
  '&:hover': {
    backgroundColor: 'rgba(99, 115, 129, 0.08)'
  }
});

const MenuItem = styled(Link)(({ isactive }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  textDecoration: 'none',
  color: isactive === 'true' ? '#00A76F' : '#637381',
  borderRadius: 8,
  transition: 'all 0.2s',
  margin: '2px 12px',
  '&:hover': {
    backgroundColor: isactive === 'true' ? 'rgba(0, 167, 111, 0.08)' : 'rgba(99, 115, 129, 0.08)',
  },
  ...(isactive === 'true' && {
    backgroundColor: 'rgba(0, 167, 111, 0.08)',
  })
}));

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  return (
    <SidebarContainer sx={{ width: isCollapsed ? 72 : 280 }}>
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
        <MenuButton 
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{ ml: isCollapsed ? 'auto' : 0, mr: isCollapsed ? 'auto' : 0 }}
        >
          <MenuIcon />
        </MenuButton>
      </Box>

      <Box sx={{ flex: 1, mt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <MenuItem
              key={item.path}
              to={item.path}
              isactive={isActive.toString()}
            >
              <Icon 
                sx={{ 
                  fontSize: 24,
                  minWidth: 24,
                  mr: isCollapsed ? 0 : 2,
                  color: isActive ? '#00A76F' : 'inherit'
                }} 
              />
              {!isCollapsed && (
                <Typography sx={{ fontSize: 14, fontWeight: isActive ? 600 : 500 }}>
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
            <Typography sx={{ fontSize: 12, color: '#637381', mb: 0.5 }}>
              FairyDragon Restaurant Admin Dashboard
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#637381' }}>
              © 2024 All Rights Reserved
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#637381', mt: 0.5 }}>
              Made by FairyDragon team
            </Typography>
          </Box>
        </Box>
      )}
    </SidebarContainer>
  );
}

