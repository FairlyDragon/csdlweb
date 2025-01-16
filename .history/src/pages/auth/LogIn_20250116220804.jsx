import { useState } from "react";
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
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login({
        username: formData.email,
        password: formData.password,
      });

      if (response.access_token) {
        // Lưu token và role vào localStorage
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('role', response.role); // Lưu role từ response

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        // Kiểm tra role để điều hướng
        if (response.role === 'admin') {
          // Admin có quyền truy cập tất cả
          localStorage.setItem('isAdmin', 'true');
        } else {
          // User thường không có quyền truy cập Sub Admins
          localStorage.setItem('isAdmin', 'false');
        }

        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.detail || error.message || "Login failed";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setSnackbar({
        open: true,
        message: "Please enter your email",
        severity: "error",
      });
      return;
    }

    try {
      await authService.resetPassword(resetEmail);
      setResetSent(true);
      setSnackbar({
        open: true,
        message: "Password reset email sent!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to send reset email",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignIn}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 3,
        boxShadow: 1,
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Sign In
      </Typography>

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

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>

      <Box sx={{ textAlign: "center" }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => setOpenResetDialog(true)}
          sx={{ mb: 1, display: "block" }}
        >
          Forgot password?
        </Link>
        <Typography variant="body2">
          Don&apos;t have an account?{" "}
          <Link component="button" onClick={() => navigate("/auth/signup")}>
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* Reset Password Dialog */}
      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          {!resetSent ? (
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          ) : (
            <Typography>
              Password reset instructions have been sent to your email.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>Cancel</Button>
          {!resetSent && (
            <Button onClick={handleResetPassword}>Send Reset Link</Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignIn;
