import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import PropTypes from "prop-types";

const CreateVoucher = ({ onAddVoucher }) => {
  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [totalUsage, setTotalUsage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVoucher = {
      code,
      start_date: startDate,
      end_date: endDate,
      discount_percentage: discount,
      minimum_order_amount: minOrderAmount,
      total_usage_limit: totalUsage,
    };
    onAddVoucher(newVoucher);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Discount (%)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Minimum Order Amount"
            value={minOrderAmount}
            onChange={(e) => setMinOrderAmount(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Total Usage"
            value={totalUsage}
            onChange={(e) => setTotalUsage(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

CreateVoucher.propTypes = {
  onAddVoucher: PropTypes.func.isRequired,
};

export default CreateVoucher;
