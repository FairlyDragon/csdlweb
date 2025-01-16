import { Box, Typography, Paper, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const DeliveringOrder = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Đang giao hàng
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Địa chỉ giao hàng: 123 ABC Street
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Customer Information:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Name: John Doe
            <br />
            Phone: 0123456789
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          fullWidth
          color="success"
        >
          Hoàn thành giao hàng
        </Button>
      </Paper>
    </Box>
  );
};

export default DeliveringOrder;