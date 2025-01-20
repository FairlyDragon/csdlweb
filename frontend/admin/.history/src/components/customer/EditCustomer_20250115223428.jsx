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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerHistory, setCustomerHistory] = useState({
    orders: [],
    stats: {
      total_order_quantity: 0,
      total_purchase: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const fetchCustomerDetails = useCallback(async () => {
    try {
      const data = await CustomerService.getCustomerById(id);
      setCustomerDetails(data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  }, [id]);

  const fetchCustomerHistory = useCallback(async () => {
    try {
      const history = await CustomerService.getCustomerHistory(id);
      setCustomerHistory(history);
    } catch (error) {
      console.error("Error fetching customer history:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([fetchCustomerDetails(), fetchCustomerHistory()]).finally(
        () => setLoading(false)
      );
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
      await CustomerService.updateCustomer(updatedData);
      fetchCustomerDetails();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleOpenEdit = () => {
    setEditFormData({
      customer_id: customerDetails.customer_id,
      name: customerDetails.name,
      email: customerDetails.email,
      phone_number: customerDetails.phone_number,
      address: customerDetails.address,
      gender: customerDetails.gender,
      date_of_birth: customerDetails.date_of_birth,
    });
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      await CustomerService.updateCustomer(editFormData);
      setOpenEditDialog(false);
      fetchCustomerDetails();
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
          onClick={handleOpenEdit}
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
              {customerHistory?.stats?.total_order_quantity || 0}
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
              ${customerHistory?.stats?.total_purchase || 0}
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
              {customerHistory?.orders?.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>
                    {new Date(order.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.order_items?.map((item, index) => (
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

      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            bgcolor: "#FFFFFF",
          }
        }}
      >
        <DialogTitle sx={{ 
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid #E5E7EB'
        }}>
          <Avatar
            src={customerDetails?.avatar_url}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit Customer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update customer information
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            pt: 1
          }}>
            <TextField
              label="Name"
              value={editFormData.name || ""}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              fullWidth
              sx={{
                gridColumn: "1 / -1",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                }
              }}
            />

            <TextField
              label="Email"
              value={editFormData.email || ""}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                }
              }}
            />

            <TextField
              label="Phone"
              value={editFormData.phone_number || ""}
              onChange={(e) => setEditFormData({ ...editFormData, phone_number: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                }
              }}
            />

            <TextField
              label="Address"
              value={editFormData.address || ""}
              onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
              multiline
              rows={3}
              sx={{
                gridColumn: "1 / -1",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                }
              }}
            />

            <TextField
              select
              label="Gender"
              value={editFormData.gender || ""}
              onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                }
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

            <TextField
              type="date"
              label="Date of Birth"
              value={editFormData.date_of_birth?.split("T")[0] || ""}
              onChange={(e) => setEditFormData({ ...editFormData, date_of_birth: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          p: 3,
          borderTop: '1px solid #E5E7EB',
          gap: 1
        }}>
          <Button 
            onClick={() => setOpenEditDialog(false)}
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              minWidth: 100
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit}
            variant="contained"
            sx={{
              bgcolor: "#10B981",
              borderRadius: "8px",
              textTransform: "none",
              minWidth: 100,
              "&:hover": {
                bgcolor: "#059669"
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
