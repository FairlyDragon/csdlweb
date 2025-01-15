import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  MenuItem
} from '@mui/material';
import Header from '../components/Header';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: 'Nguyen Van A',
    email: 'nguyenvana@gmail.com',
    address: '123 Nguyen Trai, Thanh Xuan, Ha Noi',
    phone: '0987654321',
    gender: 'female',
    dateOfBirth: '2001/07/24',
    createdAt: '25/12/2023'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Account Details
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Verify and edit your details
        </Typography>

        <Box
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: '#f5f5f5',
                color: '#666'
              }}
            >
              {formData.fullName?.charAt(0)}
            </Avatar>
            <Box sx={{ ml: 2, flex: 1 }}>
              <Typography variant="h6">{formData.fullName}</Typography>
              <Typography color="text.secondary">{formData.email}</Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#4285f4',
                '&:hover': {
                  bgcolor: '#3367d6'
                }
              }}
            >
              Edit
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Created At"
                name="createdAt"
                value={formData.createdAt}
                disabled
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;