import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { format } from "date-fns";

const EditShipper = ({ open, shipper, onClose, onSave, onDelete }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    shipper_id: "",
    name: "",
    phone_number: "",
    total_amount: 0.0,
    username: "",
    password: "",
    updated_address: "",
    created_at: "",
    date_of_birth: "",
    gender: "",
    image_url: "",
  });

  // Thêm state để preview ảnh
  const [imagePreview, setImagePreview] = useState("");

  // Thêm state để lưu orders
  const [orders, setOrders] = useState([]);
    },
    {
      order_id: "OD002",
      date: "2024-01-05",
      food: "Burger",
      payment: 120000,
      status: "Completed",
    },
    // ... more orders
  ]);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (shipper) {
      setFormData({
        shipper_id: shipper.shipper_id || "",
        name: shipper.name || "",
        phone_number: shipper.phone_number || "",
        total_amount: shipper.total_amount || 0.0,
        username: shipper.username || "",
        password: shipper.password || "",
        updated_address: shipper.updated_address || "",
        created_at: shipper.created_at || "",
        date_of_birth: shipper.date_of_birth
          ? new Date(shipper.date_of_birth).toISOString().split("T")[0]
          : "",
        gender: shipper.gender || "",
        image_url:
          shipper.image_url || "https://example.com/default-avatar.jpg",
      });
      setImagePreview(
        shipper.image_url || "https://example.com/default-avatar.jpg"
      );
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
          image_url: reader.result,
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
      image_url: "https://example.com/default-avatar.jpg",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Hàm tính total_amount theo ngày
  const calculateTotalAmountPerDay = () => {
    const today = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại

    const todayOrders = orders.filter((order) => {
      const orderDate = new Date(order.date).toISOString().split("T")[0];
      return orderDate === today && order.status === "Completed";
    });

    const totalAmount = todayOrders.reduce(
      (sum, order) => sum + order.payment,
      0
    );
    return totalAmount;
  };

  // Cập nhật total_amount khi có thay đổi trong orders
  useEffect(() => {
    const newTotalAmount = calculateTotalAmountPerDay();
    setFormData((prev) => ({
      ...prev,
      total_amount: newTotalAmount,
    }));
  }, [orders]);

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
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              fullWidth
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
              label="Total Amount"
              type="number"
              value={formData.total_amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_amount: parseFloat(e.target.value),
                })
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₫</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Address"
              value={formData.updated_address}
              onChange={(e) =>
                setFormData({ ...formData, updated_address: e.target.value })
              }
              fullWidth
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
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order History
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Food</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>
                      {format(new Date(order.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>{order.food}</TableCell>
                    <TableCell>{order.payment.toLocaleString()}đ</TableCell>
                    <TableCell>{order.status}</TableCell>
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
