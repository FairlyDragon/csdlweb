import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper, Box } from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const sampleVouchers = [
      {
        voucher_id: "v00001",
        code: "NEWYEAR2023",
        start_date: "2023-01-01T00:00",
        end_date: "2023-12-31T23:59",
        discount_percentage: 10,
        minimum_order_amount: 50,
        total_usage_limit: 100,
        description: "FOR WHOLE ORDER",
      },
      {
        voucher_id: "v00002",
        code: "SUMMER2023",
        start_date: "2023-06-01T00:00",
        end_date: "2023-09-01T23:59",
        discount_percentage: 20,
        minimum_order_amount: 30,
        total_usage_limit: 50,
        description: "FOR WHOLE ORDER",
      },
      {
        voucher_id: "v00003",
        code: "WINTER2022",
        start_date: "2022-11-01T00:00",
        end_date: "2023-01-01T23:59",
        discount_percentage: 15,
        minimum_order_amount: 40,
        total_usage_limit: 20,
        description: "FOR WHOLE ORDER",
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
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Voucher Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateForm(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
          }}
        >
          + Create Voucher
        </Button>
      </Box>

      {showCreateForm && (
        <Box sx={{ mb: 4 }}>
          <CreateVoucher onAddVoucher={handleAddVoucher} />
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <VoucherAvailable
            vouchers={vouchers.filter((v) => new Date(v.end_date) > new Date())}
          />
        </Grid>
        <Grid item xs={12}>
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
