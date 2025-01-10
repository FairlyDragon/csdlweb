import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";

const Fee = () => {
  const [openAddFeeDialog, setOpenAddFeeDialog] = useState(false);
  const [openShippingDialog, setOpenShippingDialog] = useState(false);
  const [newFee, setNewFee] = useState({ name: "", value: "", type: "$" });
  const [additionalFees, setAdditionalFees] = useState([
    { name: "VAT", value: "10", type: "%" },
    { name: "Service", value: "1", type: "$" },
  ]);

  // Load initial data from localStorage or use default
  const [shippingFees, setShippingFees] = useState(() => {
    const saved = localStorage.getItem('shippingFees');
    return saved ? JSON.parse(saved) : [
      { district: "Đống Đa", fee: "1$" },
      { district: "Hà Đông", fee: "1$" },
      { district: "Cầu giấy", fee: "2$" },
      { district: "Hai Bà Trưng", fee: "2$" },
      { district: "Hoàng Mai", fee: "2$" },
      { district: "Ba Đình", fee: "3$" },
      { district: "Nam Từ Liêm", fee: "3$" },
      { district: "Bắc Từ Liêm", fee: "3$" },
    ];
  });

  const [editableShippingFees, setEditableShippingFees] = useState([...shippingFees]);

  // Save to localStorage whenever shippingFees changes
  useEffect(() => {
    localStorage.setItem('shippingFees', JSON.stringify(shippingFees));
  }, [shippingFees]);

  const handleSaveShippingChanges = () => {
    setShippingFees(editableShippingFees);
    setOpenShippingDialog(false);
  };

  const handleAddFee = () => {
    if (newFee.name && newFee.value) {
      setAdditionalFees([...additionalFees, newFee]);
      setNewFee({ name: "", value: "", type: "$" });
      setOpenDialog(false);
    }
  };

  const handleDeleteFee = (index) => {
    setAdditionalFees(additionalFees.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 1200, display: "flex", gap: 4 }}>
      {/* Shipping Section - Left Column */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212B36",
            mb: 2,
          }}
        >
          Shipping
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography sx={{ color: "#637381" }}>DISTRICT</Typography>
            </Box>
            <Typography sx={{ color: "#637381" }}>DELIVERY CHANGES</Typography>
          </Box>

          {[
            { range: "Đống Đa", defaultValue: "1$" },
            { range: "Hà Đông", defaultValue: "1$" },
            { range: "Cầu giấy", defaultValue: "2$" },
            { range: "Hai Bà Trưng", defaultValue: "2$" },
            { range: "Hoàng Mai", defaultValue: "2$" },
            { range: "Ba Đình", defaultValue: "3$" },
            { range: "Nam Tử Liêm", defaultValue: "3$" },
            { range: "Bắc Từ Liêm", defaultValue: "3$" },
          ].map((item) => (
            <Box
              key={item.range}
              sx={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#637381" }}>{item.range}</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue={item.defaultValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F4F6F8",
                    maxWidth: "200px",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Addition Fee Section - Right Column */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212B36",
            mb: 2,
          }}
        >
          Addition Fee
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          {additionalFees.map((fee, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography sx={{ width: 80, color: "#637381" }}>
                {fee.name}
              </Typography>
              <TextField
                size="small"
                value={`${fee.value}${fee.type}`}
                sx={{
                  width: "200px",
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F4F6F8",
                  },
                }}
              />
              <IconButton onClick={() => handleDeleteFee(index)}>
                <CloseIcon sx={{ color: "#637381" }} />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{
            bgcolor: "#00AB55",
            "&:hover": {
              bgcolor: "#007B55",
            },
          }}
        >
          + Add Fee
        </Button>

        {/* Dialog for adding new fee */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              width: "400px",
              maxWidth: "90%",
            },
          }}
        >
          <DialogTitle
            sx={{
              pb: 2,
              color: "#212B36",
              fontWeight: 600,
            }}
          >
            Add New Fee
          </DialogTitle>

          <DialogContent sx={{ pb: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Fee Name"
                value={newFee.name}
                onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  size="small"
                  label="Value"
                  value={newFee.value}
                  onChange={(e) =>
                    setNewFee({ ...newFee, value: e.target.value })
                  }
                  sx={{ flex: 1 }}
                />
                <Select
                  size="small"
                  value={newFee.type}
                  onChange={(e) =>
                    setNewFee({ ...newFee, type: e.target.value })
                  }
                  sx={{ width: "100px" }}
                >
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="%">%</MenuItem>
                </Select>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{ color: "#637381" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddFee}
              sx={{
                bgcolor: "#00AB55",
                "&:hover": { bgcolor: "#007B55" },
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Fee;
