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
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập
  };

  const handleResetPassword = () => {
    if (!resetEmail) {
      setError('Please enter your email');
      return;
    }
    // Gửi email reset password
    setResetSent(true);
    setTimeout(() => {
      setOpenResetDialog(false);
      setResetSent(false);
      setResetEmail('');
    }, 3000);
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
        <Typography variant="h5" align="center" mb={3} fontWeight="bold">
          Sign In
        </Typography>

        <form onSubmit={handleSignIn}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => setOpenResetDialog(true)}
              sx={{ textDecoration: 'none' }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </form>

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

      {/* Reset Password Dialog */}
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
                error={!!error}
                helperText={error}
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
    </Box>
  );
};

export default SignIn;