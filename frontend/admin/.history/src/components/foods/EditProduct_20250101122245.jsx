import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  TextField,
  Rating,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const EditProduct = ({ open, product, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    details: "",
    rating: 0,
    reviews: "",
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        details: product.details || "",
        rating: product.rating || 0,
        reviews: product.reviews || "",
        image: product.image || null,
      });
    }
  }, [product]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          width: "100%",
          maxWidth: "480px",
        },
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
            Edit Product
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 0 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Food"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            sx={{ bgcolor: '#F8F9FA' }}
          />
          <TextField
            fullWidth
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            sx={{ bgcolor: '#F8F9FA' }}
          />
        </Box>

        <TextField
          fullWidth
          label="Price"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          sx={{ mb: 3, bgcolor: '#F8F9FA' }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Rating 
            value={formData.rating} 
            readOnly 
            precision={0.5}
            sx={{ color: '#FFC107' }}
          />
          <Typography sx={{ ml: 1, color: '#637381' }}>
            ({formData.reviews})
          </Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Details"
          placeholder="Type to add..."
          value={formData.details}
          onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
          sx={{ mb: 3, bgcolor: '#F8F9FA' }}
        />

        {formData.image ? (
          <Box sx={{ position: 'relative', width: 'fit-content', mb: 3 }}>
            <img
              src={formData.image}
              alt="Product"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
            <IconButton
              size="small"
              onClick={handleRemoveImage}
              sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                bgcolor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Box
            component="label"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '120px',
              border: '1px dashed #DFE3E8',
              borderRadius: '8px',
              cursor: 'pointer',
              bgcolor: '#F8F9FA',
              mb: 3,
              '&:hover': {
                bgcolor: '#F4F6F8'
              }
            }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
            <FileUploadIcon sx={{ color: '#637381', mb: 1 }} />
            <Typography sx={{ color: '#637381' }}>
              Drop files to upload
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            sx={{
              bgcolor: '#FF4842',
              '&:hover': { bgcolor: '#B72136' },
              textTransform: 'none'
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => onSave(formData)}
            sx={{
              bgcolor: '#3366FF',
              '&:hover': { bgcolor: '#1939B7' },
              textTransform: 'none'
            }}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EditProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditProduct;
