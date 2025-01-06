import PropTypes from "prop-types";
import { useState } from "react";
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
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

export function OrderList({ orders, onOrderSelect }) {
  console.log("OrderList received orders:", orders);

  const [page, setPage] = useState(1);
  const ordersPerPage = 10;
  const [dateSort, setDateSort] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getStatusChipProps = (status) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          sx: { bgcolor: "#E8F5E9", color: "#2E7D32" },
        };
      case "processing":
        return {
          label: "Processing",
          sx: { bgcolor: "#E3F2FD", color: "#1976D2" },
        };
      case "rejected":
        return {
          label: "Rejected",
          sx: { bgcolor: "#FFEBEE", color: "#D32F2F" },
        };
      default:
        return {
          label: "Pending",
          sx: { bgcolor: "#FFF3E0", color: "#E65100" },
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

  const filteredOrders = orders
    .filter(order => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      
      if (searchTerm && !order.order_details.some(detail => 
        detail.menuitem_name.toLowerCase().includes(searchTerm.toLowerCase())
      )) return false;
      
      if (categoryFilter !== 'all' && !order.order_details.some(detail => 
        detail.category === categoryFilter
      )) return false;
      
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleReset = () => {
    setDateSort('newest');
    setStatusFilter('all');
    setSearchTerm('');
    setCategoryFilter('all');
  };

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Order List
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          size="small"
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>

        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="pizza">Pizza</MenuItem>
          <MenuItem value="burger">Burger</MenuItem>
        </Select>

        <TextField
          size="small"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          startIcon={<FilterListIcon />}
          variant="outlined"
          color="error"
          onClick={handleReset}
        >
          Reset Filter
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid",
          borderColor: "divider",
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
            {filteredOrders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => onOrderSelect(order)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.customer.address}</TableCell>
                <TableCell>
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.order_details[0].item_name}</TableCell>
                <TableCell align="right">
                  <Chip size="small" {...getStatusChipProps(order.status)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  onOrderSelect: PropTypes.func.isRequired,
};
