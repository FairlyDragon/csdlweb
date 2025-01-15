import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  TextField,
  Chip,
} from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import Header from '../components/Header';
import { format } from 'date-fns';
import { useOrders } from '../contexts/OrderContext';

const Orders = () => {
  const { orders } = useOrders();
  const [dateFilter, setDateFilter] = useState('');

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'processing':
        return '#E0E7FF';
      case 'completed':
        return '#A7F3D0';
      default:
        return '#gray';
    }
  };

  const filteredOrders = dateFilter 
    ? orders.filter(order => 
        new Date(order.date).toDateString() === new Date(dateFilter).toDateString()
      )
    : orders;

  return (
    <Box>
      <Header />
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 4 }}>My Orders</Typography>

        {/* Recent Order */}
        {orders.length > 0 && orders[0].status === 'Processing' && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 4, 
              border: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalShipping sx={{ color: '#dd1d1d' }} />
              <Box>
                <Typography>{orders[0].items}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(orders[0].date, 'dd MMM yyyy')} · ${orders[0].total}
                </Typography>
              </Box>
            </Box>
            <Chip 
              label={orders[0].status}
              sx={{ 
                bgcolor: getStatusColor(orders[0].status),
                color: '#1a1a1a',
                fontWeight: 500
              }}
            />
          </Paper>
        )}

        {/* Filter */}
        <Box sx={{ mb: 3 }}>
          <TextField
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            size="small"
            sx={{ width: 200 }}
          />
        </Box>

        {/* Order History */}
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mb: 2
          }}>
            <Typography>Total order: {filteredOrders.length}</Typography>
            <Typography>
              Total purchase: ${filteredOrders.reduce((sum, order) => sum + order.total, 0)}
            </Typography>
          </Box>

          {filteredOrders.map((order) => (
            <Paper
              key={order.id}
              elevation={0}
              sx={{ 
                p: 2, 
                mb: 2, 
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalShipping sx={{ color: '#dd1d1d' }} />
                <Box>
                  <Typography>{order.items}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(order.date), 'dd MMM yyyy')} · ${order.total}
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label={order.status}
                sx={{ 
                  bgcolor: getStatusColor(order.status),
                  color: '#1a1a1a',
                  fontWeight: 500
                }}
              />
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;