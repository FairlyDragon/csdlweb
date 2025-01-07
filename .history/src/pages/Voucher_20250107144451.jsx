import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper} from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const sampleVouchers = [
      {
        code: "NEWYEAR2023",
        start_date: "2023-01-01T00:00",
        end_date: "2023-12-31T23:59",
        discount_percentage: 10,
        minimum_order_amount: 50,
        total_usage_limit: 100,
      },
      {
        code: "SUMMER2023",
        start_date: "2023-06-01T00:00",
        end_date: "2023-09-01T23:59",
        discount_percentage: 20,
        minimum_order_amount: 30,
        total_usage_limit: 50,
      },
      {
        code: "WINTER2022",
        start_date: "2022-11-01T00:00",
        end_date: "2023-01-01T23:59",
        discount_percentage: 15,
        minimum_order_amount: 40,
        total_usage_limit: 20,
      },
    ];

    const storedVouchers =
      JSON.parse(localStorage.getItem("vouchers")) || sampleVouchers;
    setVouchers(storedVouchers);
  }, []);

  const handleAddVoucher = (newVoucher) => {
    const updatedVouchers = [...vouchers, newVoucher];
    setVouchers(updatedVouchers);
    localStorage.setItem("vouchers", JSON.stringify(updatedVouchers));
    setShowCreateForm(false);
  };

  return (
    <Paper style={{ padding: 20, borderRadius: 8 }}>
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
