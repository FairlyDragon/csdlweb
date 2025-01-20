import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PickupOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu đơn hàng từ state
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // Nếu không có dữ liệu, quay lại trang chờ
      navigate('/shipper');
    }
  }, [location]);

  const handleStartPickup = async () => {
    try {
      // Gọi API để cập nhật trạng thái đơn hàng
      await axios.put(`/shipper/orders/${orderData.id}/pickup`);
      // Chuyển sang trang delivering
      navigate('/shipper/delivering', { 
        state: { orderData } 
      });
    } catch (error) {
      console.error('Error starting pickup:', error);
    }
  };

  if (!orderData) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Đã nhận đơn hàng #{orderData.id}
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            {orderData.restaurant.name}
            <br />
            {orderData.restaurant.address}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Delivery Information:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customer: {orderData.customer.name}
            <br />
            Address: {orderData.customer.address}
            <br />
            Phone: {orderData.customer.phone}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          fullWidth
          onClick={handleStartPickup}
          sx={{
            bgcolor: '#dd1d1d',
            '&:hover': {
              bgcolor: '#bb0f0f'
            }
          }}
        >
          Bắt đầu lấy hàng
        </Button>
      </Paper>
    </Box>
  );
};

export default PickupOrder;