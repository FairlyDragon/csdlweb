import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Grid,
} from "@mui/material";
import { formatDateTime } from "../../utils/formatDateTime";

export const WaitingAccept = ({ orders = [], onOrderSelect }) => {
  if (!orders || orders.length === 0) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Waiting Accept
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography>No pending orders</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Waiting Accept
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order?.order_id}>
            <Paper 
              sx={{ 
                p: 2, 
                cursor: 'pointer' 
              }}
              onClick={() => onOrderSelect(order?.order_id)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>{order?.name || 'N/A'}</Typography>
                <Typography color="textSecondary">{order?.phone_number || 'N/A'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="textSecondary">
                  {new Date(order?.order_date).toLocaleDateString() || 'N/A'}
                </Typography>
                <Typography>{order?.num_of_items || 0} items</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

WaitingAccept.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  onOrderSelect: PropTypes.func.isRequired,
};
