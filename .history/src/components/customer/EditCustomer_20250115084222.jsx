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
    stats: { total_order_quantity: 0, total_purchase: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [id]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      // Fetch customer details và history cùng lúc
      const [details, history] = await Promise.all([
        CustomerService.getCustomerById(id),
        CustomerService.getCustomerHistory(id)
      ]);

      setCustomerDetails(details);

      // Tách orders và stats từ history
      const orders = history.filter(item => item.order_id);
      const stats = history.find(item => item.total_order_quantity) || {
        total_order_quantity: 0,
        total_purchase: 0
      };

      setCustomerData({
        orders: orders,
        stats: stats
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Giữ lại UI cho chức năng xóa
  const handleDelete = () => {
    console.log("Delete functionality pending for customer:", id);
    navigate("/customers");
  };

  if (loading) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/customers")}
          sx={{ color: "text.secondary" }}
        >
          Back to Customers
        </Button>
      </Box>

      {/* Customer ID Banner */}
      <Box sx={{
        bgcolor: "#E3F2FD",
        p: 2,
        borderRadius: "4px 4px 0 0",
        background: "linear-gradient(to right, #E3F2FD, #FFF8E1)",
      }}>
        <Typography variant="h6">C{id}</Typography>
      </Box>

      {/* Customer Info Card */}
      <Paper sx={{ p: 3, mb: 4, position: "relative" }}>
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            src={customerDetails?.avatar_url}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {customerDetails?.name}
            </Typography>
            <Typography color="textSecondary">
              {customerDetails?.email}
            </Typography>
          </Box>
        </Box>

        {/* Customer Details Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Address
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.address}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.phone_number}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Gender
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.gender}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Date of Birth
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {new Date(customerDetails?.date_of_birth).toLocaleDateString()}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Created at
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {new Date(customerDetails?.created_at).toLocaleDateString()}
            </Typography>
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
      <Box>
        <Typography variant="h6" sx={{ color: "#40C057", mb: 3 }}>
          Order History
        </Typography>

        {/* Stats Cards */}
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <Paper sx={{ p: 3, width: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box component="span" sx={{ color: "#4dabf7", fontSize: "24px", width: "24px" }}>≡</Box>
              <Typography variant="body2" color="text.secondary" sx={{ flex: 1, textAlign: "center", pr: 3 }}>
                Total Order
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 1, fontSize: "2rem" }}>
              {customerData.stats.total_order_quantity}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, width: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box component="span" sx={{ color: "#fab005", fontSize: "24px", width: "24px" }}>$</Box>
              <Typography variant="body2" color="text.secondary" sx={{ flex: 1, textAlign: "center", pr: 3 }}>
                Total Purchase
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 1, fontSize: "2rem" }}>
              ${customerData.stats.total_purchase}
            </Typography>
          </Paper>
        </Box>

        {/* Orders Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "white" }}>
                <TableCell>ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>ITEMS</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerData.orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>
                    {new Date(order.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.order_items.map((item, index) => (
                      <div key={index}>
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
