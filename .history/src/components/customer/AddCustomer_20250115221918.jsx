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

const AddCustomer = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CustomerService.createCustomer(formData);
      onClose();
      // Refresh customer list
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
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
};

export default AddCustomer;
