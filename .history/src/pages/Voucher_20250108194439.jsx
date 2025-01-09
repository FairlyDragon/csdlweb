import { useState, useEffect } from "react";
import { Button, Typography, Paper, Box, Tabs, Tab } from "@mui/material";
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
        voucher_id: "v00001",
        code: "NEWYEAR2024",
        start_date: "2024-01-01T00:00",
        end_date: "2024-12-31T23:59",
        discount_percentage: 30,
        discount_amount: null,
        minimum_order_amount: 20,
        total_usage_limit: 100,
        description: "FOR WHOLE ORDER",
      },
      {
        voucher_id: "v00002",
        code: "SUMMER2024",
        start_date: "2024-06-01T00:00",
        end_date: "2024-09-01T23:59",
        discount_percentage: null,
        discount_amount: 20,
        minimum_order_amount: 30,
        total_usage_limit: 50,
        description: "FOR WHOLE ORDER",
      },
      // Thêm các voucher mẫu khác nếu cần
    ];

    const storedVouchers =
      JSON.parse(localStorage.getItem("vouchers")) || sampleVouchers;
    setVouchers(storedVouchers);
  }, []);

  const handleAddVoucher = (newVoucher) => {
    if (newVoucher) {
      // Chỉ thêm voucher khi có dữ liệu hợp lệ
      const newId = `v${(vouchers.length + 1).toString().padStart(5, "0")}`;
      const voucherWithId = { ...newVoucher, voucher_id: newId };
      const updatedVouchers = [voucherWithId, ...vouchers]; // Thêm voucher mới vào đầu mảng
      setVouchers(updatedVouchers);
      localStorage.setItem("vouchers", JSON.stringify(updatedVouchers));
    }
    setShowCreateForm(false);
  };

  // Filter vouchers safely
  const getFilteredVouchers = (isExpired) => {
    return vouchers.filter((voucher) => {
      if (!voucher || !voucher.end_date) return false;
      const isVoucherExpired = new Date(voucher.end_date) <= new Date();
      return isExpired ? isVoucherExpired : !isVoucherExpired;
    });
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
          Voucher Manageme
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowCreateForm(true)}
          sx={{
            bgcolor: "#40B76A",
            "&:hover": { bgcolor: "#359c59" },
            textTransform: "none",
            borderRadius: 1,
          }}
        >
          + Add Voucher
        </Button>
      </Box>

      {showCreateForm && (
        <Box sx={{ mb: 4 }}>
          <CreateVoucher onAddVoucher={handleAddVoucher} />
        </Box>
      )}

      <Box sx={{ bgcolor: "white", borderRadius: 1 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              textTransform: "none",
              color: "#666",
              "&.Mui-selected": { color: "#40B76A" },
            },
            "& .MuiTabs-indicator": { backgroundColor: "#40B76A" },
          }}
        >
          <Tab label="Available" />
          <Tab label="Expired" />
        </Tabs>

        {activeTab === 0 ? (
          <VoucherAvailable vouchers={getFilteredVouchers(false)} />
        ) : (
          <VoucherExpired vouchers={getFilteredVouchers(true)} />
        )}
      </Box>
    </Paper>
  );
};

export default Voucher;
