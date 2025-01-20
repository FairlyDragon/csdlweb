import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container,
  Alert,
  Snackbar,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import authService from '../../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
    setFormData(prev => ({
      ...prev,
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
      const response = await authService.signup({
        email: formData.email,
        password: formData.password
      });
  
      console.log('Signup response:', response);
  
      setSnackbar({
        open: true,
        message: 'Registration successful!',
        severity: 'success'
      });
  
      setTimeout(() => navigate('/auth/signin'), 1500);
        
    } catch (error) {
      console.error('Signup error:', error);
      
      const errorMessage = error.detail || error.message || 'Registration failed';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #eee' }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
            Create Account
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Join us and start ordering your favorite food
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>
                Username<span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                required
                fullWidth
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                sx={{ bgcolor: '#f5f5f5' }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>
                Email<span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                required
                fullWidth
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                sx={{ bgcolor: '#f5f5f5' }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>
                Password<span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                sx={{ bgcolor: '#f5f5f5' }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1 }}>
                Confirm Password<span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{ bgcolor: '#f5f5f5' }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                py: 1.5,
                bgcolor: '#dd1d1d',
                '&:hover': {
                  bgcolor: '#bb1818'
                }
              }}
            >
              SIGN UP
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body1">
                Already have an account?{' '}
                <Typography
                  component="span"
                  sx={{
                    color: '#dd1d1d',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={() => navigate('/auth/signin')}
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
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

export default SignUp;