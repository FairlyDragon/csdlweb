import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Fade,
  Skeleton,
  Alert,
  Snackbar,
} from "@mui/material";
import DishCard from "../components/foods/DishCard";
import EditProduct from "../components/foods/EditProduct";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddMenu from "../components/foods/AddMenu";

const TRANSITION_DURATION = 800; // Tăng thời gian transition
const LOADING_DELAY = 600; // Thời gian loading giả lập

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
  {
    id: 2,
    name: "Grilled Chicken",
    image: "/images/grilled-chicken.jpg",
    rating: 4,
    reviews: "1.21",
    category: "Dishes",
    price: "6.59",
    discount: 10,
  },
  {
    id: 3,
    name: "Vegetable Salad",
    image: "/images/vegetable-salad.jpg",
    rating: 4.5,
    reviews: "1.15",
    category: "Dishes",
    price: "4.59",
    discount: 20,
  },
  {
    id: 4,
    name: "Beef Steak",
    image: "/images/beef-steak.jpg",
    rating: 5,
    reviews: "1.42",
    category: "Dishes",
    price: "8.59",
    discount: 15,
  },
  {
    id: 5,
    name: "Seafood Pasta",
    image: "/images/seafood-pasta.jpg",
    rating: 4.5,
    reviews: "1.28",
    category: "Dishes",
    price: "7.59",
    discount: 12,
  },
  {
    id: 6,
    name: "Sushi Roll",
    image: "/images/sushi-roll.jpg",
    rating: 4.8,
    reviews: "1.35",
    category: "Dishes",
    price: "9.59",
    discount: 18,
  },
  // Trang 2
  {
    id: 7,
    name: "Pizza Margherita",
    image: "/images/pizza.jpg",
    rating: 4.7,
    reviews: "1.33",
    category: "Dishes",
    price: "7.99",
    discount: 15,
  },
  // ... thêm các món khác cho trang 2
  // ... thêm các món khác cho trang 3
  // Mỗi trang 6 món
];

const ITEMS_PER_PAGE = 6; // Số món ăn cố định mỗi trang

// Component Skeleton cho DishCard
const DishCardSkeleton = () => (
  <Box sx={{ width: "280px" }}>
    <Skeleton
      variant="rectangular"
      width="100%"
      height={200}
      sx={{ borderRadius: "16px 16px 0 0" }}
    />
    <Box sx={{ p: 2 }}>
      <Skeleton width={120} height={24} sx={{ mb: 1 }} />
      <Skeleton width={80} height={20} sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton width={60} height={24} />
        <Skeleton width={92} height={36} sx={{ borderRadius: "8px" }} />
      </Box>
    </Box>
  </Box>
);

export default function Foods() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [error, setError] = useState(null);
  const [editDialog, setEditDialog] = useState({
    open: false,
    product: null,
  });
  const [products, setProducts] = useState(allDishes); // State quản lý danh sách sản phẩm
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  // Tính toán tổng số trang dựa trên số món ăn
  const totalPages = Math.ceil(allDishes.length / ITEMS_PER_PAGE);

  // Lấy chính xác 6 món ăn cho trang hiện tại
  const getCurrentPageDishes = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allDishes.slice(startIndex, endIndex);
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      try {
        setFadeIn(false);
        setIsLoading(true);
        setError(null);

        // Giả lập API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Kiểm tra xem trang mới có đủ dữ liệu không
            const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const pageData = allDishes.slice(startIndex, endIndex);

            if (pageData.length === 0) {
              reject(new Error("No more items to display"));
            } else {
              resolve();
            }
          }, LOADING_DELAY);
        });

        setCurrentPage(newPage);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setFadeIn(true);
      }
    }
  };

  // Render skeletons during loading
  const renderSkeletons = () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        "& > *": {
          justifySelf: "center",
        },
      }}
    >
      {[...Array(6)].map((_, index) => (
        <DishCardSkeleton key={index} />
      ))}
    </Box>
  );

  const handleDeleteProduct = (productId) => {
    // Xóa sản phẩm khỏi danh sách
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    // Kiểm tra và điều chỉnh trang hiện tại nếu cần
    const newTotalPages = Math.ceil((products.length - 1) / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1); // Nếu không còn trang nào thì về trang 1
    }

    // Đóng dialog
    setEditDialog({ open: false, product: null });
  };

  const handleAddProduct = (newProduct) => {
    // Tạo một sản phẩm mới với ID và các giá trị mặc định
    const productToAdd = {
      id: products.length + 1, // Tạo ID mới
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      details: newProduct.details,
      image: newProduct.image,
      rating: 5, // Giá trị mặc định
      reviews: "0",
      discount: 0, // Giá trị mặc định
    };

    // Thêm sản phẩm mới vào danh sách
    setProducts((prevProducts) => [...prevProducts, productToAdd]);

    // Chuyển đến trang cuối cùng sau khi thêm
    const newTotalPages = Math.ceil((products.length + 1) / ITEMS_PER_PAGE);
    setCurrentPage(newTotalPages);

    // Đóng dialog
    setAddMenuOpen(false);
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
            onClick={() => setAddMenuOpen(true)}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
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
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
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
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
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

      {/* Grid with Loading and Animation */}
      <Box sx={{ position: "relative", minHeight: "600px" }}>
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress
              sx={{
                color: "#36B37E",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
              size={40}
              thickness={4}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#637381",
                fontSize: "0.875rem",
              }}
            >
              Loading...
            </Typography>
          </Box>
        )}

        <Fade in={fadeIn} timeout={TRANSITION_DURATION}>
          <Box>
            {isLoading ? (
              renderSkeletons()
            ) : (
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
                {getCurrentPageDishes().map((product) => (
                  <DishCard
                    key={product.id}
                    dish={product}
                    onEditClick={() => setEditDialog({ open: true, product })}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Fade>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <EditProduct
        open={editDialog.open}
        product={editDialog.product}
        onClose={() => setEditDialog({ open: false, product: null })}
        onSave={(editedProduct) => {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === editedProduct.id ? editedProduct : p
            )
          );
          setEditDialog({ open: false, product: null });
        }}
        onDelete={handleDeleteProduct}
      />

      <AddMenu
        open={addMenuOpen}
        onClose={() => setAddMenuOpen(false)}
        onAdd={handleAddProduct}
      />
    </Box>
  );
}
