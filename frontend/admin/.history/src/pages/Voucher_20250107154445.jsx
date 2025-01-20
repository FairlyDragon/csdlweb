import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper, Box, Tabs, Tab, IconButton } from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9; // Số lượng mã giảm giá tối đa trên mỗi trang

  // Khởi tạo dữ liệu mẫu
  useEffect(() => {
    const sampleVouchers = Array.from({ length: 30 }, (_, index) => ({
      voucher_id: `v${(index + 1).toString().padStart(5, "0")}`,
      code: `CODE${index + 1}`,
      start_date: "2023-01-01T00:00",
      end_date: "2023-12-31T23:59",
      discount_percentage: Math.floor(Math.random() * 50) + 1,
      minimum_order_amount: Math.floor(Math.random() * 100) + 10,
      total_usage_limit: Math.floor(Math.random() * 50) + 1,
    }));
    setVouchers(sampleVouchers);
  }, []);

  // Hàm tính danh sách mã giảm giá hiển thị trên mỗi trang
  const paginateVouchers = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  // Hàm chuyển trang
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < Math.ceil(vouchers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm thêm voucher mới
  const handleAddVoucher = (newVoucher) => {
    const newId = `v${(vouchers.length + 1).toString().padStart(5, "0")}`;
    const voucherWithId = { ...newVoucher, voucher_id: newId };

    const updatedVouchers = [...vouchers, voucherWithId];
    setVouchers(updatedVouchers);
    setShowCreateForm(false);
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
        onChange={(e, newValue) => {
          setActiveTab(newValue);
          setCurrentPage(1); // Reset trang khi đổi tab
        }}
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
            <VoucherAvailable vouchers={paginateVouchers(vouchers)} />
          </Grid>
        )}
        {activeTab === 1 && (
          <Grid item xs={12}>
            <VoucherExpired vouchers={paginateVouchers(vouchers)} />
          </Grid>
        )}
      </Grid>

      {/* Điều hướng phân trang */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography>
          Page {currentPage} of {Math.ceil(vouchers.length / itemsPerPage)}
        </Typography>
        <IconButton
          onClick={() => handlePageChange("next")}
          disabled={currentPage === Math.ceil(vouchers.length / itemsPerPage)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Voucher;
