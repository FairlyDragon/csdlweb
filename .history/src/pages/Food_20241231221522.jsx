import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DishCard from "../components/foods/DishCard";
import EditProduct from "../components/foods/EditProduct";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const dishes = [
  {
    id: 1,
    name: "Spicy Noodles",
    image: "/images/spicy-noodles.jpg",
    rating: 5,
    reviews: "1.31",
    category: "Dishes",
    price: 5.59,
    discount: 15,
  },
  // Thêm các món ăn khác...
];

export default function Foods() {
  const [editDialog, setEditDialog] = useState({
    open: false,
    product: null,
  });

  const handleEditClick = (product) => {
    setEditDialog({
      open: true,
      product: product,
    });
  };

  const handleSaveProduct = (editedProduct) => {
    // Xử lý lưu sản phẩm
    console.log("Saving product:", editedProduct);
    setEditDialog({ open: false, product: null });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#212B36" }}>
          Foods
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#36B37E",
            "&:hover": { bgcolor: "#2E9E6B" },
            textTransform: "none",
            px: 2,
          }}
        >
          +Add Menus
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 0, p: 0.5 }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 0, p: 0.5 }}
          >
            <ChevronRightIcon />
          </Button>
          <Typography variant="body2" color="textSecondary">
            Show 1-5
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 3,
        }}
      >
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onEditClick={handleEditClick} />
        ))}
      </Box>

      <EditProduct
        open={editDialog.open}
        product={editDialog.product}
        onClose={() => setEditDialog({ open: false, product: null })}
        onSave={handleSaveProduct}
      />
    </Box>
  );
}
