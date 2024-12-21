import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8F9FD', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isCollapsed ? '64px' : '280px',
          transition: 'margin-left 0.3s ease-in-out',
          p: 3,
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
}