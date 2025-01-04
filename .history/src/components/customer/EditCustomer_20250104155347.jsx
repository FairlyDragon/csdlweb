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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const EditCustomer = ({ open, customer, onClose, onSave, onDelete }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    customer_id: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    gender: "",
    created_at: "",
    image_url: "",
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

  useEffect(() => {
    if (customer) {
      setFormData({
        customer_id: customer.customer_id || "",
        name: customer.name || "",
        email: customer.email || "",
        password: customer.password || "",
        phone_number: customer.phone_number || "",
        address: customer.address || "",
        date_of_birth: customer.date_of_birth
          ? new Date(customer.date_of_birth).toISOString().split("T")[0]
          : "",
        gender: customer.gender || "",
        created_at: customer.created_at || "",
        image_url:
          customer.image_url || "https://example.com/default-avatar.jpg",
      });
      setImagePreview(
        customer.image_url || "https://example.com/default-avatar.jpg"
      );
    }
  }, [customer]);

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

  // Hàm xử lý khi lưu
  const handleSave = () => {
    const updatedCustomer = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? new Date(formData.date_of_birth).toISOString()
        : null,
      created_at: formData.created_at || new Date().toISOString(),
    };
    onSave(updatedCustomer);
    onClose();
  };

  if (!customer) return null;

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
          <Typography variant="h6">Customer Details</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Customer Information Form First */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Customer Information
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
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
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
          </Box>
        </Box>

        {/* Avatar Upload Section */}
        <Box sx={{ mb: 2 }}>
          <Typography
            component="label"
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "12px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Avatar
          </Typography>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: 1,
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 3,
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={imagePreview}
              alt="Avatar"
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Avatar
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteImage}
              >
                Remove
              </Button>
            </Box>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </Box>
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
          onClick={() => onDelete(customer.customer_id)}
          variant="contained"
          color="error"
        >
          Delete Customer
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditCustomer.propTypes = {
  open: PropTypes.bool.isRequired,
  customer: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditCustomer;
