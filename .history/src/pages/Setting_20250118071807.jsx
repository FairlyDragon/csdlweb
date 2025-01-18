import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Basic from "../components/settings/Basic";
import authService from "../services/authService";

export default function Setting() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/");
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
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {value === 0 && <Basic isActive={isActive} setIsActive={setIsActive} />}
    </Box>
  );
}
