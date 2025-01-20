import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
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
      {/* Left Side */}
      <Box
        sx={{
          width: '40%',
          background: 'linear-gradient(135deg, #8B6E4E 0%, #5C4023 100%)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          p: 4
        }}
      >
        <Box
          component="img"
          src="/placeholder.svg"
          alt="Logo"
          sx={{
            width: 60,
            height: 60,
            mb: 2
          }}
        />
        <Typography
          sx={{
            color: '#FFFFFF',
            fontFamily: 'Syne',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.2
          }}
        >
          Fairy
          <br />
          Dragon
        </Typography>
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

      {/* Right Side */}
      <Box
        sx={{
          width: '60%',
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 40,
            fontWeight: 700,
            mb: 4
          }}
        >
          Sign Up
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 480
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9CA3AF',
                  }
                }
              }}
            />
            <TextField
              fullWidth
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9CA3AF',
                  }
                }
              }}
            />
          </Box>

          <TextField
            fullWidth
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#D1D5DB',
                },
                '&:hover fieldset': {
                  borderColor: '#9CA3AF',
                }
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#D1D5DB',
                },
                '&:hover fieldset': {
                  borderColor: '#9CA3AF',
                }
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Confirm password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#D1D5DB',
                },
                '&:hover fieldset': {
                  borderColor: '#9CA3AF',
                }
              }
            }}
          />

          <Button
            fullWidth
            type="submit"
            sx={{
              bgcolor: '#B4362C',
              color: 'white',
              py: 2,
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#8B2B22'
              }
            }}
          >
            Create Account
          </Button>
        </Box>

        <Box sx={{ mt: 2, mb: 4 }}>
          <Typography component="span" sx={{ color: '#6B7280' }}>
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

        <Box sx={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
          <Typography 
            sx={{ 
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '45%',
                height: '1px',
                bgcolor: '#E5E7EB'
              },
              '&::before': {
                left: 0
              },
              '&::after': {
                right: 0
              }
            }}
          >
            OR
          </Typography>
        </Box>

        <Box sx={{ 
          width: '100%', 
          maxWidth: 480, 
          mt: 4,
          display: 'flex',
          gap: 2 
        }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <Box
                component="img"
                src="/placeholder.svg"
                alt="Facebook"
                sx={{ width: 24, height: 24 }}
              />
            }
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
            startIcon={
              <Box
                component="img"
                src="/placeholder.svg"
                alt="Google"
                sx={{ width: 24, height: 24 }}
              />
            }
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

