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
import CustomerService from "../../services/CustomerService";

const AddCustomer = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "N/A",
    avatar_url: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg",
    address: "N/A",
    phone_number: "N/A",
    gender: "N/A",
    date_of_birth: null
  });

  // Thêm state quản lý lỗi
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Validate form
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Validate email
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra validation trước khi submit
    if (!validateForm()) return;

    try {
      await CustomerService.createCustomer(formData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  // Reset errors khi đóng dialog
  const handleClose = () => {
    setFormData({ email: "", password: "" });
    setErrors({ email: "", password: "" });
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
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              // Clear error when user types
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              // Clear error when user types
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
            error={Boolean(errors.password)}
            helperText={errors.password}
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
};

export default AddCustomer;
