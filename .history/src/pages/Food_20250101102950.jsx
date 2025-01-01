import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DishCard from "../components/foods/DishCard";
import EditProduct from "../components/foods/EditProduct";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Giả lập dữ liệu nhiều món ăn
const allDishes = [
  {
    id: 1,
    name: "Spicy Noodles",
    image: "/images/spicy-noodles.jpg",
    rating: 5,
    reviews: "1.31",
    category: "Dishes",
    price: "5.59",
    discount: 15,
  },
  // Thêm nhiều món ăn khác...
  // (giả sử có 18 món - 3 trang)
];

const ITEMS_PER_PAGE = 6; // Số món ăn mỗi trang

export default function Foods() {
  const [currentPage, setCurrentPage] = useState(1);
  const [editDialog, setEditDialog] = useState({
    open: false,
    product: null,
  });

  // Tính toán tổng số trang
  const totalPages = Math.ceil(allDishes.length / ITEMS_PER_PAGE);

  // Lấy các món ăn cho trang hiện tại
  const getCurrentPageDishes = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allDishes.slice(startIndex, endIndex);
  };

  // Xử lý chuyển trang
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#212B36",
            fontSize: "1.5rem",
          }}
        >
          Foods
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#36B37E",
              "&:hover": { bgcolor: "#2E9E6B" },
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              py: 1,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            +Add Menus
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              sx={{
                minWidth: 32,
                width: 32,
                height: 32,
                p: 0,
                border: "1px solid #DFE3E8",
                borderRadius: "8px",
                color: "#637381",
                "&.Mui-disabled": {
                  borderColor: "#DFE3E8",
                  color: "#DFE3E8",
                },
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              sx={{
                minWidth: 32,
                width: 32,
                height: 32,
                p: 0,
                border: "1px solid #DFE3E8",
                borderRadius: "8px",
                color: "#637381",
                "&.Mui-disabled": {
                  borderColor: "#DFE3E8",
                  color: "#DFE3E8",
                },
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: "#637381",
                fontSize: "0.875rem",
              }}
            >
              Show {currentPage}-{totalPages}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Grid of Dishes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          "& > *": {
            width: "100%",
            maxWidth: "280px",
            justifySelf: "center",
          },
        }}
      >
        {getCurrentPageDishes().map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onEditClick={() => setEditDialog({ open: true, product: dish })}
          />
        ))}
      </Box>

      <EditProduct
        open={editDialog.open}
        product={editDialog.product}
        onClose={() => setEditDialog({ open: false, product: null })}
        onSave={(editedProduct) => {
          console.log("Saving:", editedProduct);
          setEditDialog({ open: false, product: null });
        }}
      />
    </Box>
  );
}
