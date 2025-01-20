import { useState, useEffect } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditCustomer = ({ open, customer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customer_id: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    gender: "",
  });

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
          ? new Date(customer.date_of_birth).toISOString().split('T')[0]
          : "",
        gender: customer.gender || "",
      });
    }
  }, [customer]);

  const handleSave = () => {
    onSave({
      ...formData,
      date_of_birth: formData.date_of_birth 
        ? new Date(formData.date_of_birth).toISOString()
        : null
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "600px",
        },
      }}
    >
      <DialogTitle sx={{ p: "24px", pb: "16px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
            Edit Customer
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: "24px", pt: 0 }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <TextField
            label="Phone Number"
            fullWidth
            value={formData.phone_number}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone_number: e.target.value }))
            }
          />

          <TextField
            label="Address"
            fullWidth
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
          />

          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.date_of_birth}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date_of_birth: e.target.value }))
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              label="Gender"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#637381",
            "&:hover": { bgcolor: "rgba(99, 115, 129, 0.08)" },
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            bgcolor: "#212B36",
            color: "white",
            "&:hover": { bgcolor: "#454F5B" },
            textTransform: "none",
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditCustomer.propTypes = {
  open: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    customer_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string,
    gender: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditCustomer;
