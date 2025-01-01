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
          {/* Food and Category Row */}
          <Box sx={{ mb: 3 }}>
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
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  bgcolor: "#F8F9FA",
                  borderRadius: "8px",
                },
              }}
            />

            <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
              Category
            </Typography>
            <TextField
              fullWidth
              placeholder="Rice"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
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

          {/* Price and Rating Row */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
              Price
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                sx={{
                  width: "200px",
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    bgcolor: "#F8F9FA",
                    borderRadius: "8px",
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
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

          {/* Upload Area */}
          <Box
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
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
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData((prev) => ({ ...prev, image: reader.result }));
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

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              sx={{
                bgcolor: "#FF4842",
                "&:hover": { bgcolor: "#B72136" },
                textTransform: "none",
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={() => onSave(formData)}
              sx={{
                bgcolor: "#3366FF",
                "&:hover": { bgcolor: "#1939B7" },
                textTransform: "none",
              }}
            >
              Save
            </Button>
          </Box>
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
