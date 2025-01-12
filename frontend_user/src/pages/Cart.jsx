import { useContext } from 'react';
import { Box, Grid, Button } from '@mui/material';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeItem } = useContext(CartContext);

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderSummary items={items} />
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            href="/checkout"
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;