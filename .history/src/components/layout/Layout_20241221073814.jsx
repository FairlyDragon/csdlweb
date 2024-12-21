import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8F9FD', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: '280px',
          p: 3,
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
}

