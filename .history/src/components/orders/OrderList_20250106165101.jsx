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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export function OrderList({ orders, onOrderSelect }) {
  console.log("OrderList received orders:", orders);

  const [page, setPage] = useState(1);
  const ordersPerPage = 8;
  const [dateSort, setDateSort] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");

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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const filteredOrders = orders
    .filter((order) => {
      if (order.status === "waiting") return false;

      if (statusFilter !== "all" && order.status !== statusFilter) return false;

      if (
        searchTerm &&
        !order.order_details.some((detail) =>
          detail.item_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
        return false;

      if (customerSearchTerm) {
        const searchLower = customerSearchTerm.toLowerCase();
        const customer = order.customer;
        return (
          customer.name.toLowerCase().includes(searchLower) ||
          customer.phone_number.includes(searchLower) ||
          customer.address.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower)
        );
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return dateSort === "newest" ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const currentOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  const handleReset = () => {
    setDateSort("newest");
    setStatusFilter("all");
    setSearchTerm("");
    setCustomerSearchTerm("");
    setPage(1);
  };

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Order List
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          p: 2,
          backgroundColor: "#F8F9FA",
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterAltOutlinedIcon sx={{ color: "#637381" }} />
          <Typography sx={{ color: "#637381", fontWeight: 500 }}>
            Filter By
          </Typography>
        </Box>

        <Select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          size="small"
          sx={{
            minWidth: 120,
            bgcolor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#DFE3E8",
            },
          }}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{
            minWidth: 120,
            bgcolor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#DFE3E8",
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>

        <TextField
          size="small"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
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

        <TextField
          size="small"
          placeholder="Search customer info..."
          value={customerSearchTerm}
          onChange={(e) => setCustomerSearchTerm(e.target.value)}
          sx={{
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
            borderColor: "#FF4842",
            color: "#FF4842",
            "&:hover": {
              borderColor: "#B72136",
              bgcolor: "rgba(255, 72, 66, 0.08)",
            },
          }}
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
                ID
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
                onClick={() => onOrderSelect(order)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="center">{order.order_id}</TableCell>
                <TableCell align="center">{order.customer.name}</TableCell>
                <TableCell align="center">{order.customer.address}</TableCell>
                <TableCell align="center">
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {order.order_details[0].item_name}
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

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  onOrderSelect: PropTypes.func.isRequired,
};
