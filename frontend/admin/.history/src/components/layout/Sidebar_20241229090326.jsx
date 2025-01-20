import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
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
import MenuIcon from '@mui/icons-material/Menu';
import SidebarAddMenus from './SidebarAddMenus';
import SidebarFooter from './SidebarFooter';

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

const SidebarContainer = styled(Box)(({ theme, $collapsed }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: $collapsed ? 48 : 220,
  backgroundColor: '#fff',
  transition: 'width 0.3s ease',
  borderRight: '1px solid rgba(0, 0, 0, 0.08)',
  zIndex: 1200,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const MenuToggle = styled(IconButton)({
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: '#00A76F',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#007867'
  }
});

const StyledLink = styled(Link)(({ theme, $isactive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '8px',
  textDecoration: 'none',
  color: $isactive ? '#00A76F' : '#637381',
  borderRadius: 8,
  transition: 'all 0.2s',
  margin: '2px 8px',
  fontSize: 13,
  '&:hover': {
    backgroundColor: $isactive ? 'rgba(0, 167, 111, 0.08)' : 'rgba(99, 115, 129, 0.08)',
  },
  ...($isactive && {
    backgroundColor: 'rgba(0, 167, 111, 0.08)',
  })
}));

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContainer $collapsed={isCollapsed}>
      <Box 
        sx={{ 
          p: 1.5, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
        }}
      >
        {!isCollapsed && (
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 18,
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
        <MenuToggle onClick={toggleMenu}>
          <MenuIcon sx={{ fontSize: 20 }} />
        </MenuToggle>
      </Box>

      <Box sx={{ flex: 1, mt: 0.5, overflow: 'hidden' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <StyledLink
              key={item.path}
              to={item.path}
              $isactive={isActive ? 1 : 0}
              sx={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              }}
            >
              <Icon 
                sx={{ 
                  fontSize: 20,
                  color: isActive ? '#00A76F' : 'inherit',
                  ...(isCollapsed ? {
                    margin: 0
                  } : {
                    mr: 2
                  })
                }} 
              />
              {!isCollapsed && (
                <Typography sx={{ 
                  fontSize: 13, 
                  fontWeight: isActive ? 600 : 500,
                  whiteSpace: 'nowrap'
                }}>
                  {item.label}
                </Typography>
              )}
            </StyledLink>
          );
        })}
      </Box>

      {!isCollapsed && (
        <Box sx={{ px: 2, pb: 2, width: '100%' }}>
          <SidebarAddMenus />
          <SidebarFooter />
        </Box>
      )}
    </SidebarContainer>
  );
}

