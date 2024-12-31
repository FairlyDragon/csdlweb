import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DishCard from "../components/foods/DishCard";
import EditProduct from "../components/foods/EditProduct";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const dishes = [
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
  // Thêm các món ăn khác...
];

export default function Foods() {
  const [editDialog, setEditDialog] = useState({
    open: false,
    product: null,
  });

  return (
    <Box sx={{ p: 3, bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#212B36" }}>
          Foods
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <SearchIcon 
              sx={{ 
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#919EAB'
              }}
            />
            <TextField
              placeholder="Search in here"
              size="small"
              sx={{
                width: 280,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#F4F6F8',
                  '& fieldset': { border: 'none' },
                  '& input': { pl: 5 }
                }
              }}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#36B37E",
              "&:hover": { bgcolor: "#2E9E6B" },
              textTransform: "none",
              borderRadius: '8px',
              px: 3,
              py: 1,
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            +Add Menus
          </Button>
        </Box>
      </Box>

      {/* Pagination Controls */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "flex-end",
          alignItems: "center", 
          gap: 1, 
          mb: 3,
        }}
      >
        <Button
          sx={{
            minWidth: 32,
            width: 32,
            height: 32,
            p: 0,
            border: '1px solid #DFE3E8',
            borderRadius: '8px',
            color: '#637381'
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </Button>
        <Button
          sx={{
            minWidth: 32,
            width: 32,
            height: 32,
            p: 0,
            border: '1px solid #DFE3E8',
            borderRadius: '8px',
            color: '#637381'
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </Button>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#637381',
            ml: 1,
            fontSize: '0.875rem'
          }}
        >
          Show 1-5
        </Typography>
      </Box>

      {/* Grid of Dishes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
        }}
      >
        {dishes.map((dish) => (
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
