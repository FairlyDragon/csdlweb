import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tab,
  Tabs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Basic from "../components/settings/Basic";
import authService from "../services/authService";

export default function Setting() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await authService.logout(); // Gọi API logout
      navigate("/"); // Chuyển về trang Home
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#00AB55",
            },
          }}
        >
          <Tab
            label="Basic Settings"
            sx={{
              "&.Mui-selected": {
                color: "#00AB55",
              },
            }}
          />
        </Tabs>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogoutClick}
          sx={{
            bgcolor: "#FF4842",
            "&:hover": {
              bgcolor: "#B72136",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      {value === 0 && <Basic isActive={isActive} setIsActive={setIsActive} />}

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="error" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
