import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
// Import MUI Icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in:', formData);
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
            Welcome Back
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to continue ordering
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
          <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
        )
      }}
      sx={{ mb: 3 }}
    />

    <TextField
      fullWidth
      name="password"
      type="password"
      label="Password"
      value={formData.password}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
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
              Sign In
            </Button>

            {/* Sign Up Link */}
            <Typography align="center">
              Don't have an account?{' '}
              <Link
                component="button"
                variant="body1"
                onClick={() => navigate('/auth/signup')}
                sx={{ color: 'primary.main' }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;