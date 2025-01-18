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
      await authService.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setOpenLogoutDialog(false);
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
        >
          Logout
        </Button>
      </Box>

      {value === 0 && <Basic isActive={isActive} setIsActive={setIsActive} />}

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
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
