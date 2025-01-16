import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function EditOrder({ open, order, onClose, onUpdate }) {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details #{order.order_id}</DialogTitle>
      <DialogContent>
        {/* ... your order details form ... */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => {
          // Handle update logic
          onUpdate(order);
        }}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
