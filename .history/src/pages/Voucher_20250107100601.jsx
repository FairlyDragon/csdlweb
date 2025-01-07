import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const storedVouchers = JSON.parse(localStorage.getItem("vouchers")) || [];
    setVouchers(storedVouchers);
  }, []);

  const handleAddVoucher = (newVoucher) => {
    const updatedVouchers = [...vouchers, newVoucher];
    setVouchers(updatedVouchers);
    localStorage.setItem("vouchers", JSON.stringify(updatedVouchers));
    setShowCreateForm(false);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Voucher
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowCreateForm(true)}
        style={{ marginBottom: 20 }}
      >
        + Add Voucher
      </Button>
      {showCreateForm && <CreateVoucher onAddVoucher={handleAddVoucher} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VoucherAvailable
            vouchers={vouchers.filter((v) => new Date(v.end_date) > new Date())}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <VoucherExpired
            vouchers={vouchers.filter(
              (v) => new Date(v.end_date) <= new Date()
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Voucher;
