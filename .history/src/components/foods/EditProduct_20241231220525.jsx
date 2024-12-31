import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditProduct = ({ open, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    rating: '',
    reviews: '',
    discount: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        image: product.image || '',
        rating: product.rating || '',
        reviews: product.reviews || '',
        discount: product.discount || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave({ ...product, ...formData });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#212B36' }}>
          Edit Product
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            inputProps={{ min: 0, max: 5, step: 0.1 }}
          />

          <TextField
            fullWidth
            label="Reviews Count"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Discount (%)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            inputProps={{ min: 0, max: 100 }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button 
          onClick={onClose}
          sx={{
            color: '#637381',
            '&:hover': {
              bgcolor: 'rgba(99, 115, 129, 0.08)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          sx={{
            bgcolor: '#212B36',
            '&:hover': {
              bgcolor: '#454F5B'
            }
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default EditProduct;
