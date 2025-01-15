import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Divider,
  TextField
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Header from '../../components/Header';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [voucher, setVoucher] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 3;
  const discount = voucher === 'NEWCUSTOMER' ? 3 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { 
      state: { 
        cartItems,
        subtotal,
        deliveryFee,
        discount,
        total,
        voucher
      } 
    });
  };

  if (cartItems.length === 0) {
    return (
      <Box>
        <Header />
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            p: 3
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Your cart is empty</Typography>
          <Button 
            variant="contained"
            onClick={() => navigate('/menu')}
            sx={{ 
              bgcolor: '#dd1d1d',
              '&:hover': {
                bgcolor: '#bb0f0f'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Shopping Cart</Typography>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <Box 
            key={item.id}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              p: 2,
              border: '1px solid #eee',
              borderRadius: 1
            }}
          >
            <Box 
              component="img"
              src={item.image}
              alt={item.name}
              sx={{ width: 80, height: 80, objectFit: 'cover', mr: 2 }}
            />
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography>{item.name}</Typography>
              <Typography color="text.secondary">${item.price}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
              <IconButton 
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Typography sx={{ ml: 2, minWidth: 80 }} align="right">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}

        {/* Voucher */}
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            placeholder="Enter voucher code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            sx={{ width: 200 }}
          />
          {voucher && !discount && (
            <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
              Invalid voucher code
            </Typography>
          )}
        </Box>

        {/* Order Summary */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Delivery Fee</Typography>
            <Typography>${deliveryFee.toFixed(2)}</Typography>
          </Box>

          {discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Discount</Typography>
              <Typography color="error">-${discount.toFixed(2)}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCheckout}
            sx={{ 
              bgcolor: '#dd1d1d',
              '&:hover': {
                bgcolor: '#bb0f0f'
              }
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;