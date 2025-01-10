import {
  Box,
  Typography,
  TextField,
  Switch,
  Tabs,
  Tab,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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
        <Box sx={{ maxWidth: 800 }}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: "140px 1fr auto",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography sx={{ color: "#212B36" }}>Address</Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="334 Nguyen Trai"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F4F6F8",
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ color: "#212B36" }}>Active</Typography>
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: "140px 1fr",
              alignItems: "center",
              "& > div": { mb: 3 },
            }}
          >
            <Typography sx={{ color: "#212B36" }}>Email</Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="abcd@gmail.com"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F4F6F8",
                },
              }}
            />

            <Typography sx={{ color: "#212B36" }}>Phone</Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="0987654321"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F4F6F8",
                },
              }}
            />

            <Typography sx={{ color: "#212B36" }}>Bank</Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="BIDV"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F4F6F8",
                },
              }}
            />

            <Typography sx={{ color: "#212B36" }}>Account Number</Typography>
            <TextField
              fullWidth
              size="small"
              defaultValue="888888888888"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F4F6F8",
                },
              }}
            />

            <Typography sx={{ color: "#212B36" }}>QR Code</Typography>
            <Box
              sx={{
                width: 120,
                height: 120,
                border: "1px dashed #919EAB",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "#919EAB" }} />
            </Box>

            <Typography sx={{ color: "#212B36" }}>Privacy Policy</Typography>
            <TextareaAutosize
              minRows={6}
              placeholder="Some term and condition..."
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #DFE3E8",
                backgroundColor: "#F4F6F8",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {/* Fee tab content */}
          <Typography>Fee content coming soon...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Setting;
