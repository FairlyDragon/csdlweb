import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel 
} from '@mui/material';
import authService from '../../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.role) {
      setError('Please select a role');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Đăng ký
      await authService.signup({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        username: formData.email
      });

      // Đăng nhập và lấy role
      const loginResponse = await authService.login({
        username: formData.email,
        password: formData.password
      });

      console.log('Login response:', loginResponse); // Debug log

      // Kiểm tra role từ response
      const userRole = loginResponse.role;
      console.log('User role:', userRole); // Debug log

      // Điều hướng dựa trên role
      if (userRole === 'shipper') {
        navigate('/shipper/waiting');
      } else {
        navigate('/menu');
      }

    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="shipper">Shipper</MenuItem>
            </Select>
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
                bgcolor: '#bb1818'
              }
            }}
          >
            Sign Up
          </Button>

          <Button
            fullWidth
            onClick={() => navigate('/auth/login')}
            sx={{ color: '#dd1d1d' }}
          >
            Already have an account? Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;