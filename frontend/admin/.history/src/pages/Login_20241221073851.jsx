import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F8F9FD',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: '100%',
          p: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: '#1A1D1F',
            mb: 1,
          }}
        >
          Welcome back
        </Typography>
        
        <Typography
          sx={{
            color: '#6F767E',
            mb: 4,
          }}
        >
          Enter your credentials to access your account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: '#F4F4F4',
                '& fieldset': {
                  borderColor: '#E6E8EC',
                },
              },
            }}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: '#F4F4F4',
                '& fieldset': {
                  borderColor: '#E6E8EC',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.5,
              bgcolor: '#2F80ED',
              '&:hover': {
                bgcolor: '#1366D6',
              },
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            Sign in
          </Button>
        </form>
      </Card>
    </Box>
  );
}

