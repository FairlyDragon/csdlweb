import { Card, Typography, Button, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function PromotionBanner() {
  return (
    <Card
      sx={{
        bgcolor: "#4F46E5",
        color: "white",
        p: 4,
        mb: 4,
        position: "relative",
        overflow: "visible",
        borderRadius: 3,
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          left: -20,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "white" },
          width: 40,
          height: 40,
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "white" },
          width: 40,
          height: 40,
        }}
      >
        <ChevronRight />
      </IconButton>
      <Typography
        sx={{
          mb: 1,
          fontSize: 14,
          fontWeight: 400,
          color: "rgba(255, 255, 255, 0.9)",
        }}
      >
        December 21-27
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.5,
        }}
      >
        Enjoy 20% discount
        <br />
        in this Christmas
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#FF6B6B",
          "&:hover": { bgcolor: "#FF5252" },
          textTransform: "none",
          borderRadius: 1.5,
          px: 3,
          py: 1,
        }}
      >
        Get Started
      </Button>
    </Card>
  );
}

