import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [error, setError] = useState('');

  const subtotal = getCartTotal();
  const discount = appliedVoucher ? 3 : 0; // Giả sử mỗi voucher giảm $3
  const deliveryFee = subtotal > 0 ? 3 : 0; // Chỉ tính phí giao hàng khi có món
  const total = subtotal + deliveryFee - discount;

  const handleApplyVoucher = () => {
    // Giả sử chỉ có một mã voucher cố định là "SAVE3"
    if (voucherCode.toUpperCase() === 'SAVE3') {
      setAppliedVoucher({
        code: voucherCode.toUpperCase(),
        discount: 3
      });
      setError('');
      setVoucherCode('');
    } else {
      setError('Invalid voucher code');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Box>
      <Header/>
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 4 }}>Your Cart</Typography>

      <Table>
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
                  alt={item.name}
                  sx={{ width: 80, height: 60, objectFit: 'cover' }}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
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

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        mt: 4,
        gap: 4
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Cart Totals</Typography>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mb: 1
            }}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mb: 1
            }}>
              <Typography>Delivery Fee</Typography>
              <Typography>${deliveryFee.toFixed(2)}</Typography>
            </Box>
            {appliedVoucher && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 1,
                color: 'success.main'
              }}>
                <Typography>Voucher ({appliedVoucher.code})</Typography>
                <Typography>-${discount.toFixed(2)}</Typography>
              </Box>
            )}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 2,
              borderTop: '1px solid #eee',
              pt: 1
            }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>
              If you have a voucher code, enter it here
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder="code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                size="small"
                error={!!error}
                helperText={error}
                sx={{ 
                  flex: 1,
                  bgcolor: '#f5f5f5'
                }}
              />
              <Button
                variant="contained"
                onClick={handleApplyVoucher}
                sx={{ 
                  bgcolor: 'black',
                  '&:hover': {
                    bgcolor: '#333'
                  }
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckout}
            sx={{ 
              bgcolor: '#D85831',
              '&:hover': {
                bgcolor: '#BF4F2C'
              }
            }}
          >
            PROCESS TO CHECKOUT
          </Button>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Cart;