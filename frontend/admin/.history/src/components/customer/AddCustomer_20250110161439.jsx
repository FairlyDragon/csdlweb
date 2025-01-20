import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

const AddCustomer = ({ open, onClose, onAdd, lastCustomerId }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!formData.email || !formData.password) {
      return;
    }

    // Tạo ID mới bằng cách tăng lastCustomerId lên 1
    const newId = String(Number(lastCustomerId) + 1).padStart(5, "0");

    const newCustomer = {
      customer_id: newId,
      name: "", // Lấy phần trước @ làm tên mặc định
      email: formData.email,
      password: formData.password,
      phone_number: "",
      address: "",
      created_at: new Date().toISOString(), // Ngày hiện tại
      date_of_birth: new Date().toISOString(), // Ngày hiện tại để tính tuổi = 0
      gender: "Male",
      avatar_url: "https://example.com/default-avatar.jpg",
    };

    onAdd(newCustomer);
    onClose();
    setFormData({ email: "", password: "" });
  };

  // Đóng form và reset data
  const handleClose = () => {
    setFormData({ email: "", password: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Customer Account</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: "400px",
            mt: 2,
          }}
        >
          <TextField
            label="Email"
            type="email" // Thêm type email để validate
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddCustomer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  lastCustomerId: PropTypes.string.isRequired,
};

export default AddCustomer;
