import { useState, useEffect, useCallback } from "react";
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
  const [customerHistory, setCustomerHistory] = useState({
    orders: [],
    stats: { total_order_quantity: 0, total_purchase: 0 },
  });
  const [loading, setLoading] = useState(true);

  const fetchCustomerDetails = useCallback(async () => {
    try {
      const data = await CustomerService.getCustomerById(id);
      console.log("Customer details:", data);
      setCustomerDetails(data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  }, [id]);

  const fetchCustomerHistory = useCallback(async () => {
    try {
      const history = await CustomerService.getCustomerHistory(id);
      console.log("Customer history:", history);

      const orders = history.filter((item) => item.order_id);
      const stats = history.find((item) => item.total_order_quantity) || {
        total_order_quantity: 0,
        total_purchase: 0,
      };

      setCustomerHistory({
        orders: orders,
        stats: stats,
      });
    } catch (error) {
      console.error("Error fetching customer history:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCustomerDetails();
      fetchCustomerHistory();
    }
  }, [id, fetchCustomerDetails, fetchCustomerHistory]);

  const handleDelete = async () => {
    try {
      await CustomerService.deleteCustomer(id);
      navigate("/admin/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const updatePayload = {
        ...customerDetails,
        ...updatedData,
      };
      await CustomerService.updateCustomer(updatePayload);
      fetchCustomerDetails(); // Refresh data after update
    } catch (error) {
      console.error("Error updating customer:", error);
    }
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
          onClick={() => navigate("/admin/customers")}
          sx={{ color: "text.secondary" }}
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
        <Typography variant="h6">#{customerDetails?.customer_id}</Typography>
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
          onClick={() => handleUpdate(customerDetails)}
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
              {customerDetails?.name || "N/A"}
            </Typography>
            <Typography color="textSecondary">
              {customerDetails?.email || "N/A"}
            </Typography>
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
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.address || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.phone_number || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Gender
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.gender || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Date of Birth
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.date_of_birth
                ? new Date(customerDetails.date_of_birth).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Created at
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {customerDetails?.created_at
                ? new Date(customerDetails.created_at).toLocaleDateString()
                : "N/A"}
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
              <Box
                component="span"
                sx={{ color: "#4dabf7", fontSize: "24px", width: "24px" }}
              >
                ≡
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ flex: 1, textAlign: "center", pr: 3 }}
              >
                Total Order
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mt: 1, fontSize: "2rem" }}
            >
              {customerHistory.stats.total_order_quantity}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, width: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                component="span"
                sx={{ color: "#fab005", fontSize: "24px", width: "24px" }}
              >
                $
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ flex: 1, textAlign: "center", pr: 3 }}
              >
                Total Purchase
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mt: 1, fontSize: "2rem" }}
            >
              ${customerHistory.stats.total_purchase}
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
              {customerHistory.orders.map((order) => (
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
