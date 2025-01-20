import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-02-01'
  });

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8F9FD', minHeight: '100vh' }}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isCollapsed ? '64px' : '280px',
          transition: 'margin-left 0.3s ease-in-out',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#F8F9FD',
          position: 'relative',
        }}
      >
        <Box 
          sx={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 1100, 
            bgcolor: '#F8F9FD', 
          }}
        >
          <Header dateRange={dateRange} setDateRange={setDateRange} />
        </Box>
        <Box 
          sx={{ 
            p: 3, 
            flex: 1,
            overflowY: 'auto', 
          }}
        >
          <Outlet context={{ dateRange }} />
        </Box>
      </Box>
    </Box>
  );
}

