import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerData, setCustomerData] = useState({
    orders: [],
    stats: { total_order_quantity: 0, total_purchase: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cả thông tin khách hàng và lịch sử đơn hàng
        const [details, orders] = await Promise.all([
          CustomerService.getCustomerDetails(id),
          CustomerService.getCustomerOrders(id),
        ]);

        setCustomerDetails(details);

        // Xử lý dữ liệu orders như cũ
        const ordersList = orders.filter((item) => item.order_id);
        const stats = orders.find((item) => item.total_order_quantity);
        setCustomerData({ orders: ordersList, stats });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await CustomerService.deleteCustomer(id);
      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header with Back button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate("/customers")} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Customer</Typography>
      </Box>

      {/* Customer ID Banner */}
      <Box
        sx={{
          bgcolor: "#E3F2FD",
          p: 2,
          borderRadius: 1,
          mb: 3,
        }}
      >
        <Typography variant="h6">{id}</Typography>
      </Box>

      {/* Customer Details */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}>
          <Avatar
            src={customerDetails?.avatar_url}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{customerDetails?.name}</Typography>
            <Typography color="textSecondary">
              {customerDetails?.email}
            </Typography>
          </Box>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Address
            </Typography>
            <Typography>{customerDetails?.address}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography>{customerDetails?.phone_number}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Gender
            </Typography>
            <Typography>{customerDetails?.gender}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Date of Birth
            </Typography>
            <Typography>{customerDetails?.date_of_birth}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 3 }}>
        <Button variant="contained" color="primary">
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>

      {/* Order History Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order History
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
          }}
        >
          <Paper sx={{ p: 2, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 1 }}>
                📋
              </Box>
              <Typography>Total Order</Typography>
            </Box>
            <Typography variant="h5" sx={{ mt: 1 }}>
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
            <Typography variant="h5" sx={{ mt: 1 }}>
              ${customerData.stats?.total_purchase || 0}
            </Typography>
          </Paper>
        </Box>

        <TableContainer component={Paper}>
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
