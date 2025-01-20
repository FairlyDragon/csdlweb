import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8F9FD', minHeight: '100vh' }}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Box
        component="main"
        sx={{
          width: `calc(100% - ${isCollapsed ? '64px' : '250px'})`,
          marginLeft: isCollapsed ? '64px' : '250px',
          transition: 'margin-left 0.3s ease, width 0.3s ease',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#F8F9FD',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box 
          sx={{ 
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            bgcolor: '#F8F9FD',
            borderBottom: '1px solid rgba(145, 158, 171, 0.12)',
          }}
        >
          <Header />
        </Box>
        <Box 
          sx={{ 
            p: 3,
            flex: 1,
            maxWidth: '1600px',
            mx: 'auto',
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

