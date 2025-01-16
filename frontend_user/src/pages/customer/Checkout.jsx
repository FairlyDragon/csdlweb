
import { useOrders } from '../../contexts/OrderContext';
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('direct');
  const { addOrder } = useOrders();

  // Giả sử thông tin user được lấy từ context hoặc redux
  const user = {
    name: 'Nguyen Van A',
    phone: '0987654321',
    address: '234 Nguyen Trai'
  };

  const subtotal = getCartTotal();
  const deliveryFee = 3;
  const voucher = 3; // Lấy từ context nếu có voucher đã áp dụng
  const tax = 1;
  const total = subtotal + deliveryFee - voucher + tax;

  const handleSubmitOrder = () => {
    // Xử lý đặt hàng
    const total = subtotal + deliveryFee - (voucher || 0);
    
    // Thêm đơn hàng mới
    addOrder(cartItems, total, voucher);
    
    // Xóa giỏ hàng
    clearCart();
    
    // Chuyển đến trang Orders
    navigate('/orders');
  };

  return (
    <Box>
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">BACK</Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 4 }}>Checkout</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left Column */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Delivery Information</Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1 }}>User</Typography>
              <Typography variant="body2">{user.name}</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mb: 1 }}>Address</Typography>
                <Typography variant="body2">{user.address}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mb: 1 }}>Phone</Typography>
                <Typography variant="body2">{user.phone}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mb: 1 }}>Time</Typography>
                <Typography variant="body2">01/01/2025 - 11:00 AM</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Food Item</Typography>
            {cartItems.map((item) => (
              <Box 
                key={item.id} 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mb: 2,
                  alignItems: 'center'
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 80, height: 60, objectFit: 'cover' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    x{item.quantity}
                  </Typography>
                </Box>
                <Typography>${item.price * item.quantity}</Typography>
              </Box>
            ))}

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="note here"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Paper>
        </Box>

        {/* Right Column */}
        <Box sx={{ width: 300 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Cart Totals</Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>${subtotal}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Delivery Fee</Typography>
                <Typography>${deliveryFee}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Voucher</Typography>
                <Typography color="success.main">-${voucher}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography>${tax}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${total}</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Payment</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>Method</Typography>
              <Select
                fullWidth
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                size="small"
              >
                <MenuItem value="direct">Direct</MenuItem>
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="momo">Momo</MenuItem>
              </Select>
            </Box>
          </Paper>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmitOrder}
            sx={{ 
              bgcolor: '#D85831',
              '&:hover': {
                bgcolor: '#BF4F2C'
              }
            }}
          >
            ORDER
          </Button>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Checkout;