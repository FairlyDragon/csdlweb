import { useState, useEffect } from "react";
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

  const fetchShipperDetails = async () => {
    try {
      const data = await ShipperService.getShipperById(id);
      setShipperDetails(data);
    } catch (error) {
      console.error("Error fetching shipper details:", error);
    }
  };

  const fetchShipperHistory = async () => {
    try {
      const history = await ShipperService.getShipperHistory(id);
      setShipperHistory(history);
    } catch (error) {
      console.error("Error fetching shipper history:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([fetchShipperDetails(), fetchShipperHistory()]).finally(() =>
        setLoading(false)
      );
    }
  }, [id]);

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
          sx={{ color: "text.secondary" }}
        >
          Back to Shippers
  Paper,
  InputAdornment,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const EditShipper = ({ open, shipper, onClose, onSave, onDelete }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    shipper_id: "",
    name: "",
    phone_number: "",
    email: "",
    password: "",
    address: "",
    date_of_birth: null,
    gender: "Male",
    avatar_url: "",
    account_status: true,
  });

  // Thêm state để preview ảnh
  const [imagePreview, setImagePreview] = useState("");

  // Thêm mock data cho order history
  const orderHistory = [
    {
      order_id: "00001",
      date: "04 Jan 2024",
      food: "Fried Rice",
      payment: "$10",
    },
    // ... thêm các đơn hàng khác
  ];

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (shipper) {
      setFormData({
        ...shipper,
        email: shipper.email || "",
        total_amount: shipper.total_amount || 0,
        date_of_birth: shipper.date_of_birth
          ? new Date(shipper.date_of_birth)
          : null,
        address: shipper.address,
        account_status: shipper.account_status,
      });
    }
  }, [shipper]);

  // Xử lý upload file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          avatar_url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý xóa ảnh
  const handleDeleteImage = () => {
    setImagePreview("https://example.com/default-avatar.jpg");
    setFormData((prev) => ({
      ...prev,
      avatar_url: "https://example.com/default-avatar.jpg",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Hàm xử lý khi lưu
  const handleSave = () => {
    const updatedShipper = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? new Date(formData.date_of_birth).toISOString()
        : null,
      created_at: formData.created_at || new Date().toISOString(),
    };
    onSave(updatedShipper);
    onClose();
  };

  if (!shipper) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px" },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Shipper Details</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Shipper Information Form */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shipper Information
          </Typography>
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr" }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone Number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              fullWidth
            />
            <TextField
              fullWidth
              label="Total Amount"
              name="total_amount"
              type="number"
              value={formData.total_amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_amount: parseFloat(e.target.value),
                })
              }
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₫</InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.account_status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      account_status: e.target.checked,
                    }))
                  }
                  color="primary"
                />
              }
              label="Account Status"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Date of Birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) =>
                setFormData({ ...formData, date_of_birth: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData.gender}
                label="Gender"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
          </Box>

          {/* Avatar section with consistent spacing */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel
              shrink
              sx={{
                bgcolor: "white",
                px: 0.5,
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "12px",
              }}
            >
              Avatar
            </InputLabel>
            <Box
              sx={{
                mt: 3,
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: 1,
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 3,
                justifyContent: "center",
                maxWidth: "400px",
                margin: "0 auto",
                "&:hover": {
                  borderColor: "#000",
                },
              }}
            >
              <Box
                component="img"
                src={imagePreview}
                alt="Avatar"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteImage}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Box>

        {/* Order History Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order History
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Food</TableCell>
                  <TableCell>Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.food}</TableCell>
                    <TableCell>{order.payment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onDelete(shipper.shipper_id)}
          variant="contained"
          color="error"
        >
          Delete Shipper
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: "none" }}
      />
    </Dialog>
  );
};

EditShipper.propTypes = {
  open: PropTypes.bool.isRequired,
  shipper: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditShipper;
