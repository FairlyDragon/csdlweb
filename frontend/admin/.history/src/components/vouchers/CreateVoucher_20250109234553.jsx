import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { voucherService } from "../../services/VoucherService";

const CreateVoucher = ({ onAddVoucher }) => {
  const [formData, setFormData] = useState({
    code: "",
    start: "",
    end: "",
    discountType: "percentage", // 'percentage' or 'amount'
    discountValue: "",
    minimum_order_amount: "",
    total_usage: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Kiểm tra code đã tồn tại
      const codeExists = await voucherService.checkCodeExists(formData.code);
      if (codeExists) {
        setError("Voucher code already exists. Please use a different code.");
        return;
      }

      const newVoucher = {
        code: formData.code,
        start_date: formData.start,
        end_date: formData.end,
        discount_percentage:
          formData.discountType === "percentage"
            ? Number(formData.discountValue)
            : null,
        discount_amount:
          formData.discountType === "amount"
            ? Number(formData.discountValue)
            : null,
        minimum_order_amount: Number(formData.minimum_order_amount),
        total_usage_limit: Number(formData.total_usage),
        description: "FOR WHOLE ORDER",
      };

      await onAddVoucher(newVoucher);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Dialog
      open={true}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          color: "#333",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        Create Voucher
        <IconButton
          onClick={() => onAddVoucher(null)}
          sx={{
            color: "#666",
            "&:hover": { color: "#333" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            placeholder="Code *"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Start *"
            type="datetime-local"
            value={formData.start}
            onChange={(e) =>
              setFormData({ ...formData, start: e.target.value })
            }
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="End *"
            type="datetime-local"
            value={formData.end}
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              fullWidth
              placeholder="Discount *"
              type="number"
              value={formData.discountValue}
              onChange={(e) =>
                setFormData({ ...formData, discountValue: e.target.value })
              }
              required
              InputProps={{
                endAdornment: (
                  <ToggleButtonGroup
                    value={formData.discountType}
                    exclusive
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        setFormData({ ...formData, discountType: newValue });
                      }
                    }}
                    size="small"
                  >
                    <ToggleButton value="percentage">%</ToggleButton>
                    <ToggleButton value="amount">$</ToggleButton>
                  </ToggleButtonGroup>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </Box>

          <TextField
            fullWidth
            placeholder="Minimum order amount *"
            type="number"
            value={formData.minimum_order_amount}
            onChange={(e) =>
              setFormData({ ...formData, minimum_order_amount: e.target.value })
            }
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ color: "#666", pl: 1 }}>$</Box>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Total usage *"
            type="number"
            value={formData.total_usage}
            onChange={(e) =>
              setFormData({ ...formData, total_usage: e.target.value })
            }
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: "8px",
              backgroundColor: "#4285f4",
              "&:hover": {
                backgroundColor: "#3367d6",
              },
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CreateVoucher.propTypes = {
  onAddVoucher: PropTypes.func.isRequired,
};

export default CreateVoucher;
