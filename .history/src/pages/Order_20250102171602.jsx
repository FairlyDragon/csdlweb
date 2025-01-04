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

// Sample data structure for an order
const INITIAL_ORDERS = [
  {
    id: "00001",
    name: "Nguyen Van A",
    address: "334 Nguyen Trai",
    date: "04 Sep 2024",
    food: "Fried Rice",
    status: "completed",
  },
  {
    id: "00002",
    name: "Ho Thi B",
    address: "20 Tay Son",
    date: "28 May 2024",
    food: "Fried Rice",
    status: "processing",
  },
  // ... more sample orders
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

  // Filter orders based on current filters
  const getFilteredOrders = () => {
    let filtered = [...orders];

    if (dateFilter !== "all") {
      filtered = filtered.filter((order) => {
        // Add date filtering logic
        return true;
      });
    }

    if (orderTypeFilter !== "all") {
      filtered = filtered.filter((order) => order.food === orderTypeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
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
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>Food</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getWaitingOrders().map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.food}</TableCell>
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
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>ADDRESS</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>Food</TableCell>
                  <TableCell>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getCurrentPageOrders().map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.food}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          display: "inline-block",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor:
                            order.status === "completed"
                              ? "#EEFBF0"
                              : order.status === "processing"
                              ? "#EEF5FF"
                              : "#FFE9D5",
                          color:
                            order.status === "completed"
                              ? "#229A16"
                              : order.status === "processing"
                              ? "#1939B7"
                              : "#B93815",
                        }}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Typography>
                    </TableCell>
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
