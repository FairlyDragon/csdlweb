import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Rating,
  Avatar,
} from "@mui/material";

const topFoods = [
  {
    id: 1,
    name: "Special Phở",
    rating: 4.8,
    orders: 120,
    image: "/path/to/pho.jpg",
    category: "Vietnamese",
  },
  {
    id: 2,
    name: "Premium Sushi Set",
    rating: 4.7,
    orders: 98,
    image: "/path/to/sushi.jpg",
    category: "Japanese",
  },
  // Add more items...
];

export default function TopFoodRecommendations() {
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader title="Top 10 Recommended Foods" />
      <CardContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          {topFoods.map((food) => (
            <Box
              key={food.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Avatar
                variant="rounded"
                src={food.image}
                sx={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {food.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {food.category}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                >
                  <Rating
                    value={food.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({food.rating})
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {food.orders} orders
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
