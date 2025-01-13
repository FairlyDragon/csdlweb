import { Box, Container, Grid, Typography, Button, Divider, IconButton } from '@mui/material';
import Header from '../components/Header';

// Temporary cart data (sẽ thay bằng state management sau)
const cartItems = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 12.99,
    quantity: 2,
    image: '/src/assets/images/burger.jpg'
  },
  // Thêm các món khác...
];

const Cart = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <Box>
      <Header />
      
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Your Cart
        </Typography>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Box key={item.id}>
                <Grid container spacing={2} alignItems="center">
                  {/* Item Image */}
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 2
                      }}
                    />
                  </Grid>

                  {/* Item Details */}
                  <Grid item xs={5}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </Typography>
                  </Grid>

                  {/* Quantity Controls */}
                  <Grid item xs={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        size="small"
                        sx={{ border: 1, borderColor: 'grey.300' }}
                      >
                        -
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton 
                        size="small"
                        sx={{ border: 1, borderColor: 'grey.300' }}
                      >
                        +
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Item Total */}
                  <Grid item xs={2}>
                    <Typography variant="h6" align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
              </Box>
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: 'grey.50',
                borderRadius: 2,
                p: 3
              }}
            >
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography color="text.secondary">Delivery Fee</Typography>
                  <Typography>${deliveryFee.toFixed(2)}</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;