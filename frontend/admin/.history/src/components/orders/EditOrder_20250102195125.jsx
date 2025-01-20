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
  IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material'

export function EditOrder({ order, onClose, onAccept, onReject }) {
  if (!order) return null

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Order</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              ID: {order.order_id}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Note"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Order Menu
            </Typography>
            {/* Add order items here */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onReject(order.order_id)}
          color="error"
          variant="contained"
        >
          Reject
        </Button>
        <Button
          onClick={() => onAccept(order.order_id)}
          color="primary"
          variant="contained"
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  )
}

