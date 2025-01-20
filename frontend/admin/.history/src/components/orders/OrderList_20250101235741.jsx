import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const OrderList = () => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const getStatusColor = (status) => {
    const colors = {
      'Completed': '#00A76F',
      'Processing': '#7635DC',
      'Rejected': '#FF4842',
    };
    return colors[status] || '#919EAB';
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterOrders(event.target.value, dateFilter, statusFilter);
  };

  const filterOrders = (search, date, status) => {
    let filtered = [...orders];
    
    if (search) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (date) {
      filtered = filtered.filter(order => order.date === date);
    }

    if (status) {
      filtered = filtered.filter(order => order.status === status);
    }

    setFilteredOrders(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setStatusFilter('');
    setFilteredOrders(orders);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: 240 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#919EAB' }} />
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          startIcon={<FilterAltIcon />}
          sx={{ color: '#637381' }}
        >
          Filter By
        </Button>

        <Button
          startIcon={<RestartAltIcon />}
          onClick={resetFilters}
          sx={{ color: '#637381' }}
        >
          Reset Filter
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>Food</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.food}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    sx={{
                      bgcolor: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status),
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderList;

