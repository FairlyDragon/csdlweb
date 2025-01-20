import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  styled
} from '@mui/material';
import {
  Dashboard,
  Receipt,
  Person,
  Analytics,
  Star,
  Restaurant,
  Calendar,
  Email,
  Wallet,
  Add
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;

const StyledSidebar = styled(Drawer)({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    border: 'none',
    backgroundColor: '#ffffff',
  },
});

const menuItems = [
  { title: 'Dashboard', icon: Dashboard, path: '/' },
  { title: 'Order List', icon: Receipt, path: '/orders' },
  { title: 'Customer', icon: Person, path: '/customers' },
  { title: 'Analytics', icon: Analytics, path: '/analytics' },
  { title: 'Reviews', icon: Star, path: '/reviews' },
  { title: 'Foods', icon: Restaurant, path: '/foods' },
  { title: 'Calendar', icon: Calendar, path: '/calendar' },
  { title: 'Inbox', icon: Email, path: '/inbox' },
  { title: 'Wallet', icon: Wallet, path: '/wallet' },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <StyledSidebar variant="permanent">
      <Box p={3}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Fairy
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          Dragon.
        </Typography>
      </Box>

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: location.pathname === item.path ? '#10B981' : '#64748B',
              backgroundColor: location.pathname === item.path ? '#F0FDF4' : 'transparent',
              '&:hover': {
                backgroundColor: '#F0FDF4',
                color: '#10B981',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText 
              primary={item.title}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box p={2} mt="auto">
        <Box
          sx={{
            p: 2,
            bgcolor: '#F0FDF4',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'white',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2,
            }}
          >
            <Restaurant sx={{ color: '#10B981' }} />
          </Box>
          <Typography fontSize="0.875rem" color="text.secondary" mb={2}>
            Please, organize your
            <br />
            menus through button
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            fullWidth
            sx={{
              bgcolor: '#10B981',
              '&:hover': { bgcolor: '#059669' },
            }}
          >
            Add Menus
          </Button>
        </Box>
      </Box>
    </StyledSidebar>
  );
}

