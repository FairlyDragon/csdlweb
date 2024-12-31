import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PromotionBanner from '../components/foods/PromotionBanner';
import PopularDishes from '../components/foods/PopularDishes';
import DishCard from '../components/foods/DishCard';
import EditProduct from '../components/foods/EditProduct';

export default function Foods() {
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialog, setEditDialog] = useState({
    open: false,
    product: null
  });

  const handleEditClick = (product) => {
    setEditDialog({
      open: true,
      product: product
    });
  };

  const handleSaveProduct = (editedProduct) => {
    // Implement save logic here
    console.log('Saving product:', editedProduct);
    setEditDialog({ open: false, product: null });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography
          variant="h4"
          sx={{
            color: "#212B36",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Foods
        </Typography>

        <TextField
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: 280,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: '#F4F6F8',
              '& fieldset': {
                border: 'none'
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#637381' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <PromotionBanner />
      <PopularDishes onEditClick={handleEditClick} />

      <EditProduct
        open={editDialog.open}
        product={editDialog.product}
        onClose={() => setEditDialog({ open: false, product: null })}
        onSave={handleSaveProduct}
      />
    </Box>
  );
}

