import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper, Box, Tabs, Tab } from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  // Khởi tạo dữ liệu mẫu
  useEffect(() => {
    const sampleVouchers = [
      {
        voucher_id: "v00001", // Sử dụng chuỗi làm voucher_id
        code: "NEWYEAR2023",
        start_date: "2023-01-01T00:00",
        end_date: "2023-12-31T23:59",
        discount_percentage: 10,
        minimum_order_amount: 50,
        total_usage_limit: 100,
      },
      {
        voucher_id: "v00002",
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

  // Hàm tạo voucher_id tự động
  const generateVoucherId = () => {
    const lastVoucher = vouchers[vouchers.length - 1];
    if (lastVoucher) {
      const lastIdNumber = parseInt(lastVoucher.voucher_id.slice(1)); // Lấy số từ chuỗi ID cuối
      return `v${(lastIdNumber + 1).toString().padStart(5, "0")}`; // Tạo ID mới
    }
    return "v00001"; // ID mặc định
  };

  // Hàm thêm voucher mới
  const handleAddVoucher = (newVoucher) => {
    const newId = generateVoucherId(); // Gọi hàm tạo voucher_id
    const voucherWithId = { ...newVoucher, voucher_id: newId }; // Thêm voucher_id vào voucher mới

    const updatedVouchers = [...vouchers, voucherWithId];
    setVouchers(updatedVouchers); // Cập nhật danh sách voucher
    setShowCreateForm(false); // Đóng form
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Header */}
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

      {/* Hiển thị form tạo voucher */}
      {showCreateForm && (
        <Box sx={{ mb: 4 }}>
          <CreateVoucher onAddVoucher={handleAddVoucher} />
        </Box>
      )}

      {/* Tabs chuyển đổi giữa Available và Expired */}
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

      {/* Hiển thị danh sách voucher */}
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
