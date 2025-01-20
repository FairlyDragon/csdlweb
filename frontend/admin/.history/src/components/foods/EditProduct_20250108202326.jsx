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
  Switch,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const EditProduct = ({ open, product, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    menuitem_id: "",
    name: "",
    category: "",
    price: "",
    description: "",
    image_url: null,
    average_rating: 5,
    discount: 0,
    is_active: true,
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        menuitem_id: product.menuitem_id,
      });
    }
  }, [product]);

  const handleSave = () => {
    console.log('Product:', product);
    console.log('FormData before save:', formData);

    if (!formData.menuitem_id) {
      console.error('menuitem_id is missing!');
      return;
    }

    onSave(formData);
    onClose();
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
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Box sx={{ width: "280px" }}>
                <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                  Food
                </Typography>
                <TextField
                  fullWidth
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: "#637381", fontSize: "14px" }}>
                    Rating
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.is_active}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            is_active: e.target.checked,
                          }))
                        }
                        color="success"
                      />
                    }
                    label={formData.is_active ? "In Stock" : "Out of Stock"}
                    sx={{ m: 0 }}
                  />
                </Box>
                <Rating
                  value={formData.average_rating}
                  onChange={(_, newValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      average_rating: newValue,
                    }));
                  }}
                  sx={{ color: "#FFC107" }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
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
                onKeyDown={(e) => {
                  if (
                    formData.description.length >= 100 &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete"
                  ) {
                    e.preventDefault();
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

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1, color: "#637381", fontSize: "14px" }}>
                Image
              </Typography>
              {formData.image_url ? (
                <Box sx={{ position: "relative", width: "fit-content" }}>
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
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image_url: null }))
                    }
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
                          setFormData((prev) => ({
                            ...prev,
                            image_url: reader.result,
                          }));
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
            onClick={() => setConfirmDelete(true)}
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
            onClick={() => {
              onDelete(formData.menuitem_id);
              setConfirmDelete(false);
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
        </DialogActions>
      </Dialog>
    </>
  );
};

EditProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    menuitem_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    average_rating: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    is_active: PropTypes.bool.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditProduct;
