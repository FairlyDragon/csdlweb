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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post('/auth/signup', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        username: formData.username
      });

      if (response.data.detail === "User created successfully") {
        // Hiển thị thông báo thành công
        setError('');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer'
        });

        // Chuyển hướng sang trang login sau 2 giây
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
      setError(err.response?.data?.detail || 'Failed to create account');
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

      {/* Thêm thông báo thành công */}
      {loading && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Account created successfully! Redirecting to login page...
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