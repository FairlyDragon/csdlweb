import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold" }}>
        Welcome to FairyDragon Admin
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/auth/signin")}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: "1.1rem",
          bgcolor: "#00AB55",
          "&:hover": {
            bgcolor: "#007B55",
          },
        }}
      >
        Sign In
      </Button>
    </Box>
  );
}
