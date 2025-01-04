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
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
  const [orders, setOrders] = useState([
    {
      order_id: "OD001",
      order_date: "2024-01-04",
      total_amount: 150000,
      payment_method: "Cash",
      status: "Completed"
    },
    // ... more orders
  ]);

  const [showPassword, setShowPassword] = useState(false);

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Order History - ${customer.name}`, 14, 15);
    
    const tableColumn = ["Order ID", "Date", "Amount", "Payment", "Status"];
    const tableRows = orders.map(order => [
      order.order_id,
      order.order_date,
      `${order.total_amount.toLocaleString()}đ`,
      order.payment_method,
      order.status
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`order_history_${customer.customer_id}.pdf`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, `order_history_${customer.customer_id}.xlsx`);
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

        {/* Avatar and Password Section */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          {/* Avatar Box */}
          <Box sx={{ flex: 1 }}>
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
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={imagePreview}
                alt="Avatar"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
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

          {/* Password Field */}
          <Box sx={{ flex: 1 }}>
            <Typography
              component="label"
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "12px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
        </Box>

        {/* Order History Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2 
          }}>
            <Typography variant="h6">Order History</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={exportToPDF}
                size="small"
              >
                PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={exportToExcel}
                size="small"
              >
                Excel
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ border: '1px solid rgba(0,0,0,0.1)' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#F4F6F8' }}>
                  <TableCell sx={{ fontWeight: 600 }}>ORDER ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>DATE</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>AMOUNT</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>PAYMENT</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.order_date}</TableCell>
                    <TableCell>{order.total_amount.toLocaleString()}đ</TableCell>
                    <TableCell>{order.payment_method}</TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status}
                        color={order.status === 'Completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
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
