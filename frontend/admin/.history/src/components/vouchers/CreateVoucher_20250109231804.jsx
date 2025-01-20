import { useState, useEffect } from "react";
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

const CreateVoucher = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: "",
    discount_amount: 0,
    discount_percentage: 0,
    start_date: "",
    end_date: "",
    minimum_order_amount: 0,
    total_usage_limit: 0
  });

  const [availableVouchers, setAvailableVouchers] = useState([]);

  useEffect(() => {
    const fetchAvailableVouchers = async () => {
      try {
        const data = await voucherService.getAvailableVouchers();
        setAvailableVouchers(data);
      } catch (error) {
        // Xử lý lỗi
      }
    };
    fetchAvailableVouchers();
  }, []);

  const [expiredVouchers, setExpiredVouchers] = useState([]);

  useEffect(() => {
    const fetchExpiredVouchers = async () => {
      try {
        const data = await voucherService.getExpiredVouchers();
        setExpiredVouchers(data);
      } catch (error) {
        // Xử lý lỗi
      }
    };
    fetchExpiredVouchers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await voucherService.createVoucher(formData);
      onSuccess(response);
      onClose();
    } catch (error) {
      console.error("Error creating voucher:", error);
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
          onClick={onClose}
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
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
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
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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
              value={formData.discount_percentage}
              onChange={(e) =>
                setFormData({ ...formData, discount_percentage: e.target.value })
              }
              required
              InputProps={{
                endAdornment: (
                  <ToggleButtonGroup
                    value={formData.discount_percentage ? "percentage" : "amount"}
                    exclusive
                    onChange={(e, newValue) => {
                      if (newValue !== null) {
                        setFormData({ ...formData, discount_percentage: newValue === "percentage" ? formData.discount_percentage : 0, discount_amount: newValue === "amount" ? formData.discount_amount : 0 });
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
            value={formData.total_usage_limit}
            onChange={(e) =>
              setFormData({ ...formData, total_usage_limit: e.target.value })
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
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreateVoucher;
