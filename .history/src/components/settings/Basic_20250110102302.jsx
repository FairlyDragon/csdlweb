import {
  Box,
  Typography,
  TextField,
  Switch,
  TextareaAutosize,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PropTypes from "prop-types";

const Basic = ({ isActive, setIsActive }) => {
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
          fullWidth
          size="small"
          defaultValue="abcd@gmail.com"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>Phone</Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue="0987654321"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>Bank</Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue="BIDV"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>Account Number</Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue="888888888888"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F4F6F8",
            },
          }}
        />

        <Typography sx={{ color: "#212B36" }}>QR Code</Typography>
        <Box
          sx={{
            width: 120,
            height: 120,
            border: "1px dashed #919EAB",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "#919EAB" }} />
        </Box>

        <Typography sx={{ color: "#212B36" }}>Privacy Policy</Typography>
        <TextareaAutosize
          minRows={6}
          placeholder="Some term and condition..."
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
  );
};

Basic.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

export default Basic;
