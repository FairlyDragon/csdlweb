import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Alert,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup // Make sure this is imported
} from '@mui/material';
import authService from '../../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // Basic validation
      if (!formData.email || !formData.password || !formData.confirmPassword) {
          setError('Please fill in all fields');
          return;
      }

      if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
      }

      const signupData = {
          email: formData.email,
          password: formData.password,
          role: formData.role
      };

      console.log('Attempting signup with:', signupData);

      const response = await authService.signup(signupData);
      
      console.log('Signup successful:', response);
      alert('Registration successful! Please login.');
      navigate('/auth/login');
      
  } catch (error) {
      console.error('Signup error details:', error);
      
      if (error.response?.status === 409) {
          setError('Email already exists');
      } else if (error.response?.data?.detail) {
          setError(error.response.data.detail);
      } else if (!error.response) {
          setError('Cannot connect to server. Please try again later.');
      } else {
          setError('Registration failed. Please try again.');
      }
  }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f5f5f5'
    }}>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            margin="normal"
            required
          />

          <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Select Role
            </Typography>
            <RadioGroup
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <FormControlLabel value="customer" control={<Radio />} label="Customer" />
              <FormControlLabel value="shipper" control={<Radio />} label="Shipper" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3,
              mb: 2,
              bgcolor: '#dd1d1d',
              '&:hover': {
                bgcolor: '#bb0f0f'
              }
            }}
          >
            Sign Up
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              onClick={() => navigate('/auth/login')}
              sx={{ 
                color: '#dd1d1d',
                '&:hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Already have an account? Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;