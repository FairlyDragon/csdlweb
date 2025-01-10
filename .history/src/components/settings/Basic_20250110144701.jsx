import {
  Box,
  Typography,
  TextField,
  Switch,
  TextareaAutosize,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Basic = ({ isActive, setIsActive }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [qrImage, setQrImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("basicSettings");
    return savedData
      ? JSON.parse(savedData)
      : {
          address: "334 Nguyen Trai",
          email: "abcd@gmail.com",
          phone: "0987654321",
          bank: "BIDV",
          accountNumber: "888888888888",
          privacyPolicy: "Some term and condition...",
        };
  });

  // Load QR image from localStorage
  useEffect(() => {
    const savedQrImage = localStorage.getItem("qrImage");
    if (savedQrImage) {
      setQrImage(savedQrImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newQrImage = e.target.result;
        setQrImage(newQrImage);
        localStorage.setItem("qrImage", newQrImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setQrImage(null);
    localStorage.removeItem("qrImage");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("basicSettings", JSON.stringify(formData));
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow:
          "0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      {/* Display Section */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          startIcon={<EditIcon />}
          onClick={() => setOpenDialog(true)}
          variant="contained"
          sx={{
            bgcolor: "#00AB55",
            "&:hover": { bgcolor: "#007B55" },
          }}
        >
          Edit Information
        </Button>
      </Box>

      {/* Information Grid */}
      <Box sx={{ display: "grid", gap: 3 }}>
        {/* Address & Active Status */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "140px 1fr auto",
            p: 2,
            bgcolor: "#F4F6F8",
            borderRadius: 1,
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#637381", fontWeight: 500 }}>
            Address
          </Typography>
          <Typography
            sx={{
              color: "#212B36",
              p: 1.5,
              bgcolor: "white",
              borderRadius: 1,
              border: "1px solid #DFE3E8",
            }}
          >
            {formData.address}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ color: "#637381" }}>Active</Typography>
            <Switch checked={isActive} disabled />
          </Box>
        </Box>

        {/* Other Fields */}
        {[
          { label: "Email", value: formData.email },
          { label: "Phone", value: formData.phone },
          { label: "Bank", value: formData.bank },
          { label: "Account Number", value: formData.accountNumber },
        ].map((field) => (
          <Box
            key={field.label}
            sx={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              p: 2,
              bgcolor: "#F4F6F8",
              borderRadius: 1,
              alignItems: "center",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "#F9FAFB",
              },
            }}
          >
            <Typography sx={{ color: "#637381", fontWeight: 500 }}>
              {field.label}
            </Typography>
            <Typography
              sx={{
                color: "#212B36",
                p: 1.5,
                bgcolor: "white",
                borderRadius: 1,
                border: "1px solid #DFE3E8",
              }}
            >
              {field.value}
            </Typography>
          </Box>
        ))}

        {/* QR Code Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            p: 2,
            bgcolor: "#F4F6F8",
            borderRadius: 1,
            alignItems: "start",
          }}
        >
          <Typography sx={{ color: "#637381", fontWeight: 500 }}>
            QR Code
          </Typography>
          <Box
            sx={{
              width: 120,
              height: 120,
              border: "1px solid #DFE3E8",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "white",
              overflow: "hidden",
            }}
          >
            {qrImage ? (
              <img
                src={qrImage}
                alt="QR Code"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "#919EAB" }} />
            )}
          </Box>
        </Box>

        {/* Privacy Policy Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            p: 2,
            bgcolor: "#F4F6F8",
            borderRadius: 1,
            alignItems: "start",
          }}
        >
          <Typography sx={{ color: "#637381", fontWeight: 500 }}>
            Privacy Policy
          </Typography>
          <Typography
            sx={{
              color: "#212B36",
              whiteSpace: "pre-wrap",
              p: 2,
              bgcolor: "white",
              borderRadius: 1,
              border: "1px solid #DFE3E8",
              minHeight: "100px",
            }}
          >
            {formData.privacyPolicy}
          </Typography>
        </Box>
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2, color: "#212B36", fontWeight: 600 }}>
          Edit Information
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                label="Address"
                fullWidth
                value={formData.address}
                onChange={handleChange("address")}
                sx={{ flex: 1 }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>Active</Typography>
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Box>
            </Box>

            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange("email")}
            />

            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange("phone")}
            />

            <TextField
              label="Bank"
              fullWidth
              value={formData.bank}
              onChange={handleChange("bank")}
            />

            <TextField
              label="Account Number"
              fullWidth
              value={formData.accountNumber}
              onChange={handleChange("accountNumber")}
            />

            <Box>
              <Typography sx={{ mb: 1 }}>QR Code</Typography>
              <Box sx={{ position: "relative" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                <Box
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "1px dashed #919EAB",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  {qrImage ? (
                    <>
                      <img
                        src={qrImage}
                        alt="QR Code"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage();
                        }}
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                          bgcolor: "white",
                          boxShadow: 1,
                          "&:hover": {
                            bgcolor: "#f5f5f5",
                          },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 20, color: "#637381" }} />
                      </IconButton>
                    </>
                  ) : (
                    <AddPhotoAlternateIcon
                      sx={{ fontSize: 40, color: "#919EAB" }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ mb: 1 }}>Privacy Policy</Typography>
              <TextareaAutosize
                minRows={6}
                value={formData.privacyPolicy}
                onChange={handleChange("privacyPolicy")}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #DFE3E8",
                  backgroundColor: "#F4F6F8",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "#637381" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

Basic.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

export default Basic;
