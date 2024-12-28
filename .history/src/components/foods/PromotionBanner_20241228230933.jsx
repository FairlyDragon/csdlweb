import { Card, Typography, Button, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function PromotionBanner() {
  return (
    <Card
      sx={{
        bgcolor: "#4F46E5",
        color: "white",
        p: { xs: 3, md: 4 },
        mb: 4,
        position: "relative",
        overflow: "visible",
        borderRadius: 3,
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          left: { xs: -16, md: -20 },
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "white" },
          width: { xs: 32, md: 40 },
          height: { xs: 32, md: 40 },
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          right: { xs: -16, md: -20 },
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "white" },
          width: { xs: 32, md: 40 },
          height: { xs: 32, md: 40 },
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <ChevronRight />
      </IconButton>
      <Box sx={{ pl: { xs: 2, md: 4 }, maxWidth: 'max-content' }}>
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
            mb: 3,
            fontSize: { xs: 20, md: 24 },
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
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Get Started
        </Button>
      </Box>
    </Card>
  );
}

