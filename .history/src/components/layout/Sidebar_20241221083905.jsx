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

const SidebarLink = styled(Link)(({ isactive }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 24px',
  textDecoration: 'none',
  color: isactive === 'true' ? '#00A76F' : '#637381',
  borderRadius: '8px',
  margin: '4px 16px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: isactive === 'true' ? 'rgba(0, 167, 111, 0.08)' : '#F4F6F8',
  },
  backgroundColor: isactive === 'true' ? 'rgba(0, 167, 111, 0.08)' : 'transparent',
}));

export default function Sidebar(isCollapsed, setIsCollapsed) {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: isCollapsed ? '64px' : '280px',
        height: '100vh',
        bgcolor: '#fff',
        borderRight: '1px solid #F4F6F8',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease-in-out',
        overflow: 'hidden',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box 
        sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between'
        }}
      >
        {!isCollapsed && (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#212B36',
              lineHeight: 1.2,
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
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            color: '#637381',
            '&:hover': {
              bgcolor: '#F4F6F8',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <SidebarLink
              key={item.path}
              to={item.path}
              isactive={isActive.toString()}
            >
              <Icon 
                sx={{ 
                  fontSize: 22,
                  color: isActive ? '#00A76F' : '#637381',
                  mr: isCollapsed ? 0 : 2,
                }} 
              />
              {!isCollapsed && (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </SidebarLink>
          );
        })}
      </Box>

      {!isCollapsed && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              bgcolor: 'rgba(0, 167, 111, 0.08)',
              borderRadius: 2,
              p: 2,
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
        </Box>
      )}
    </Box>
  );
}