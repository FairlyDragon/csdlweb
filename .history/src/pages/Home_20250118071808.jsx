import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/auth/signin")}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.1rem'
        }}
      >
        Sign In
      </Button>
    </Box>
  );
}