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

const AddShipper = ({ open, onClose, onAdd, lastShipperId }) => {
  const [formData, setFormData] = useState({
    shipper_id: "",
    name: "",
    phone_number: "",
    email: "",
    password: "",
    updated_address: "",
    date_of_birth: null,
    gender: "Male",
    avatar_url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!formData.username || !formData.password) {
      return;
    }

    // Tạo ID mới bằng cách tăng lastCustomerId lên 1
    const newId = String(Number(lastShipperId) + 1).padStart(5, "0");

    const newShipper = {
      shipper_id: newId,
      name: "",
      username: formData.username,
      password: formData.password,
      phone_number: "",
      total_amount: 0.0,
      updated_address: "",
      created_at: new Date().toISOString(),
      date_of_birth: new Date().toISOString(),
      gender: "Male",
      avatar_url: "https://example.com/default-avatar.jpg",
    };

    onAdd(newShipper);
    onClose();
    setFormData({ username: "", password: "" });
  };

  // Đóng form và reset data
  const handleClose = () => {
    setFormData({ username: "", password: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Shipper Account</DialogTitle>
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
            name="email"
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

AddShipper.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  lastShipperId: PropTypes.string.isRequired,
};

export default AddShipper;
