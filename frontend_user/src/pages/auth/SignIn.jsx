import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({
        username: formData.email,
        password: formData.password
      });
      
      if (response.access_token) {
        setSnackbar({
          open: true,
          message: 'Login successful!',
          severity: 'success'
        });
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Login failed',
        severity: 'error'
      });
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setSnackbar({
        open: true,
        message: 'Please enter your email',
        severity: 'error'
      });
      return;
    }
    try {
      await authService.resetPassword(resetEmail);
      setResetSent(true);
      setTimeout(() => {
        setOpenResetDialog(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to send reset email',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Box
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign In
        </Typography>

        <form onSubmit={handleSignIn}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => setOpenResetDialog(true)}
            sx={{ textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/auth/signup')}
              sx={{ textDecoration: 'none' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>

      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          {resetSent ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Password reset link has been sent to your email!
            </Alert>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
                Enter your email address and we'll send you a link to reset your password.
              </Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>
            Cancel
          </Button>
          {!resetSent && (
            <Button onClick={handleResetPassword} variant="contained">
              Send Reset Link
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
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
  );
};

export default SignIn;