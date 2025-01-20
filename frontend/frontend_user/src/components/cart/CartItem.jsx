import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../../contexts/CartContext';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      py: 2,
      borderBottom: '1px solid #eee'
    }}>
      <Box sx={{ width: 80, height: 80 }}>
        <img 
          src={item.image} 
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{ flex: 1, mx: 2 }}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography>${item.price}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          size="small"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </IconButton>
        <Typography>{item.quantity}</Typography>
        <IconButton 
          size="small"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </IconButton>
      </Box>

      <Typography sx={{ width: 80, textAlign: 'right' }}>
        ${item.price * item.quantity}
      </Typography>

      <IconButton 
        onClick={() => removeFromCart(item.id)}
        sx={{ ml: 2 }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default CartItem;