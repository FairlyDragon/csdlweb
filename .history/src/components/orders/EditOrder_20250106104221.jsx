import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function EditOrder({ order, onClose, onAccept, onReject }) {
  if (!order) return null;

  // Mock menu items for display
  const orderMenu = [
    { name: 'Pepperoni Pizza', price: 5.99, quantity: 1 },
    { name: 'Cheese Burger', price: 5.99, quantity: 1 },
    { name: 'Vegan Pizza', price: 5.99, quantity: 1 }
  ];

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Order</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                ID:
              </Typography>
              <Typography variant="body1">
                {order.order_id}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Name:
              </Typography>
              <Typography variant="body1">
                {order.name}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Address:
              </Typography>
              <Typography variant="body1">
                {order.address}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Payment:
              </Typography>
              <Typography variant="body1">
                Direct
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Note:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                defaultValue={order.Note}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Order Menu
            </Typography>
            <List>
              {orderMenu.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    px: 0,
                    py: 1
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`x${item.quantity}`}
                  />
                  <Typography>
                    +${item.price.toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              <Divider />
              <ListItem sx={{ px: 0, py: 1 }}>
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="subtitle1" sx={{ ml: 'auto' }}>
                  ${order.TotalAmount.toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={() => onReject(order.order_id)}
          variant="contained"
          color="error"
          sx={{ minWidth: 100 }}
        >
          Reject
        </Button>
        <Button
          onClick={() => onAccept(order.order_id)}
          variant="contained"
          color="primary"
          sx={{ minWidth: 100 }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditOrder.propTypes = {
  order: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

