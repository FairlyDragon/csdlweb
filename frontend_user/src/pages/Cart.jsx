import { Box, Typography, Button, TextField } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/cart/CartItem';

export function Cart() {
  const { cartItems, deliveryFee, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const total = subtotal + deliveryFee;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>

      {/* Header */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr auto auto auto',
        gap: 2,
        py: 2,
        borderBottom: '2px solid #eee'
      }}>
        <Typography>Items</Typography>
        <Typography>Title</Typography>
        <Typography>Price</Typography>
        <Typography>Quantity</Typography>
        <Typography>Total</Typography>
        <Typography>Remove</Typography>
      </Box>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <Typography sx={{ py: 4 }}>Your cart is empty</Typography>
      ) : (
        cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))
      )}

      {/* Cart Totals */}
      <Box sx={{ 
        maxWidth: 400, 
        ml: 'auto', 
        mt: 4 
      }}>
        <Typography variant="h6">Cart Totals</Typography>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 2 
        }}>
          <Typography>Subtotal</Typography>
          <Typography>${subtotal}</Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 1 
        }}>
          <Typography>Delivery Fee</Typography>
          <Typography>${deliveryFee}</Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 2,
          pt: 2,
          borderTop: '2px solid #eee'
        }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total}</Typography>
        </Box>

        {/* Voucher Input */}
        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <TextField 
            size="small"
            placeholder="If you have a voucher code, enter it here"
            fullWidth
          />
          <Button variant="contained">Submit</Button>
        </Box>

        {/* Checkout Button */}
        <Button 
          variant="contained" 
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          PROCESS TO CHECKOUT
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;