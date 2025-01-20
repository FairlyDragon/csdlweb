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
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customers')}
          sx={{ color: 'text.secondary' }}
        >
          Back to Customers
        </Button>
      </Box>

      {/* Customer ID Banner */}
      <Box
        sx={{
          bgcolor: "#E3F2FD",
          p: 2,
          borderRadius: "4px 4px 0 0",
          background: "linear-gradient(to right, #E3F2FD, #FFF8E1)",
        }}
      >
        <Typography variant="h6">C{id}</Typography>
      </Box>

      {/* Customer Info Card */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          position: "relative",
          borderRadius: "0 0 4px 4px",
        }}
      >
        {/* Edit Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          Edit
        </Button>

        {/* Customer Basic Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mr: 2,
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Nguyễn Văn A
            </Typography>
            <Typography color="textSecondary">nguyenvana@gmail.com</Typography>
          </Box>
        </Box>

        {/* Customer Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            mb: 3,
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Address
            </Typography>
            <Typography>234 Nguyễn Trãi, Thanh Xuân, Hà Nội</Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography>0987654321</Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Gender
            </Typography>
            <Typography>Female</Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Date of Birth
            </Typography>
            <Typography>01/01/2004</Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Created at
            </Typography>
            <Typography>01/01/2025</Typography>
          </Box>
        </Box>

        {/* Delete Button */}
        <Button
          variant="contained"
          color="error"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Paper>

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
