import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
// Import MUI Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up:', formData);
  };

  return (
    <Box>
      <Header />
      
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Create Account
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join us and start ordering your favorite food
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* Name Field */}
            <TextField
      fullWidth
      name="name"
      label="Full Name"
      value={formData.name}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
        )
      }}
      sx={{ mb: 3 }}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Box component="img" src={EmailIcon} alt="" sx={{ mr: 1, width: 24 }} />
                )
              }}
              sx={{ mb: 3 }}
            />

            {/* Password Fields */}
            <TextField
              fullWidth
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Box component="img" src={PasswordIcon} alt="" sx={{ mr: 1, width: 24 }} />
                )
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Box component="img" src={PasswordIcon} alt="" sx={{ mr: 1, width: 24 }} />
                )
              }}
              sx={{ mb: 4 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'primary.main',
                color: 'text.primary',
                mb: 2,
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              Sign Up
            </Button>

            {/* Sign In Link */}
            <Typography align="center">
              Already have an account?{' '}
              <Link
                component="button"
                variant="body1"
                onClick={() => navigate('/auth/signin')}
                sx={{ color: 'primary.main' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;