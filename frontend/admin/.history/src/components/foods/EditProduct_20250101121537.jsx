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
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 0,
          width: "100%",
          maxWidth: "480px",
        },
      }}
    >
      <DialogTitle
        sx={{
          p: "24px",
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "#212B36",
            }}
          >
            Edit Product
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#637381",
              "&:hover": { bgcolor: "rgba(99, 115, 129, 0.08)" }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Food"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            sx={{
              bgcolor: '#F4F6F8',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            sx={{
              bgcolor: '#F4F6F8',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            sx={{
              bgcolor: '#F4F6F8',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating 
            value={Number(formData.rating)} 
            readOnly 
            precision={0.1}
            sx={{ color: '#FFC107' }}
          />
          <Typography sx={{ color: '#637381' }}>
            ({formData.reviews})
          </Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Details"
          name="details"
          value={formData.details}
          onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
          placeholder="Type to add..."
          sx={{
            mb: 2,
            bgcolor: '#F4F6F8',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />

        {formData.image && (
          <Box sx={{ mb: 2, position: 'relative', width: 'fit-content' }}>
            <img 
              src={formData.image} 
              alt="Product" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '8px',
                objectFit: 'cover'
              }} 
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: 'white',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
              onClick={() => setFormData(prev => ({ ...prev, image: null }))}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            border: '1px dashed #DFE3E8',
            borderRadius: '8px',
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: '#F4F6F8',
            '&:hover': {
              bgcolor: '#EBEDF0'
            }
          }}
          component="label"
        >
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
          <UploadFileIcon sx={{ color: '#637381', mb: 1 }} />
          <Typography sx={{ color: '#637381' }}>
            Drop files to upload
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              bgcolor: '#FF4842',
              '&:hover': {
                bgcolor: '#B72136'
              }
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => onSave(formData)}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              bgcolor: '#3366FF',
              '&:hover': {
                bgcolor: '#1939B7'
              }
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
