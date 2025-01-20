import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper, Box, Tabs, Tab } from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

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
    ];
    setVouchers(sampleVouchers);
  }, []);

  const handleAddVoucher = (newVoucher) => {
    const updatedVouchers = [...vouchers, newVoucher];
    setVouchers(updatedVouchers);
    setShowCreateForm(false);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Voucher Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateForm(true)}
          sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
        >
          + Add Voucher
        </Button>
      </Box>

      {showCreateForm && (
        <Box sx={{ mb: 4 }}>
          <CreateVoucher onAddVoucher={handleAddVoucher} />
        </Box>
      )}

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Available" />
        <Tab label="Expired" />
      </Tabs>

      <Grid container spacing={3}>
        {activeTab === 0 && (
          <Grid item xs={12}>
            <VoucherAvailable
              vouchers={vouchers.filter((v) => new Date(v.end_date) > new Date())}
            />
          </Grid>
        )}
        {activeTab === 1 && (
          <Grid item xs={12}>
            <VoucherExpired
              vouchers={vouchers.filter((v) => new Date(v.end_date) <= new Date())}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Voucher;
