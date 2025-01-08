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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { setHours, setMinutes, setSeconds } from 'date-fns';

const CreateVoucher = ({ onAddVoucher }) => {
  const [formData, setFormData] = useState({
    code: "",
    start: null,
    end: null,
    discountType: "percentage",
    discountValue: "",
    minimum_order_amount: "",
    total_usage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
    onAddVoucher(newVoucher);
  };

  const handleStartDateChange = (date) => {
    // Set time to start of day (00:00:00)
    const startDate = setHours(setMinutes(setSeconds(date, 0), 0), 0);
    setFormData({ ...formData, start: startDate });
  };

  const handleEndDateChange = (date) => {
    // Set time to end of day (23:59:59)
    const endDate = setHours(setMinutes(setSeconds(date, 59), 59), 23);
    setFormData({ ...formData, end: endDate });
  };

  return (
    <Dialog
      open={true}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "8px" },
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Start Date"
              value={formData.start}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDateTime={new Date()}
              views={['year', 'month', 'day', 'hours', 'minutes']}
            />

            <DateTimePicker
              label="End Date"
              value={formData.end}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDateTime={formData.start || new Date()}
              views={['year', 'month', 'day', 'hours', 'minutes']}
            />
          </LocalizationProvider>

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
