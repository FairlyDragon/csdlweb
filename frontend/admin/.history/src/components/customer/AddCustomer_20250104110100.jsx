import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const AddCustomer = ({ open, onClose, onAdd, lastCustomerId }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tạo ID mới bằng cách tăng lastCustomerId lên 1
    const newId = String(Number(lastCustomerId) + 1).padStart(5, '0');
    
    const newCustomer = {
      customer_id: newId,
      name: '',
      email: formData.email,
      password: formData.password,
      phone_number: '',
      address: '',
      created_at: new Date().toISOString(),
      date_of_birth: new Date().toISOString(),
      gender: 'Male',
    };

    onAdd(newCustomer);
    onClose();
    setFormData({ email: '', password: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Shipper Account</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: '400px',
            mt: 2
          }}
        >
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomer;
