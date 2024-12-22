import {
  Box,
  Card,
  Typography,
  Button,
  Rating,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const popularDishes = [
  {
    id: 1,
    name: "Spicy Noodles",
    image: "/food1.jpg",
    rating: 5,
    reviews: 131,
    price: 5.59,
    discount: 15,
  },
  {
    id: 2,
    name: "Egg Noodles",
    image: "/food2.jpg",
    rating: 5,
    reviews: 131,
    price: 5.59,
    discount: 15,
  },
  {
    id: 3,
    name: "Burger",
    image: "/food3.jpg",
    rating: 5,
    reviews: 131,
    price: 5.59,
    discount: 15,
  },
  // Duplicate dishes for the second row
  {
    id: 4,
    name: "Spicy Noodles",
    image: "/food1.jpg",
    rating: 5,
    reviews: 131,
    price: 5.59,
    discount: 15,
  },
  {
    id: 5,
    name: "Egg Noodles",
    image: "/food2.jpg",
    rating: 5,
    reviews: 131,
    price: 5.59,
    discount: 15,
  },
  {
    id: 6,
    name: "Burger",
    image: "/food3.jpg",
    rating: 5,
    reviews: 131,
    price: 5.59,
    discount: 15,
  },
];

export default function Foods() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 4 }}>
        Foods
      </Typography>

      {/* Promotion Banner */}
      <Card
        sx={{
          bgcolor: "#4F46E5",
          color: "white",
          p: 4,
          mb: 4,
          position: "relative",
          overflow: "visible",
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
          }}
        >
          <ChevronRight />
        </IconButton>
        <Typography variant="body2" sx={{ mb: 1 }}>
          December 21-27
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Enjoy 20% discount
          <br />
          in this Christmas
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FF6B6B",
            "&:hover": { bgcolor: "#FF5252" },
          }}
        >
          Get Started
        </Button>
      </Card>

      {/* Popular Dishes */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          co
        }}
      >
        <Typography variant="h6">Popular Dishes</Typography>
        <Button>View all</Button>
      </Box>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
      >
        {popularDishes.map((dish) => (
          <Card key={dish.id} sx={{ position: "relative" }}>
            {dish.discount && (
              <Typography
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: "#FF6B6B",
                  color: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.875rem",
                }}
              >
                {dish.discount}% Off
              </Typography>
            )}
            <Box
              component="img"
              src={dish.image}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
              }}
            />
            <Box sx={{ p: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Rating value={dish.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  ({dish.reviews})
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Dishes
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color="primary">
                  ${dish.price}
                </Typography>
                <Button variant="outlined" size="small">
                  Edit Product
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
