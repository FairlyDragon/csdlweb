import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Shipper Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your delivery dashboard
      </Typography>
    </Box>
  );
};

export default Dashboard;