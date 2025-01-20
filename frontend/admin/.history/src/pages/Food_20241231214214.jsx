import { Box, Typography } from "@mui/material";
import PromotionBanner from "../components/foods/PromotionBanner";
import PopularDishes from "../components/foods/PopularDishes";

export default function Foods() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#212B36",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        Foods
      </Typography>

      <PromotionBanner />
      <PopularDishes />
    </Box>
  );
}

