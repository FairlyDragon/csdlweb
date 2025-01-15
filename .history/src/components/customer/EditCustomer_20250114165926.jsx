import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    orders: [],
    stats: { total_order_quantity: 0, total_purchase: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await CustomerService.getCustomerOrders(id);
        const ordersList = orders.filter((item) => item.order_id);
        const stats = orders.find((item) => item.total_order_quantity);
        setCustomerData({ orders: ordersList, stats });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Customer ID Banner */}
      <Box
        sx={{
          bgcolor: "#E3F2FD",
          p: 2,
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Typography variant="h6">{id}</Typography>
      </Box>

      {/* Customer Info Section */}
      <Box sx={{ mb: 4, position: "relative" }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mb: 2,
          }}
        />

        <Box sx={{ mb: 3 }}>
          <Typography color="textSecondary" gutterBottom>
            Address
          </Typography>
          <Typography variant="body1">
            {/* Will be filled with actual data */}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography color="textSecondary" gutterBottom>
            Phone Number
          </Typography>
          <Typography variant="body1">
            {/* Will be filled with actual data */}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography color="textSecondary" gutterBottom>
            Gender
          </Typography>
          <Typography variant="body1">
            {/* Will be filled with actual data */}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography color="textSecondary" gutterBottom>
            Date of Birth
          </Typography>
          <Typography variant="body1">
            {/* Will be filled with actual data */}
          </Typography>
        </Box>

        {/* Edit button positioned absolutely */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          Edit
        </Button>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mb: 4,
        }}
      >
        <Button variant="contained" color="primary">
          Edit
        </Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </Box>

      {/* Order History Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Order History
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 4,
          }}
        >
          <Paper sx={{ p: 2, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 1 }}>
                📋
              </Box>
              <Typography>Total Order</Typography>
            </Box>
            <Typography variant="h4">
              {customerData.stats?.total_order_quantity || 0}
            </Typography>
          </Paper>

          <Paper sx={{ p: 2, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 1 }}>
                💰
              </Box>
              <Typography>Total Purchase</Typography>
            </Box>
            <Typography variant="h4">
              ${customerData.stats?.total_purchase || 0}
            </Typography>
          </Paper>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ORDER ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>ITEMS</TableCell>
                <TableCell>PAYMENT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerData.orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>
                    {new Date(order.order_date).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {order.order_items.map((item) => (
                      <div key={item.menuitem_id}>
                        {item.menuitem_id} x{item.quantity} (${item.subtotal})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>${order.payment_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
