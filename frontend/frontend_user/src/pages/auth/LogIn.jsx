import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    try {
      const response = await authService.login({
        username: formData.email,
        password: formData.password
      });

      if (response.access_token) {
        // Store user data
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          token: response.access_token,
          role: response.role,
          id: response.id
        }));

        setSnackbar({
          open: true,
          message: 'Login successful!',
          severity: 'success'
        });

        // Redirect based on role
        setTimeout(() => {
          if (response.role === 'shipper') {
            navigate('/shipper/waiting');
          } else {
            navigate('/menu');
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || 'Login failed. Please check your credentials.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f5f5f5'
    }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 600,
            color: '#333'
          }}
        >
          Welcome Back
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ 
            py: 1.5,
            mb: 2,
            bgcolor: '#dd1d1d',
            '&:hover': {
              bgcolor: '#bb0f0f'
            },
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          Log In
        </Button>

        <Box sx={{ 
          textAlign: 'center',
          mt: 2 
        }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/auth/signup')}
              sx={{ 
                color: '#dd1d1d',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign Up
            </Link>
          </Typography>
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
      </Box>
    </Box>
  );
};

export default LogIn;