import { useState } from "react";
import { TextField, Button, Grid, Box, Paper, Typography, InputAdornment } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";

const CreateVoucher = ({ onAddVoucher }) => {
  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [totalUsage, setTotalUsage] = useState("");

  // Gửi dữ liệu sau khi nhấn "Create"
  const handleSubmit = (e) => {
    e.preventDefault();
    const newVoucher = {
      code,
      start_date: startDate,
      end_date: endDate,
      discount_percentage: Number(discount),
      minimum_order_amount: Number(minOrderAmount),
      total_usage_limit: Number(totalUsage),
    };
    onAddVoucher(newVoucher); // Gửi dữ liệu về component cha
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Create New Voucher
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Voucher Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              variant="outlined"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Minimum Order Amount"
              type="number"
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(e.target.value)}
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total Usage Limit"
              type="number"
              value={totalUsage}
              onChange={(e) => setTotalUsage(e.target.value)}
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ mt: 2, px: 4, py: 1, borderRadius: 2, textTransform: "none" }}
            >
              Create Voucher
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

CreateVoucher.propTypes = {
  onAddVoucher: PropTypes.func.isRequired,
};

export default CreateVoucher;
