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
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function EditOrder({ order, onClose, onAccept, onReject }) {
  if (!order) return null;

  const total = order.order_details?.reduce(
    (sum, item) => sum + item.subtotal,
    0
  ) || 0;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Order</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">ID:</Typography>
          <Typography>{order.order_id}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Name:</Typography>
          <Typography>{order.customer?.name}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Address:</Typography>
          <Typography>{order.customer?.address}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Payment:</Typography>
          <Typography>{order.payment?.payment_method}</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">Note:</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            defaultValue={order.note}
            variant="outlined"
            size="small"
          />
        </Box>
        <Typography variant="subtitle1" gutterBottom>Order Menu</Typography>
        <List>
          {order.order_details?.map((item, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemText
                primary={item.menuitem_name}
                secondary={`x${item.quantity}`}
              />
              <Typography>+${item.subtotal.toFixed(2)}</Typography>
            </ListItem>
          ))}
          <ListItem sx={{ pt: 2 }}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1" sx={{ ml: 'auto' }}>
              ${total.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={() => onReject(order.order_id)}
          variant="contained"
          color="error"
        >
          Reject
        </Button>
        <Button
          onClick={() => onAccept(order.order_id)}
          variant="contained"
          color="primary"
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

