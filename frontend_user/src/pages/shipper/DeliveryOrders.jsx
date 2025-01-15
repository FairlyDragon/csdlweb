import { Box, Typography } from '@mui/material';
import Header from '../../components/Header';

const DeliveryOrders = () => {
  return (
    <Box>
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Delivery Orders</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your delivery orders will appear here
        </Typography>
      </Box>
    </Box>
  );
};

export default DeliveryOrders;