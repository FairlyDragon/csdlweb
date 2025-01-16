import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export function EditOrder({ open, order, onClose, onUpdate }) {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details #{order.order_id}</DialogTitle>
      <DialogContent>
        {/* ... your order details form ... */}
        <pre>{JSON.stringify(order, null, 2)}</pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => {
          onUpdate(order);
        }}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
