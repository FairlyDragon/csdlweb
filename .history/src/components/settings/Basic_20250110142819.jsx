import {
  Box,
  Typography,
  TextField,
  Switch,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useRef } from "react";
import PropTypes from "prop-types";

const Basic = ({ isActive, setIsActive }) => {
  const [qrImage, setQrImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setQrImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "140px 1fr auto",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ color: "#212B36" }}>Address</Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue="334 Nguyen Trai"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ color: "#212B36" }}>Active</Typography>
          <Switch
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "140px 1fr",
          alignItems: "center",
          "& > div": { mb: 3 },
        }}
      >
        <Typography sx={{ color: "#212B36" }}>Email</Typography>
        <TextField
          size="small"
          defaultValue="abcd@gmail.com"
          sx={{
            maxWidth: "400px",
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>Phone</Typography>
        <TextField
          size="small"
          defaultValue="0987654321"
          sx={{
            maxWidth: "400px",
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>Bank</Typography>
        <TextField
          size="small"
          defaultValue="BIDV"
          sx={{
            maxWidth: "400px",
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>Account Number</Typography>
        <TextField
          size="small"
          defaultValue="888888888888"
          sx={{
            maxWidth: "400px",
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>QR Code</Typography>
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
              <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "#919EAB" }} />
            )}
          </Box>
        </Box>

        <Typography sx={{ color: "#212B36" }}>Privacy Policy</Typography>
        <TextareaAutosize
          minRows={6}
          placeholder="Some term and condition..."
          style={{
            width: "100%",
            maxWidth: "400px",
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
  );
};

Basic.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

export default Basic;
