import { Box, Typography, Tabs, Tab, Button } from "@mui/material";
import { useState } from "react";
import Basic from "../components/settings/Basic";
import Fee from "../components/settings/Fee";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import authService from '../../services/authService';

const Setting = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = async () => {
    try {
      // Gọi API logout nếu cần
      await authService.logout();
      // Chuyển về trang login
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          color: "#212B36",
          mb: 3,
        }}
      >
        Settings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "16px",
              color: "#637381",
              "&.Mui-selected": {
                color: "#00AB55",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#00AB55",
            },
          }}
        >
          <Tab label="Basic" />
          <Tab label="Fee" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Basic isActive={isActive} setIsActive={setIsActive} />
      )}
      {activeTab === 1 && <Fee />}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ minWidth: 120 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Setting;
