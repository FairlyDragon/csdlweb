import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditProduct = ({ open, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    rating: "",
    reviews: "",
    discount: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
        rating: product.rating || "",
        reviews: product.reviews || "",
        discount: product.discount || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          pb: 0,
          "& .MuiTypography-root": {
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#212B36",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>Edit Product</Typography>
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

      <DialogContent sx={{ p: "24px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Reviews Count"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Discount (%)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            inputProps={{ min: 0, max: 100 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions 
        sx={{ 
          p: "24px",
          pt: "12px",
          gap: 2
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "#637381",
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 1,
            "&:hover": {
              bgcolor: "rgba(99, 115, 129, 0.08)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave(formData)}
          variant="contained"
          sx={{
            bgcolor: "#212B36",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 1,
            "&:hover": {
              bgcolor: "#454F5B",
            },
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
  onSave: PropTypes.func.isRequired,
};

export default EditProduct;
