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
      const response = await ShipperService.getShipperHistory(id);
      const orders = response.slice(0, -1);
      const stats = response[response.length - 1];

      setShipperHistory({
        orders: orders.map((order) => ({
          ...order,
          items: order.order_items.map((item) => ({
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        })),
        stats: {
          total_order_quantity: stats.total_order_quantity,
          total_profit: stats.total_profit,
        },
      });
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
          sx={{
            color: "#637381",
            "&:hover": {
              bgcolor: "transparent",
              color: "#212B36",
            },
          }}
        >
          Back to Shippers
        </Button>
      </Box>

      {/* Shipper ID Banner */}
      <Box
        sx={{
          bgcolor: "#F4F6F8",
          p: 2,
          borderRadius: "8px 8px 0 0",
          position: "relative",
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "#637381" }}>
          #{shipperDetails?.shipper_id}
        </Typography>

        <Button
          variant="contained"
          color="error"
          sx={{
            ...buttonStyles,
            position: "absolute",
            top: 16,
            right: 152,
          }}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          sx={{
            ...buttonStyles,
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "#00AB55",
            "&:hover": {
              bgcolor: "#007B55",
            },
          }}
          onClick={handleOpenEdit}
        >
          Edit
        </Button>
      </Box>

      {/* Shipper Details */}
      <Paper sx={{ p: 3, mb: 3, position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            src={shipperDetails?.avatar_url}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" sx={{ color: "#212B36" }}>
              {shipperDetails?.name || "N/A"}
            </Typography>
            <Typography sx={{ color: "#637381" }}>
              {shipperDetails?.email}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
            "& .MuiTypography-subtitle2": {
              color: "#637381",
              mb: 1,
            },
            "& .MuiTypography-body1": {
              color: "#212B36",
            },
          }}
        >
          <Box>
            <Typography variant="subtitle2">Address</Typography>
            <Typography>{shipperDetails?.address || "N/A"}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Phone Number</Typography>
            <Typography>{shipperDetails?.phone_number || "N/A"}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Gender</Typography>
            <Typography>{shipperDetails?.gender || "N/A"}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Date of Birth</Typography>
            <Typography>
              {shipperDetails?.date_of_birth
                ? format(new Date(shipperDetails.date_of_birth), "dd MMM yyyy")
                : "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Total Amount</Typography>
            <Typography>${shipperDetails?.total_amount || "0"}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Created at</Typography>
            <Typography>
              {shipperDetails?.created_at
                ? format(new Date(shipperDetails.created_at), "dd MMM yyyy")
                : "N/A"}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Order History */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#212B36" }}>
          Order History
        </Typography>
        <Typography sx={{ color: "#637381" }}>
          Total Orders: {shipperHistory?.stats?.total_order_quantity || 0} |
          Total Profit: ${shipperHistory?.stats?.total_profit || 0}
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "white" }}>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Total</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Shipper</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 400,
              mt: 2,
            }}
          >
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
              bgcolor: "#00AB55",
              borderRadius: "8px",
              textTransform: "none",
              minWidth: 100,
              "&:hover": {
                bgcolor: "#007B55",
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
