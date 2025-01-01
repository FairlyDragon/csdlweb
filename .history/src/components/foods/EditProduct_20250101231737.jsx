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
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const EditProduct = ({ open, product, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    details: "",
    image: null,
    rating: 5,
    discount: 0
  });

  // Cập nhật formData khi product thay đổi
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        details: product.details || "",
        image: product.image || null,
        rating: product.rating || 5,
        discount: product.discount || 0
      });
    }
  }, [product]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "720px",
        },
      }}
    >
      <DialogTitle sx={{ p: "24px", pb: "16px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
            Edit Product
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: "24px", pt: 0 }}>
        <Box component="form">
          {/* First Row: Food and Category */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Box sx={{ width: "280px" }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Food
              </Typography>
              <TextField
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    bgcolor: "#F8F9FA",
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
            <Box sx={{ width: "280px" }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Category
              </Typography>
              <TextField
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    bgcolor: "#F8F9FA",
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Second Row: Price and Rating */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Box sx={{ width: "280px" }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Price
              </Typography>
              <TextField
                fullWidth
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    bgcolor: "#F8F9FA",
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
            <Box sx={{ width: "280px" }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Rating
              </Typography>
              <Rating
                value={formData.rating}
                onChange={(_, newValue) => {
                  setFormData(prev => ({ ...prev, rating: newValue }));
                }}
                sx={{ color: "#FFC107" }}
              />
            </Box>
          </Box>

          {/* Details */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
              Details
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F8F9FA",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          {/* Image Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
              Image
            </Typography>
            {formData.image ? (
              <Box sx={{ position: "relative", width: "fit-content" }}>
                <img
                  src={formData.image}
                  alt="Product"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    bgcolor: "white",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Box
                component="label"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100px",
                  border: "1px dashed #DFE3E8",
                  borderRadius: "8px",
                  cursor: "pointer",
                  bgcolor: "#F8F9FA",
                  "&:hover": { bgcolor: "#F4F6F8" },
                }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({ ...prev, image: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <FileUploadIcon sx={{ color: "#637381", mb: 1 }} />
                <Typography sx={{ color: "#637381" }}>
                  Drop files to upload
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this product?")) {
              onDelete(formData.id);
            }
          }}
          sx={{
            bgcolor: "#FF4842",
            color: "white",
            "&:hover": { bgcolor: "#B72136" },
            textTransform: "none",
          }}
        >
          Delete
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            bgcolor: "#3366FF",
            color: "white",
            "&:hover": { bgcolor: "#1939B7" },
            textTransform: "none",
          }}
        >
          Save
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
  onDelete: PropTypes.func.isRequired,
};

export default EditProduct;
