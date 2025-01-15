import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const Profile = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      address: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      updatedAt: ''
    });
  
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // Thêm state loading
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
    });
  
    useEffect(() => {
      fetchUserProfile();
    }, []);
  
    const fetchUserProfile = async () => {
      try {
        setLoading(true); // Set loading khi bắt đầu fetch
        const user = JSON.parse(localStorage.getItem('user'));
        
        setFormData(prev => ({
          ...prev,
          email: user?.email || ''
        }));
  
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`
          }
        });
  
        setFormData(prev => ({
          ...response.data,
          email: user?.email || response.data.email
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load profile data',
          severity: 'error'
        });
      } finally {
        setLoading(false); // Set loading về false khi hoàn thành
      }
    };
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      
      await axios.put(
        `${API_URL}/api/user/profile`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success'
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  if (loading && !isEditing) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
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
              onClick={handleEdit}
              disabled={loading}
              sx={{
                bgcolor: isEditing ? '#4caf50' : '#4285f4',
                '&:hover': {
                  bgcolor: isEditing ? '#45a049' : '#3367d6'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 
                isEditing ? 'Save' : 'Edit'}
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                error={!!errors.fullName}
                helperText={errors.fullName}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                disabled
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                error={!!errors.address}
                helperText={errors.address}
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
                disabled={!isEditing}
                error={!!errors.phone}
                helperText={errors.phone}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Updated"
                name="updatedAt"
                value={formData.updatedAt ? 
                  new Date(formData.updatedAt).toLocaleString() : ''}
                disabled
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Profile;