import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { formatDateTime } from "../../utils/formatDateTime";
import { useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";

export function OrderList() {
  const navigate = useNavigate();
  const [passedOrders, setPassedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [dateSort, setDateSort] = useState("date");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [customerFilterType, setCustomerFilterType] = useState("name");
  const [foodSort, setFoodSort] = useState("all");

  useEffect(() => {
    const fetchPassedOrders = async () => {
      try {
        const data = await OrderService.getPassedOrdersPreviews();
        setPassedOrders(data);
      } catch (error) {
        console.error("Error fetching passed orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassedOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  const filteredOrders = passedOrders
    .filter((order) => {
      if (order.status === "waiting") return false;
      if (statusFilter !== "all" && order.status !== statusFilter) return false;

      if (customerSearchTerm) {
        const searchLower = customerSearchTerm.toLowerCase();
        const customer = order.customer;

        switch (customerFilterType) {
          case "name":
            return customer.name.toLowerCase().includes(searchLower);
          case "phone":
            return customer.phone_number.includes(searchLower);
          default:
            return true;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (dateSort !== "date") {
        const dateA = new Date(a.order_date);
        const dateB = new Date(b.order_date);
        return dateSort === "newest" ? dateB - dateA : dateA - dateB;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const currentOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  const handleReset = () => {
    setDateSort("date");
    setStatusFilter("all");
    setFoodSort("all");
    setCustomerFilterType("name");
    setCustomerSearchTerm("");
    setPage(1);
  };

  const handleOrderClick = (order) => {
    navigate(`/orders/${order.order_id}`);
  };

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Order List
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          p: 2,
          backgroundColor: "#F8F9FA",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            backgroundColor: "white",
            borderRadius: 1,
            border: "1px solid #DFE3E8",
          }}
        >
          <FilterAltOutlinedIcon sx={{ color: "#637381" }} />
        </Box>

        <Select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          size="small"
          displayEmpty
          sx={{
            minWidth: 130,
            bgcolor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#DFE3E8",
            },
          }}
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          displayEmpty
          sx={{
            minWidth: 130,
            bgcolor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#DFE3E8",
            },
          }}
        >
          <MenuItem value="all">Status</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>

        <Select
          value={foodSort}
          onChange={(e) => setFoodSort(e.target.value)}
          size="small"
          displayEmpty
          sx={{
            minWidth: 130,
            bgcolor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#DFE3E8",
            },
          }}
        >
          <MenuItem value="all">Food</MenuItem>
          <MenuItem value="highest">Highest Items</MenuItem>
          <MenuItem value="lowest">Lowest Items</MenuItem>
        </Select>

        <Select
          value={customerFilterType}
          onChange={(e) => setCustomerFilterType(e.target.value)}
          size="small"
          displayEmpty
          sx={{
            minWidth: 130,
            bgcolor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#DFE3E8",
            },
          }}
        >
          <MenuItem value="name">Customer Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="phone">Phone Number</MenuItem>
          <MenuItem value="address">Address</MenuItem>
        </Select>

        <TextField
          size="small"
          placeholder={`Search by ${customerFilterType}...`}
          value={customerSearchTerm}
          onChange={(e) => setCustomerSearchTerm(e.target.value)}
          sx={{
            flexGrow: 1,
            bgcolor: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#DFE3E8",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: "#637381" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            minWidth: 110,
            borderColor: "#FF4842",
            color: "#FF4842",
            "&:hover": {
              borderColor: "#B72136",
              bgcolor: "rgba(255, 72, 66, 0.08)",
            },
          }}
        >
          Reset
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
          <TableHead sx={{ backgroundColor: "#F8F9FA" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                NAME
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                ADDRESS
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                PHONE
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                DATE
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                Food
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                STATUS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => handleOrderClick(order)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center">{order.customer.name}</TableCell>
                <TableCell align="center">{order.customer.address}</TableCell>
                <TableCell align="center">
                  {order.customer.phone_number}
                </TableCell>
                <TableCell align="center">
                  {formatDateTime(order.order_date)}
                </TableCell>
                <TableCell align="center">
                  {order.order_details.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  items
                </TableCell>
                <TableCell align="center">
                  <Chip size="small" {...getStatusChipProps(order.status)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
