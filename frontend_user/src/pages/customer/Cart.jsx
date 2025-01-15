import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart } from '@mui/icons-material';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [voucher, setVoucher] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 3 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        p: 3 
      }}>
        <ShoppingCart sx={{ fontSize: 100, color: 'grey.300', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 1, color: 'grey.600' }}>
          Your cart is empty
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'grey.500', textAlign: 'center' }}>
          Looks like you haven't added anything to your cart yet.
          <br />
          Start shopping to fill it up!
        </Typography>
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
          Browse Menu
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 4 }}>Your Cart</Typography>

      {/* Cart Items Table */}
      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Items</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Box 
                  component="img" 
                  src={item.image}
                  sx={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 1 }}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <Typography>{item.quantity}</Typography>
              </TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <IconButton onClick={() => removeFromCart(item.id)}>
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Cart Totals and Voucher */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 4 
      }}>
        {/* Cart Totals */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Cart Totals</Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr auto',
            gap: 2,
            mb: 2 
          }}>
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
            
            {cartItems.length > 0 && (
              <>
                <Typography color="text.secondary">Delivery Fee</Typography>
                <Typography>${deliveryFee.toFixed(2)}</Typography>
              </>
            )}
            
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/checkout')}
            sx={{ 
              mt: 2,
              bgcolor: '#dd4b39',
              '&:hover': {
                bgcolor: '#c23321'
              }
            }}
          >
            PROCESS TO CHECKOUT
          </Button>
        </Box>

        {/* Voucher Input */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ mb: 1 }}>
            If you have a voucher code, enter it here
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="code"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: '#000',
                '&:hover': {
                  bgcolor: '#333'
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;