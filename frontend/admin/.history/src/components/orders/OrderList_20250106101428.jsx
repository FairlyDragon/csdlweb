import  { useState } from 'react';
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
  Select,
  MenuItem,
  Button,
  Pagination,
  Chip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export function OrderList({ orders, onOrderSelect }) {
  const [page, setPage] = useState(1);
  const ordersPerPage = 10;

  const getStatusChipProps = (status) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          sx: { bgcolor: '#E8F5E9', color: '#2E7D32' }
        };
      case 'processing':
        return {
          label: 'Processing',
          sx: { bgcolor: '#E3F2FD', color: '#1976D2' }
        };
      case 'rejected':
        return {
          label: 'Rejected',
          sx: { bgcolor: '#FFEBEE', color: '#D32F2F' }
        };
      default:
        return {
          label: 'Pending',
          sx: { bgcolor: '#FFF3E0', color: '#E65100' }
        };
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedOrders = orders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Order List
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Select size="small" defaultValue="date" sx={{ minWidth: 120 }}>
          <MenuItem value="date">Date</MenuItem>
        </Select>
        <Select size="small" defaultValue="type" sx={{ minWidth: 120 }}>
          <MenuItem value="type">Order Type</MenuItem>
        </Select>
        <Select size="small" defaultValue="status" sx={{ minWidth: 120 }}>
          <MenuItem value="status">Order Status</MenuItem>
        </Select>
        <Button 
          startIcon={<FilterListIcon />} 
          variant="outlined"
          color="error"
          sx={{ ml: 'auto' }}
        >
          Reset Filter
        </Button>
      </Box>
      <TableContainer 
        component={Paper}
        sx={{ 
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>Food</TableCell>
              <TableCell align="right">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => onOrderSelect(order)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.customer.address}</TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>{order.order_details[0].item_name}</TableCell>
                <TableCell align="right">
                  <Chip
                    size="small"
                    {...getStatusChipProps(order.status)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination 
          count={Math.ceil(orders.length / ordersPerPage)} 
          page={page}
          onChange={handlePageChange}
          color="primary" 
        />
      </Box>
    </Box>
  );
}

