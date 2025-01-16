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
import ShipperService from "../../services/ShipperService";

const AddShipper = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "N/A",
    avatar_url:
      "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg",
    address: "N/A",
    phone_number: "N/A",
    gender: "N/A",
    date_of_birth: null,
    account_status: "active",
    amount: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

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
    if (!validateForm()) return;

    try {
      const response = await ShipperService.createShipper({
        ...formData,
        account_status: 'active',
        total_amount: '0',
        created_at: new Date().toISOString()
      });

      onSuccess(response.data);
      handleClose();
    } catch (error) {
      console.error('Error creating shipper:', error);
    }
  };

  const handleClose = () => {
    setFormData({ email: "", password: "" });
    setErrors({ email: "", password: "" });
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
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
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
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
            error={Boolean(errors.password)}
            helperText={errors.password}
            required
            fullWidth
          />
          <TextField
            label="Amount"
            name="total_amount"
            value="0$"
            disabled
            sx={{ bgcolor: '#f5f5f5' }}
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
  onSuccess: PropTypes.func.isRequired,
};

export default AddShipper;
