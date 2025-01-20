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
import { formatDateTime } from "../../utils/formatDateTime";
import { useNavigate } from "react-router-dom";

export function OrderList({ orders }) {
  if (!orders) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" component="h2">
          Order List
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#F8F9FA" }}>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">NAME</TableCell>
              <TableCell align="center">PHONE</TableCell>
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center">ITEMS</TableCell>
              <TableCell align="center">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.order_id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <TableCell align="center">{order.order_id}</TableCell>
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{order.phone_number}</TableCell>
                <TableCell align="center">
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{order.num_of_items} items</TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(order.status).bg,
                      color: getStatusColor(order.status).color,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: "24px",
                      borderRadius: "6px",
                      "& .MuiChip-label": {
                        px: 2,
                      },
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
}

// Helper function để xác định màu sắc dựa trên status
function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return { bg: "#E8F5E9", color: "#2E7D32" };
    case "processing":
      return { bg: "#E3F2FD", color: "#1976D2" };
    case "canceled":
      return { bg: "#FFEBEE", color: "#C62828" };
    default:
      return { bg: "#FFF7CD", color: "#B78103" };
  }
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
};
