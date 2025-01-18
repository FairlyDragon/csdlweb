import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import authService from "../../services/authService";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await authService.login({
        username: formData.email,
        password: formData.password,
      });

      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.detail || "Login failed",
        severity: "error",
      });
    }
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
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Sign In
      </Typography>

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        margin="normal"
        required
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
      >
        Sign In
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({...snackbar, open: false})}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LogIn;
