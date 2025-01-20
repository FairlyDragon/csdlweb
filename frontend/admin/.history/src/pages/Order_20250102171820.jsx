import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Sample data structure matching ERD
const INITIAL_ORDERS = [
  {
    order_id: 1,
    user_id: 101,
    orderDate: "2024-03-14T10:30:00",
    totalAmount: 15.99,
    status: "waiting", // waiting, processing, completed, rejected
    note: "No spicy please",
    voucher_id: 1001,
    discountApplied: 2.00
  },
  {
    order_id: 2,
    user_id: 102,
    orderDate: "2024-03-14T11:45:00", 
    totalAmount: 25.50,
    status: "processing",
    note: "Extra sauce",
    voucher_id: null,
    discountApplied: 0.00
  },
  // ... more orders
];

const Order = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [dateFilter, setDateFilter] = useState("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Save orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
    setCurrentPage(1); // Reset page when changing tabs
  };

  const handleResetFilters = () => {
    setDateFilter("all");
    setOrderTypeFilter("all");
    setStatusFilter("all");
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  // Filter orders based on current filters
  const getFilteredOrders = () => {
    let filtered = [...orders];

    if (dateFilter !== "all") {
      const today = new Date();
      const thisWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        switch(dateFilter) {
          case "today":
            return orderDate.toDateString() === today.toDateString();
          case "thisWeek":
            return orderDate >= thisWeek;
          case "thisMonth":
            return orderDate >= thisMonth;
          default:
            return true;
        }
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    return filtered;
  };

  // Get orders for current page
  const getCurrentPageOrders = () => {
    const filtered = getFilteredOrders();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  };

  // Get waiting to accept orders
  const getWaitingOrders = () => {
    return orders.filter((order) => order.status === "waiting");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "#00A76F !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#00A76F",
          },
        }}
      >
        <Tab label="Waiting to Accept" />
        <Tab label="Order List" />
      </Tabs>

      {currentTab === 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getWaitingOrders().map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>{order.note}</TableCell>
                  <TableCell>{formatCurrency(order.discountApplied)}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: "#919EAB14",
                        color: "#212B36",
                        "&:hover": { bgcolor: "#919EAB29" },
                      }}
                    >
                      Process
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {currentTab === 1 && (
        <>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <FormControl size="small">
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                displayEmpty
                startAdornment={
                  <FilterListIcon sx={{ color: "#637381", mr: 1 }} />
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="all">Date</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="thisWeek">This Week</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <Select
                value={orderTypeFilter}
                onChange={(e) => setOrderTypeFilter(e.target.value)}
                displayEmpty
                startAdornment={
                  <FilterListIcon sx={{ color: "#637381", mr: 1 }} />
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="all">Order Type</MenuItem>
                <MenuItem value="Fried Rice">Fried Rice</MenuItem>
                <MenuItem value="Pho">Pho</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                startAdornment={
                  <FilterListIcon sx={{ color: "#637381", mr: 1 }} />
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="all">Order Status</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>

            <IconButton onClick={handleResetFilters}>
              <RestartAltIcon />
            </IconButton>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell>Voucher ID</TableCell>
                  <TableCell>Discount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getCurrentPageOrders().map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.user_id}</TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          display: "inline-block",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: 
                            order.status === "completed" ? "#EEFBF0" :
                            order.status === "processing" ? "#EEF5FF" :
                            order.status === "rejected" ? "#FFE9D5" :
                            "#FFF7CD",
                          color:
                            order.status === "completed" ? "#229A16" :
                            order.status === "processing" ? "#1939B7" :
                            order.status === "rejected" ? "#B93815" :
                            "#B78103",
                        }}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.note}</TableCell>
                    <TableCell>{order.voucher_id || '-'}</TableCell>
                    <TableCell>{formatCurrency(order.discountApplied)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Order;
