import { Box, Typography } from '@mui/material';
import StatCards from '../components/dashboard/StatCards';
import ChartSection from '../components/dashboard/ChartSection';
import FoodCategoryAnalytics from '../components/dashboard/FoodCategoryAnalytics';
import TopFoodRecommendations from '../components/dashboard/TopFoodRecommendations';

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Typography color="text.secondary">
          Hi, Admin, Welcome back to Fairy Dragon Admin!
        </Typography>
      </Box>

      <StatCards />
      <ChartSection />
      <FoodCategoryAnalytics />
      <TopFoodRecommendations />
    </Box>
  );
}

