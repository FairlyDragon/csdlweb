import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F9FD' }}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isCollapsed ? '64px' : '240px', // Adjust based on collapsed state
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header />
        <Box 
          sx={{ 
            flex: 1,
            p: 3,
            maxWidth: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

