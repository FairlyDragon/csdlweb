import { Box, Typography, Paper, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DeliveredOrder = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Đã giao hàng thành công
      </Typography>
      
      <Paper sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <CheckCircleIcon 
          sx={{ 
            fontSize: 60, 
            color: 'success.main',
            mb: 2 
          }} 
        />
        <Typography variant="h6" sx={{ mb: 1 }}>
          Giao hàng thành công!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Cảm ơn bạn đã hoàn thành đơn hàng
        </Typography>
        <Button 
          variant="contained"
          sx={{
            bgcolor: '#dd1d1d',
            '&:hover': {
              bgcolor: '#bb0f0f'
            }
          }}
        >
          Tiếp tục nhận đơn
        </Button>
      </Paper>
    </Box>
  );
};

export default DeliveredOrder;