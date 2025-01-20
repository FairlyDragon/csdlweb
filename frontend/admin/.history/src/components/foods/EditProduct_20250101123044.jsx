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
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
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
          bgcolor: "#FFFFFF",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
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
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#212B36",
              lineHeight: "36px",
            }}
          >
            Edit Product
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#637381",
              "&:hover": { bgcolor: "rgba(99, 115, 129, 0.08)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: "24px", pt: 0 }}>
        <Box sx={{ mb: "24px" }}>
          <Box sx={{ display: "flex", gap: "24px", mb: "24px" }}>
            <TextField
              fullWidth
              label="Food"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              sx={{
                bgcolor: "#F8F9FA",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "56px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              sx={{
                bgcolor: "#F8F9FA",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "56px",
                },
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            sx={{
              mb: "24px",
              bgcolor: "#F8F9FA",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "56px",
              },
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", mb: "24px" }}>
            <Rating
              value={formData.rating}
              readOnly
              precision={0.5}
              sx={{
                color: "#FFC107",
                "& .MuiRating-icon": {
                  fontSize: "24px",
                },
              }}
            />
            <Typography sx={{ ml: 1, color: "#637381" }}>
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
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, details: e.target.value }))
            }
            sx={{
              mb: "24px",
              bgcolor: "#F8F9FA",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          {formData.image ? (
            <Box
              sx={{ position: "relative", width: "fit-content", mb: "24px" }}
            >
              <img
                src={formData.image}
                alt="Product"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <IconButton
                size="small"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, image: null }))
                }
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  bgcolor: "white",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
                height: "160px",
                border: "1px dashed #DFE3E8",
                borderRadius: "12px",
                cursor: "pointer",
                bgcolor: "#F8F9FA",
                mb: "24px",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#F4F6F8",
                  borderColor: "#919EAB",
                },
              }}
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
              <FileUploadIcon
                sx={{ color: "#637381", mb: 1, fontSize: "32px" }}
              />
              <Typography sx={{ color: "#637381", fontSize: "14px" }}>
                Drop files to upload
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button
            variant="contained"
            onClick={onDelete}
            sx={{
              bgcolor: "#FF4842",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              px: "16px",
              py: "6px",
              fontSize: "14px",
              fontWeight: 600,
              "&:hover": { bgcolor: "#B72136" },
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => onSave(formData)}
            sx={{
              bgcolor: "#3366FF",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              px: "16px",
              py: "6px",
              fontSize: "14px",
              fontWeight: 600,
              "&:hover": { bgcolor: "#1939B7" },
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
