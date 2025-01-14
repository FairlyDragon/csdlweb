import { useState } from 'react';
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
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: '/path/to/egg-salad.jpg',
      title: 'Egg Salad',
      price: 5,
      quantity: 2,
      total: 10
    },
    {
      id: 2,
      image: '/path/to/fried-rice.jpg', 
      title: 'Fried Rice',
      price: 5,
      quantity: 3,
      total: 15
    }
  ]);

  const [voucherCode, setVoucherCode] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const deliveryFee = 3;
  const total = subtotal + deliveryFee;

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <Box>
      <Header />
      
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Your Cart
        </Typography>

        {/* Cart Table */}
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
                    alt={item.title}
                    sx={{ width: 80, height: 60, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.total}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveItem(item.id)}>
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
          mt: 4,
          gap: 4
        }}>
          {/* Cart Totals */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Cart Totals
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>${subtotal}</Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 1,
                pb: 1,
                borderBottom: '1px solid #eee'
              }}>
                <Typography color="text.secondary">Delivery Fee</Typography>
                <Typography>${deliveryFee}</Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <Typography>Total</Typography>
                <Typography>${total}</Typography>
              </Box>
            </Paper>
            <Button
              variant="contained"
              fullWidth
              sx={{ 
                mt: 2,
                bgcolor: '#d32f2f',
                '&:hover': {
                  bgcolor: '#b71c1c'
                }
              }}
            >
              PROCESS TO CHECKOUT
            </Button>
          </Box>

          {/* Voucher Code */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ mb: 2 }}>
              If you have a voucher code, enter it here
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder="code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                size="small"
                sx={{ flex: 1, bgcolor: '#f5f5f5' }}
              />
              <Button
                variant="contained"
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
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;