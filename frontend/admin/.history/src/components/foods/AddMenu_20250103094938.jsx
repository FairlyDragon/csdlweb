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
  Button,
  Rating,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const initialFormState = {
  name: "",
  category: "",
  price: "",
  description: "",
  image_url: null,
  average_rating: 0,
  discount: 0,
  is_active: true,
};

const AddMenu = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(initialFormState);
      setErrors({});
      setShowAlert(false);
    }
  }, [open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Food name is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image_url) {
      newErrors.image_url = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image_url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image_url: null }));
  };

  const handleAddProduct = () => {
    if (validateForm()) {
      onAdd(formData);
      setFormData(initialFormState);
      onClose();
    } else {
      setShowAlert(true);
    }
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
            Add Menu
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: "24px", pt: 0 }}>
        {showAlert && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            onClose={() => setShowAlert(false)}
          >
            Please fill in all required fields
          </Alert>
        )}

        <Box component="form">
          {/* First Row: Food and Category */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Box sx={{ width: "280px" }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Food *
              </Typography>
              <TextField
                fullWidth
                placeholder="Dishes"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                error={!!errors.name}
                helperText={errors.name}
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
                Category *
              </Typography>
              <TextField
                fullWidth
                placeholder="Rice"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                error={!!errors.category}
                helperText={errors.category}
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
                Price *
              </Typography>
              <TextField
                fullWidth
                placeholder="0.00"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                error={!!errors.price}
                helperText={errors.price}
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
                value={formData.average_rating}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    average_rating: newValue,
                  }));
                }}
                max={5}
                sx={{ color: "#FFC107" }}
              />
            </Box>
          </Box>

          {/* Details */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
              Description *
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Type to add... (max 100 characters)"
              value={formData.description}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue.length <= 100) {
                  setFormData((prev) => ({
                    ...prev,
                    description: newValue,
                  }));
                }
              }}
              helperText={`${formData.description.length}/100`}
              error={formData.description.length === 100}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F8F9FA",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          {/* Upload Area or Image Preview */}
          {formData.image_url ? (
            <Box sx={{ position: "relative", width: "fit-content", mb: 3 }}>
              <img
                src={formData.image_url}
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

          {/* Upload Area with Error Message */}
          {errors.image_url && !formData.image_url && (
            <Typography color="error" sx={{ mb: 1, fontSize: "12px" }}>
              {errors.image_url}
            </Typography>
          )}

          {/* Add Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleAddProduct}
              sx={{
                bgcolor: "#FF5722",
                color: "white",
                "&:hover": { bgcolor: "#F4511E" },
                textTransform: "none",
                px: 3,
                py: 1,
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

AddMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddMenu;
