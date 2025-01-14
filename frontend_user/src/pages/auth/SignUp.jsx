import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import authService from '../../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match',
        severity: 'error'
      });
      return;
    }
  
    try {
      // Chỉ gửi email và password
      const signupData = {
        email: formData.email,
        password: formData.password
      };
      
      console.log("Sending signup request with data:", signupData);
      
      const response = await authService.signup(signupData);
      console.log("Signup response:", response);
      
      setSnackbar({
        open: true,
        message: 'Registration successful! Please sign in.',
        severity: 'success'
      });
      
      setTimeout(() => navigate('/auth/signin'), 1500);
    } catch (error) {
      console.error("Signup error:", error);
      
      // Xử lý message lỗi từ API
      let errorMessage = 'Registration failed';
      if (error.detail) {
        if (Array.isArray(error.detail)) {
          errorMessage = error.detail[0]?.msg || errorMessage;
        } else {
          errorMessage = error.detail;
        }
      }
      
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