import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F9FD' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: '280px', // Match sidebar width
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Prevent horizontal scroll
        }}
      >
        <Header />
        <Box 
          sx={{ 
            flex: 1,
            p: 3,
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

