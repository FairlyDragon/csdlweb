import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Fee = () => {
  const [showAddFeeForm, setShowAddFeeForm] = useState(false);
  const [newFee, setNewFee] = useState({ name: "", value: "", type: "$" });
  const [additionalFees, setAdditionalFees] = useState([
    { name: "VAT", value: "10", type: "%" },
    { name: "Service", value: "1", type: "$" },
  ]);

  const handleAddFee = () => {
    if (newFee.name && newFee.value) {
      setAdditionalFees([...additionalFees, newFee]);
      setNewFee({ name: "", value: "", type: "$" });
      setShowAddFeeForm(false);
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
            <Box></Box>
            <Typography sx={{ color: "#637381" }}>
              DISTRICT
            </Typography>
            <Typography sx={{ color: "#637381" }}>
               DELIVERY CHANGES
            </Typography>
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

        {showAddFeeForm && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "#F4F6F8",
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                size="small"
                placeholder="Fee name"
                value={newFee.name}
                onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                sx={{ flex: 1 }}
              />
              <TextField
                size="small"
                placeholder="Value"
                value={newFee.value}
                onChange={(e) =>
                  setNewFee({ ...newFee, value: e.target.value })
                }
                sx={{ width: "80px" }}
              />
              <Select
                size="small"
                value={newFee.type}
                onChange={(e) => setNewFee({ ...newFee, type: e.target.value })}
                sx={{ width: "70px" }}
              >
                <MenuItem value="$">$</MenuItem>
                <MenuItem value="%">%</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                size="small"
                onClick={() => setShowAddFeeForm(false)}
                sx={{ color: "#637381" }}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleAddFee}
                sx={{
                  bgcolor: "#00AB55",
                  "&:hover": { bgcolor: "#007B55" },
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={() => setShowAddFeeForm(true)}
          sx={{
            bgcolor: "#00AB55",
            "&:hover": {
              bgcolor: "#007B55",
            },
          }}
        >
          + Add Fee
        </Button>
      </Box>
    </Box>
  );
};

export default Fee;
