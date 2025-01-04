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

  useEffect(() => {
    if (open) {
      setFormData(initialFormState);
    }
  }, [open]);

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
    onAdd(formData);
    setFormData(initialFormState);
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
            <Box sx={{ width: "280px" }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Rating
              </Typography>
              <Rating
                value={formData.average_rating}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    average_rating: newValue || 0,
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
              Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Type to add..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
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
