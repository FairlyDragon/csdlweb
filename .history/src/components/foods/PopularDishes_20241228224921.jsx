import { Box, Typography, Button } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import DishCard from "./DishCard";

const popularDishes = [
  {
    id: 1,
    name: "Spicy Noodles",
    image: "/food1.jpg",
    rating: 5,
    reviews: "1.31",
    price: 5.59,
    discount: 15,
  },
  {
    id: 2,
    name: "Egg Noodles",
    image: "/food2.jpg",
    rating: 5,
    reviews: "1.31",
    price: 5.59,
    discount: 15,
  },
  {
    id: 3,
    name: "Burger",
    image: "/food3.jpg",
    rating: 5,
    reviews: "1.31",
    price: 5.59,
    discount: 15,
  },
  // Duplicate dishes for the second row
  {
    id: 4,
    name: "Spicy Noodles",
    image: "/food1.jpg",
    rating: 5,
    reviews: "1.31",
    price: 5.59,
    discount: 15,
  },
  {
    id: 5,
    name: "Egg Noodles",
    image: "/food2.jpg",
    rating: 5,
    reviews: "1.31",
    price: 5.59,
    discount: 15,
  },
  {
    id: 6,
    name: "Burger",
    image: "/food3.jpg",
    rating: 5,
    reviews: "1.31",
    price: 5.59,
    discount: 15,
  },
];

export default function PopularDishes() {
  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: "#212B36",
          }}
        >
          Popular Dishes
        </Typography>
        <Button
          endIcon={<ArrowForwardIos sx={{ fontSize: 14 }} />}
          sx={{
            textTransform: "none",
            color: "#637381",
            "&:hover": {
              bgcolor: "transparent",
              color: "#212B36",
            },
            "& .MuiButton-endIcon": {
              ml: 0.5,
            },
          }}
        >
          View all
        </Button>
      </Box>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
      >
        {popularDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </Box>
    </>
  );
}

