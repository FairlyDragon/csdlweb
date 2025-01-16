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
import { format } from "date-fns";

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const buttonStyles = {
    minWidth: "120px",
    height: "40px",
    borderRadius: "8px",
    textTransform: "none",
  };

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

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await CustomerService.deleteCustomer(id);
      setOpenDeleteDialog(false);
      navigate("/admin/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
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

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          bgcolor: "#E8FFF3",
          color: "#00B69B",
        };
      case "canceled":
        return {
          bgcolor: "#FFE7D9",
          color: "#B72136",
        };
      case "rejected":
        return {
          bgcolor: "#FFF7CD",
          color: "#B78103",
        };
      default:
        return {
          bgcolor: "#E8FFF3",
          color: "#00B69B",
        };
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
            ...buttonStyles,
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "#10B981",
            "&:hover": {
              bgcolor: "#059669",
            },
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
              Age
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {calculateAge(customerDetails?.date_of_birth)} years old
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            sx={{
              ...buttonStyles,
            }}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
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
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">ITEMS</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerHistory?.orders?.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell align="center">{order.order_id}</TableCell>
                  <TableCell align="center">
                    {format(new Date(order.order_date), "HH:mm:ss dd MMM yyyy")}
                  </TableCell>
                  <TableCell align="center">
                    {order.order_items?.map((item, index) => (
                      <div key={index}>x{item.quantity}</div>
                    ))}
                  </TableCell>
                  <TableCell align="center">${order.payment_amount}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        ...getStatusStyle(order.order_status),
                      }}
                    >
                      {order.order_status}
                    </Box>
                  </TableCell>
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
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderBottom: "1px solid #E5E7EB",
          }}
        >
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
          <Box sx={{ display: "grid", gap: 3, pt: 1 }}>
            {/* Name và Email */}
            <TextField
              label="Name"
              value={editFormData.name || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Email"
              value={editFormData.email || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
              fullWidth
            />

            {/* Phone và Age trong một grid 2 cột */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
            >
              <TextField
                label="Phone"
                value={editFormData.phone_number || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    phone_number: e.target.value,
                  })
                }
              />
              <TextField
                label="Age"
                value={calculateAge(editFormData.date_of_birth)}
                disabled
                sx={{ bgcolor: "#f5f5f5" }}
              />
            </Box>

            {/* Address */}
            <TextField
              label="Address"
              value={editFormData.address || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, address: e.target.value })
              }
              multiline
              rows={3}
            />

            {/* Gender và Date of Birth trong một grid 2 cột */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
            >
              <TextField
                select
                label="Gender"
                value={editFormData.gender || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, gender: e.target.value })
                }
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>

              <TextField
                type="date"
                label="Date of Birth"
                value={editFormData.date_of_birth?.split("T")[0] || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    date_of_birth: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            borderTop: "1px solid #E5E7EB",
            gap: 1,
          }}
        >
          <Button
            onClick={() => setOpenEditDialog(false)}
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              minWidth: 100,
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
                bgcolor: "#059669",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this customer? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              color: "text.secondary",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
