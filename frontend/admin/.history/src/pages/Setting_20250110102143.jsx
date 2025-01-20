import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import Basic from "../components/settings/Basic";
import Fee from "../components/settings/Fee";

const Setting = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
    </Box>
  );
};

export default Setting;
