import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Facebook, Google } from '@mui/icons-material';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh'
    }}>
      {/* Left Side - Background and Logo */}
      <Box
        sx={{
          flex: '0 0 40%',
          position: 'relative',
          background: 'linear-gradient(135deg, #8B6E4E 0%, #5C4023 100%)',
          display: 'flex',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#FFFFFF',
            fontFamily: 'Syne',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 1
          }}
        >
          Fairy
          <br />
          Dragon
        </Typography>
        
        <Box
          component="img"
          src="/placeholder.svg"
          alt="Logo"
          sx={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 60,
            height: 60
          }}
        />
        
        <Box
          component="img"
          src="/placeholder.svg"
          alt="Pho Bowl"
          sx={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 500
          }}
        />
      </Box>

      {/* Right Side - Sign Up Form */}
      <Box
        sx={{
          flex: '1 1 60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 8
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '48px',
            fontWeight: 700,
            mb: 6,
            textAlign: 'center'
          }}
        >
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last name"
                variant="outlined"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              }
            }}
          />

          <TextField
            fullWidth
            label="Confirm password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              }
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#B4362C',
              color: '#FFFFFF',
              py: 2,
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '12px',
              textTransform: 'none',
              mb: 3,
              '&:hover': {
                bgcolor: '#8B2B22'
              }
            }}
          >
            Create Account
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            component="span"
            sx={{ color: '#6B7280' }}
          >
            Already have account?{' '}
          </Typography>
          <Typography
            component="span"
            onClick={() => navigate('/login')}
            sx={{
              color: '#B4362C',
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Login
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ px: 2, color: '#6B7280' }}>OR</Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Facebook />}
            sx={{
              color: '#1877F2',
              borderColor: '#E5E7EB',
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#1877F2',
                bgcolor: 'transparent'
              }
            }}
          >
            Sign up with Facebook
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{
              color: '#EA4335',
              borderColor: '#E5E7EB',
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#EA4335',
                bgcolor: 'transparent'
              }
            }}
          >
            Sign up with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

