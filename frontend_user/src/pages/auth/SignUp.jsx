import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Log request data
      console.log('Sending signup data:', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        id: formData.username
      });

      const response = await axios.post('/auth/signup', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        id: formData.username
      });

      console.log('Signup response:', response);

      if (response.data) {
        setSuccess('Account created successfully!');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer'
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/auth/login', { 
            state: { 
              email: formData.email,
              message: 'Account created successfully! Please login with your credentials.' 
            }
          });
        }, 2000);
      }

    } catch (err) {
      console.error('Signup error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.detail || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      maxWidth: 400,
      mx: 'auto',
      mt: 8,
      p: 3,
      boxShadow: 3,
      borderRadius: 2,
      bgcolor: 'background.paper'
    }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Account
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Join us and start ordering your favorite food
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
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
          helperText="Password must be at least 6 characters"
        />

        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          required
        />

        <RadioGroup
          row
          name="role"
          value={formData.role}
          onChange={handleChange}
          sx={{ my: 2, justifyContent: 'center' }}
        >
          <FormControlLabel 
            value="customer" 
            control={<Radio />} 
            label="Customer" 
          />
          <FormControlLabel 
            value="shipper" 
            control={<Radio />} 
            label="Shipper" 
          />
        </RadioGroup>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ 
            mt: 2,
            bgcolor: '#dd1d1d',
            '&:hover': {
              bgcolor: '#bb0f0f'
            }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'SIGN UP'}
        </Button>

        <Button
          fullWidth
          onClick={() => navigate('/auth/login')}
          sx={{ mt: 1 }}
        >
          Already have an account? Log In
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;