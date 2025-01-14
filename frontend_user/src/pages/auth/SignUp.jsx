import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import authService from '../../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    address: '',
    gender: 'male',
    date_of_birth: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Thêm hàm handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log dữ liệu trước khi gửi
    console.log("Form Data:", formData);

    if (formData.password !== formData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match',
        severity: 'error'
      });
      return;
    }

    try {
      // Log request
      console.log("Sending signup request...");
      
      await authService.signup(formData);
      
      // Log success
      console.log("Signup successful!");
      
      setSnackbar({
        open: true,
        message: 'Registration successful! Please sign in.',
        severity: 'success'
      });
      setTimeout(() => navigate('/auth/signin'), 1500);
    } catch (error) {
      // Log error
      console.error("Signup error:", error);
      
      const errorMessage = typeof error === 'string' ? error : 
                         error.message || 
                         error.response?.data?.detail || 
                         'Registration failed';
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    }
};

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Account
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join us and start ordering your favorite food
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name="phone_number"
              label="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name="gender"
              select
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </TextField>

            <TextField
              fullWidth
              name="date_of_birth"
              type="date"
              label="Date of Birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 2,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Sign Up
            </Button>

            <Typography align="center">
              Already have an account?{' '}
              <Link
                component="button"
                variant="body1"
                onClick={() => navigate('/auth/signin')}
                sx={{ textDecoration: 'none' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;