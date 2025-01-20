import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Fade,
  Skeleton,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import DishCard from "../components/foods/DishCard";
import EditProduct from "../components/foods/EditProduct";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddMenu from "../components/foods/AddMenu";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { foodService } from "../services/FoodService";

const TRANSITION_DURATION = 800; // Tăng thời gian transition
const LOADING_DELAY = 600; // Thời gian loading giả lập
const ITEMS_PER_PAGE = 9; // Số món ăn mỗi trang

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

const discountMarks = [
  { value: 5, label: "5%" },
  { value: 10, label: "10%" },
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 25, label: "25%" },
  { value: 30, label: "30%" },
  { value: 35, label: "35%" },
  { value: 40, label: "40%" },
  { value: 45, label: "45%" },
  { value: 50, label: "50%" },
];

export default function Food() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [error, setError] = useState(null);
  const [editDialog, setEditDialog] = useState({
    open: false,
    product: null,
  });
  const [products, setProducts] = useState([]);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [showDiscountedPrices, setShowDiscountedPrices] = useState(false);
  const [discountDialog, setDiscountDialog] = useState({
    open: false,
    value: 5, // Giá trị mặc định
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);
  const [sortPrice, setSortPrice] = useState("default");
  const [stockFilter, setStockFilter] = useState("all");

  // Fetch data when component mounts
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setIsLoading(true);
        const data = await foodService.getFoods();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Tính toán tổng số trang dựa trên số món ăn
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

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
            const pageData = products.slice(startIndex, endIndex);

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

  // Handle add new product
  const handleAddProduct = async (newProduct) => {
    try {
      setIsLoading(true);
      const response = await foodService.createFood(newProduct);
      setProducts((prevProducts) => [response, ...prevProducts]);
      setAddMenuOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
      setError("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit product
  const handleEditProduct = async (editedProduct) => {
    try {
      setIsLoading(true);
      await foodService.updateFood(editedProduct.menuitem_id, editedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.menuitem_id === editedProduct.menuitem_id
            ? editedProduct
            : product
        )
      );
      setEditDialog({ open: false, product: null });
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      setIsLoading(true);
      await foodService.deleteFood(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.menuitem_id !== productId)
      );
      setEditDialog({ open: false, product: null });
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm tính giá sau khi áp dụng discount
  const calculateDiscountedPrice = (originalPrice, discountPercent) => {
    const price = parseFloat(originalPrice);
    const discount = discountPercent / 100;
    return (price * (1 - discount)).toFixed(2);
  };

  // Xử lý áp dụng discount cho tất cả sản phẩm
  const handleApplyDiscount = () => {
    const newProducts = products.map((product) => ({
      ...product,
      discount: discountDialog.value, // Cập nhật giá trị discount
    }));
    setProducts(newProducts);
    setShowDiscountedPrices(true);
    setDiscountDialog({ ...discountDialog, open: false });
  };

  // Hàm xử lý tắt discount
  const handleDisableDiscount = () => {
    // Reset discount về 0 cho tất cả sản phẩm
    const resetProducts = products.map((product) => ({
      ...product,
      discount: 0,
    }));

    setProducts(resetProducts);
    setShowDiscountedPrices(false);
  };

  const handleDiscountChange = (_, newValue) => {
    // Snap to nearest mark
    const nearestMark = discountMarks.reduce((prev, curr) => {
      return Math.abs(curr.value - newValue) < Math.abs(prev.value - newValue)
        ? curr
        : prev;
    });
    setDiscountDialog({ ...discountDialog, value: nearestMark.value });
  };

  // Lấy danh sách categories từ products
  useEffect(() => {
    const uniqueCategories = [
      "all",
      ...new Set(products.map((p) => p.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  // Xử lý drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);
  };

  // Hàm lọc và sắp xếp products
  const getFilteredAndSortedProducts = () => {
    let result = [...products];

    // Lọc theo category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Lọc theo trạng thái stock
    if (stockFilter !== "all") {
      result = result.filter((product) =>
        stockFilter === "inStock" ? product.is_active : !product.is_active
      );
    }

    // Sắp xếp theo giá
    if (sortPrice === "highToLow") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortPrice === "lowToHigh") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    return result;
  };

  // Lấy products cho trang hiện tại (giữ lại chỉ một hàm này)
  const getCurrentPageProducts = () => {
    const filteredAndSortedProducts = getFilteredAndSortedProducts();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
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
          {/* Category Filter */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1); // Reset page when filter changes
              }}
              displayEmpty
              startAdornment={
                <FilterListIcon sx={{ color: "#637381", mr: 1 }} />
              }
              renderValue={(selected) => {
                if (selected === "all") {
                  return "Category";
                }
                return selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
              sx={{
                height: "40px",
                bgcolor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DFE3E8",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price Filter with Arrow */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={sortPrice}
              onChange={(e) => {
                setSortPrice(e.target.value);
                setCurrentPage(1);
              }}
              displayEmpty
              startAdornment={
                <FilterListIcon sx={{ color: "#637381", mr: 1 }} />
              }
              renderValue={(selected) => (
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <Typography sx={{ flexGrow: 1 }}>Price</Typography>
                  {selected === "highToLow" ? (
                    <ArrowDownward
                      sx={{ color: "#637381", fontSize: 20, ml: 1 }}
                    />
                  ) : selected === "lowToHigh" ? (
                    <ArrowUpward
                      sx={{ color: "#637381", fontSize: 20, ml: 1 }}
                    />
                  ) : null}
                </Box>
              )}
              sx={{
                height: "40px",
                bgcolor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DFE3E8",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
              }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="highToLow">Price: High-Low</MenuItem>
              <MenuItem value="lowToHigh">Price: Low-High</MenuItem>
            </Select>
          </FormControl>

          {/* Stock Status Filter */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setCurrentPage(1);
              }}
              displayEmpty
              startAdornment={
                <FilterListIcon sx={{ color: "#637381", mr: 1 }} />
              }
              renderValue={(selected) => {
                switch (selected) {
                  case "inStock":
                    return "In Stock";
                  case "outOfStock":
                    return "Out of Stock";
                  default:
                    return "Stock Status";
                }
              }}
              sx={{
                height: "40px",
                bgcolor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DFE3E8",
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="inStock">In Stock</MenuItem>
              <MenuItem value="outOfStock">Out of Stock</MenuItem>
            </Select>
          </FormControl>

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

          <Button
            variant={showDiscountedPrices ? "contained" : "outlined"}
            onClick={() => {
              if (showDiscountedPrices) {
                // Nếu đang bật discount thì tắt
                handleDisableDiscount();
              } else {
                // Nếu đang tắt thì mở dialog chọn %
                setDiscountDialog({ open: true, value: 5 });
              }
            }}
            sx={{
              bgcolor: showDiscountedPrices ? "#FF4842" : "transparent",
              color: showDiscountedPrices ? "white" : "#FF4842",
              borderColor: "#FF4842",
              "&:hover": {
                bgcolor: showDiscountedPrices
                  ? "#B72136"
                  : "rgba(255, 72, 66, 0.08)",
                borderColor: "#FF4842",
              },
              textTransform: "none",
            }}
          >
            {showDiscountedPrices ? "Disable Discount" : "Discount"}
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
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="products" direction="horizontal">
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 3,
                        mb: 3,
                      }}
                    >
                      {getCurrentPageProducts().map((product, index) => (
                        <Draggable
                          key={product.menuitem_id}
                          draggableId={product.menuitem_id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                transform: snapshot.isDragging
                                  ? "scale(1.02)"
                                  : "none",
                                transition: "transform 0.2s",
                              }}
                            >
                              <DishCard
                                dish={product}
                                showDiscountedPrice={showDiscountedPrices}
                                calculatedPrice={
                                  showDiscountedPrices && product.discount
                                    ? calculateDiscountedPrice(
                                        product.price,
                                        product.discount
                                      )
                                    : product.price
                                }
                                onEditClick={() =>
                                  setEditDialog({ open: true, product })
                                }
                              />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
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
        onSave={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <AddMenu
        open={addMenuOpen}
        onClose={() => setAddMenuOpen(false)}
        onAdd={handleAddProduct}
      />

      {/* Discount Dialog */}
      <Dialog
        open={discountDialog.open}
        onClose={() => setDiscountDialog({ ...discountDialog, open: false })}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            width: "360px",
            p: 2,
          },
        }}
      >
        <DialogTitle>Apply Discount</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2, color: "#637381" }}>
            Select discount percentage for all products
          </Typography>
          <Slider
            value={discountDialog.value}
            onChange={handleDiscountChange}
            step={null}
            marks={discountMarks}
            min={5}
            max={50}
            valueLabelDisplay="auto"
            sx={{
              color: "#FF4842",
              "& .MuiSlider-mark": {
                backgroundColor: "#bfbfbf",
                height: "8px",
                width: "1px",
                "&.MuiSlider-markActive": {
                  backgroundColor: "#fff",
                },
              },
              "& .MuiSlider-valueLabel": {
                bgcolor: "#FF4842",
              },
              "& .MuiSlider-markLabel": {
                fontSize: "12px",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDiscountDialog({ ...discountDialog, open: false })
            }
            sx={{
              color: "#637381",
              "&:hover": { bgcolor: "rgba(99, 115, 129, 0.08)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplyDiscount}
            sx={{
              bgcolor: "#FF4842",
              color: "white",
              "&:hover": { bgcolor: "#B72136" },
              textTransform: "none",
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
