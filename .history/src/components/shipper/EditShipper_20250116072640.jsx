import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShipperService from "../../services/ShipperService";
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

export default function EditShipper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipperDetails, setShipperDetails] = useState(null);
  const [shipperHistory, setShipperHistory] = useState({
    orders: [],
    stats: {
      total_order_quantity: 0,
      total_profit: 0,
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

  const fetchShipperDetails = useCallback(async () => {
    try {
      const data = await ShipperService.getShipperById(id);
      setShipperDetails(data);
    } catch (error) {
      console.error("Error fetching shipper details:", error);
    }
  }, [id]);

  const fetchShipperHistory = useCallback(async () => {
    try {
      const history = await ShipperService.getShipperHistory(id);
      setShipperHistory(history);
    } catch (error) {
      console.error("Error fetching shipper history:", error);
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([fetchShipperDetails(), fetchShipperHistory()]).finally(() =>
        setLoading(false)
      );
    }
  }, [id, fetchShipperDetails, fetchShipperHistory]);

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await ShipperService.deleteShipper(id);
      setOpenDeleteDialog(false);
      navigate("/admin/shippers");
    } catch (error) {
      console.error("Error deleting shipper:", error);
    }
  };

  const handleOpenEdit = () => {
    setEditFormData({
      shipper_id: shipperDetails.shipper_id,
      name: shipperDetails.name,
      email: shipperDetails.email,
      phone_number: shipperDetails.phone_number,
      address: shipperDetails.address,
      gender: shipperDetails.gender,
      date_of_birth: shipperDetails.date_of_birth,
      total_amount: shipperDetails.total_amount,
      account_status: shipperDetails.account_status,
    });
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      await ShipperService.updateShipper(editFormData);
      setOpenEditDialog(false);
      fetchShipperDetails();
    } catch (error) {
      console.error("Error updating shipper:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          bgcolor: "#E8FFF3",
          color: "#00B69B",
        };
      case "failed":
        return {
          bgcolor: "#FFE7D9",
          color: "#B72136",
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
          onClick={() => navigate("/admin/shippers")}
          sx={{ color: "text.secondary" }}
        >
          Back to Shippers
        </Button>
      </Box>

      {/* Shipper ID Banner */}
      <Box
        sx={{
          bgcolor: "#E3F2FD",
          p: 2,
          borderRadius: "4px 4px 0 0",
          background: "linear-gradient(to right, #E3F2FD, #FFF8E1)",
        }}
      >
        <Typography variant="h6">#{shipperDetails?.shipper_id}</Typography>
      </Box>

      {/* Shipper Info Card */}
      <Paper sx={{ p: 3, mb: 4, position: "relative" }}>
        {/* Edit Button */}
        <Button
          variant="contained"
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

        {/* Shipper Basic Info */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            src={shipperDetails?.avatar_url}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
              <Typography variant="h6">
                {shipperDetails?.name || "N/A"}
              </Typography>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: shipperDetails?.account_status === 'active' ? '#E8FFF3' : '#FFE7D9',
                  color: shipperDetails?.account_status === 'active' ? '#00B69B' : '#B72136',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'currentColor',
                    mr: 0.75,
                  }}
                />
                {shipperDetails?.account_status}
              </Box>
            </Box>
            <Typography color="textSecondary">
              {shipperDetails?.email || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Shipper Details Grid */}
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
              {shipperDetails?.address || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {shipperDetails?.phone_number || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Gender
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {shipperDetails?.gender || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Date of Birth
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {shipperDetails?.date_of_birth
                ? new Date(shipperDetails.date_of_birth).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Created at
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              {shipperDetails?.created_at
                ? new Date(shipperDetails.created_at).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Total Amount
            </Typography>
            <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 1 }}>
              ${shipperDetails?.total_amount || "0"}
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

      {/* Order History */}
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
              {shipperHistory?.stats?.total_order_quantity || 0}
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
                Total Profit
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", mt: 1, fontSize: "2rem" }}
            >
              ${shipperHistory?.stats?.total_profit || 0}
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
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipperHistory?.orders?.map((order) => (
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
                  <TableCell align="center">
                    $
                    {order.order_items?.reduce(
                      (sum, item) => sum + item.subtotal,
                      0
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        ...getStatusStyle(order.delivery_status),
                      }}
                    >
                      {order.delivery_status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Dialog */}
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
            src={shipperDetails?.avatar_url}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit Shipper
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update shipper information
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "grid", gap: 3, pt: 1 }}>
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
                label="Total Amount"
                value={editFormData.total_amount || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    total_amount: e.target.value,
                  })
                }
              />
            </Box>

            <TextField
              label="Address"
              value={editFormData.address || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, address: e.target.value })
              }
              multiline
              rows={3}
            />

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
                select
                label="Status"
                value={editFormData.account_status || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    account_status: e.target.value,
                  })
                }
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Box>

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
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: "1px solid #E5E7EB", gap: 1 }}>
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

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this shipper? This action cannot be
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
