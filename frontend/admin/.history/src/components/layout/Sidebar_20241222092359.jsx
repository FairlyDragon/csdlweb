import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Collapse } from '@mui/material';
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

const SidebarContainer = styled(Box)((theme, collapsed }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: collapsed ? 64 : 250,
  backgroundColor: '#fff',
  transition: 'width 0.3s ease',
  borderRight: '1px solid rgba(0, 0, 0, 0.08)',
  zIndex: 1200,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const MenuToggle = styled(IconButton)({
  width: 28,
  height: 28,
  borderRadius: 6,
  backgroundColor: '#F4F6F8',
  '&:hover': {
    backgroundColor: '#E7E9EC'
  }
});

const MenuItem = styled(Link)((theme, isactive) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  textDecoration: 'none',
  color: isactive === 'true' ? '#00A76F' : '#637381',
  borderRadius: 6,
  transition: 'all 0.2s',
  margin: '2px 8px',
  fontSize: 13,
  '&:hover': {
    backgroundColor: isactive === 'true' ? 'rgba(0, 167, 111, 0.08)' : 'rgba(99, 115, 129, 0.08)',
  },
  ...(isactive === 'true' && {
    backgroundColor: 'rgba(0, 167, 111, 0.08)',
  })
}));

export default function Sidebar(isCollapsed, setIsCollapsed) {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    setShowMenu(!isCollapsed); // Show menu items when expanding
  };

  return (
    <SidebarContainer collapsed={isCollapsed ? 1 : 0}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Collapse in={!isCollapsed} orientation="horizontal">
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#212B36',
            }}
          >
            Fairy
            <br />
            Dragon.
          </Typography>
        </Collapse>
        <MenuToggle 
          onClick={toggleMenu}
          sx={{ ml: isCollapsed ? 'auto' : 0, mr: isCollapsed ? 'auto' : 0 }}
        >
          <MenuIcon fontSize="small" />
        </MenuToggle>
      </Box>

      <Box sx={{ flex: 1, mt: 0.5, overflow: 'hidden' }}>
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
                  fontSize: 20,
                  minWidth: 20,
                  mr: isCollapsed ? 0 : 1.5,
                  color: isActive ? '#00A76F' : 'inherit'
                }} 
              />
              <Collapse in={!isCollapsed} orientation="horizontal">
                <Typography sx={{ 
                  fontSize: 13, 
                  fontWeight: isActive ? 600 : 500,
                  whiteSpace: 'nowrap'
                }}>
                  {item.label}
                </Typography>
              </Collapse>
            </MenuItem>
          );
        })}
      </Box>

      <Collapse in={!isCollapsed} orientation="horizontal">
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(0, 167, 111, 0.08)',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <RestaurantIcon sx={{ color: '#00A76F', fontSize: 20 }} />
            </Box>
            <Typography
              sx={{
                fontSize: 13,
                color: '#637381',
                mb: 1.5,
                lineHeight: 1.4,
              }}
            >
              Please, organize your
              <br />
              menus through button
            </Typography>
            <Button
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
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
                py: 0.75,
                fontSize: 13,
              }}
            >
              Add Menus
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography sx={{ fontSize: 11, color: '#637381', mb: 0.5 }}>
              FairyDragon Restaurant Admin Dashboard
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#637381' }}>
              © 2024 All Rights Reserved
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#637381', mt: 0.5 }}>
              Made by FairyDragon team
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </SidebarContainer>
  );
}

