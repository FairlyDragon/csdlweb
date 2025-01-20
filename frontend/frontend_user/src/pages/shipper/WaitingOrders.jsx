import { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const WaitingOrders = () => {
  const navigate = useNavigate();
  const [hasNewOrder, setHasNewOrder] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Hàm kiểm tra đơn hàng mới
  const checkNewOrders = async () => {
    try {
      const response = await axios.get('/shipper/available-orders');
      if (response.data && response.data.length > 0) {
        setHasNewOrder(true);
        setOpenSnackbar(true);
        // Tự động chuyển sang trang pickup sau 2 giây
        setTimeout(() => {
          navigate('/shipper/pickup', { 
            state: { orderData: response.data[0] } 
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking new orders:', error);
    }
  };

  // Polling mỗi 10 giây
  useEffect(() => {
    const interval = setInterval(() => {
      checkNewOrders();
    }, 10000);

    // Kiểm tra ngay khi component mount
    checkNewOrders();

    // Cleanup khi component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 3
    }}>
      <StarIcon sx={{ 
        fontSize: 40, 
        color: '#ffd700',
        mb: 2 
      }} />
      <Typography variant="h6" sx={{ mb: 1 }}>
        Đang chờ đơn hàng
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {hasNewOrder 
          ? 'Đã tìm thấy đơn hàng mới! Đang chuyển hướng...'
          : 'Hiện tại không có đơn hàng nào cho bạn'
        }
      </Typography>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={2000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Có đơn hàng mới! Đang chuyển hướng...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WaitingOrders;