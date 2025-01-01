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
    id: product?.id || "",
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || "",
    details: product?.details || "",
    image: product?.image || null,
    rating: product?.rating || 5,
    discount: product?.discount || 0,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        name: product?.name || "",
        category: product?.category || "",
        price: product?.price || "",
        details: product?.details || "",
        rating: product?.rating || 0,
        reviews: product?.reviews || "",
        image: null,
      });
    }
  }, [open, product]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleDelete = () => {
    if (product && product.id) {
      onDelete(product.id);
      setConfirmDelete(false);
    }
  };

  return (
    <>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
                  placeholder="Dishes"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
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
                  placeholder="Rice"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
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
            <Box
              sx={{ display: "flex", gap: 2, mb: 3, alignItems: "flex-end" }}
            >
              <Box sx={{ width: "280px" }}>
                <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                  Price
                </Typography>
                <TextField
                  fullWidth
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      bgcolor: "#F8F9FA",
                      borderRadius: "8px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "40px" }}
              >
                <Rating
                  value={formData.rating}
                  readOnly
                  precision={0.5}
                  sx={{ color: "#FFC107" }}
                />
                <Typography sx={{ ml: 1, color: "#637381" }}>
                  ({formData.reviews})
                </Typography>
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
                rows={3}
                placeholder="Type to add..."
                value={formData.details}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, details: e.target.value }))
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F8F9FA",
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>

            {/* Upload Area or Image Preview */}
            {formData.image ? (
              <Box sx={{ position: "relative", width: "fit-content", mb: 3 }}>
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
                  onClick={handleRemoveImage}
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
                  mb: 3,
                  "&:hover": {
                    bgcolor: "#F4F6F8",
                  },
                }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <FileUploadIcon sx={{ color: "#637381", mb: 1 }} />
                <Typography sx={{ color: "#637381" }}>
                  Drop files to upload
                </Typography>
              </Box>
            )}

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                onClick={() => setConfirmDelete(true)}
                sx={{
                  bgcolor: "#FF4842",
                  color: "white",
                  "&:hover": { bgcolor: "#B72136" },
                  textTransform: "none",
                  px: 3,
                  py: 1,
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => onSave(formData)}
                sx={{
                  bgcolor: "#3366FF",
                  color: "white",
                  "&:hover": { bgcolor: "#1939B7" },
                  textTransform: "none",
                  px: 3,
                  py: 1,
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            width: "360px",
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#637381" }}>
            Are you sure you want to delete this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDelete(false)}
            sx={{
              color: "#637381",
              "&:hover": { bgcolor: "rgba(99, 115, 129, 0.08)" },
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              bgcolor: "#FF4842",
              color: "white",
              "&:hover": { bgcolor: "#B72136" },
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
