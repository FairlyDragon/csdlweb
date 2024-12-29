import { Box, Typography } from "@mui/material";

export default function SidebarFooter() {
  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
      <Box sx={{ mb: 1 }}>
        <Typography
          sx={{
            fontSize: 13,
            color: "#969BA0",
            fontWeight: 700,
            lineHeight: "18px",
            fontFamily: "Barlow",
          }}
        >
          FairyDragon Restaurant Admin Dashboard
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: "#969BA0",
            fontWeight: 400,
            lineHeight: "18px",
            fontFamily: "Barlow",
          }}
        >
          © 2024 All Rights Reserved
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          color: "#969BA0",
          fontWeight: 400,
          lineHeight: "26px",
          fontFamily: "Barlow",
        }}
      >
        Made by FairyDragon team
      </Typography>
    </Box>
  );
}
