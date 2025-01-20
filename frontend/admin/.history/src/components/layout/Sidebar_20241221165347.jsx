import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
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
  width: '280px',
  height: '100vh',
  backgroundColor: '#FFF',
  borderRight: '1px solid #F4F6F8',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  padding: '1'
});

const MenuItem = styled(Link)(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 24px',
  color: active ? '#00A76F' : '#637381',
  textDecoration: 'none',
  borderRadius: 8,
  margin: '4px 16px',
  transition: 'all 0.2s',
  backgroundColor: active ? '#00A76F14' : 'transparent',
  '&:hover': {
    backgroundColor: active ? '#00A76F14' : '#F4F6F8',
  },
  '& .icon': {
    marginRight: 16,
    fontSize: 24,
  },
  '& .label': {
    fontSize: 14,
    fontWeight: active ? 600 : 500,
  },
}));

export default function Sidebar() {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Box sx={{ p: 3 }}>
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
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            <item.icon className="icon" />
            <span className="label">{item.label}</span>
          </MenuItem>
        ))}
      </Box>

      <Box sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            backgroundColor: '#00A76F14',
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
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
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
              backgroundColor: '#00A76F',
              '&:hover': {
                backgroundColor: '#007867',
              },
              textTransform: 'none',
              borderRadius: 1,
            }}
          >
            Add Menus
          </Button>
        </Box>
      </Box>
    </SidebarContainer>
  );
}