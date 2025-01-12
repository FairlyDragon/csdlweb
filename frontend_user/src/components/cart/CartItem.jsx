import { Box, Typography, IconButton, TextField } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <Box sx={{ display: 'flex', py: 2, borderBottom: '1px solid #eee' }}>
      <Box
        component="img"
        src={item.image}
        sx={{ width: 80, height: 80, borderRadius: 1 }}
      />
      
      <Box sx={{ flex: 1, ml: 2 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="primary">${item.price}</Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
            <Remove />
          </IconButton>
          <TextField
            size="small"
            value={item.quantity}
            sx={{ width: 60, mx: 1 }}
          />
          <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
            <Add />
          </IconButton>
          <IconButton onClick={() => onRemove(item.id)} color="error">
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;