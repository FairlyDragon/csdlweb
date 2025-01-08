import { useState, useEffect } from "react";
import { Button, Typography, Box, Tabs, Tab } from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const sampleVouchers = [
      {
        voucher_id: "v00001",
        code: "CODE1",
        start_date: "2024-01-01T00:00",
        end_date: "2024-01-08T23:59",
        discount_percentage: 30,
        discount_amount: null,
        minimum_order_amount: 20,
        total_usage_limit: 50,
        description: "FOR WHOLE ORDER"
      },
      {
        voucher_id: "v00002",
        code: "CODE2",
        start_date: "2024-01-01T00:00",
        end_date: "2024-12-31T23:59",
        discount_percentage: null,
        discount_amount: 20,
        minimum_order_amount: 40,
        total_usage_limit: 50,
        description: "FOR WHOLE ORDER"
      },
    ];
    setVouchers(sampleVouchers);
  }, []);

  const handleAddVoucher = (newVoucher) => {
    if (newVoucher) {
      const newId = `v${(vouchers.length + 1).toString().padStart(5, "0")}`;
      const voucherWithId = { ...newVoucher, voucher_id: newId };
      setVouchers([...vouchers, voucherWithId]);
    }
    setShowCreateForm(false);
  };

  const getCurrentPageVouchers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return vouchers.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(vouchers.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Voucher</Typography>
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

      {showCreateForm && <CreateVoucher onAddVoucher={handleAddVoucher} />}

      <Box sx={{ bgcolor: "white", borderRadius: 1, p: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
            setCurrentPage(1);
          }}
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
          <VoucherAvailable vouchers={getCurrentPageVouchers()} />
        ) : (
          <VoucherExpired vouchers={getCurrentPageVouchers()} />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <KeyboardArrowLeftIcon
            sx={{
              cursor: currentPage > 1 ? "pointer" : "not-allowed",
              color: currentPage > 1 ? "primary.main" : "grey.400",
            }}
            onClick={() => handlePageChange("prev")}
          />
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <KeyboardArrowRightIcon
            sx={{
              cursor: currentPage < totalPages ? "pointer" : "not-allowed",
              color: currentPage < totalPages ? "primary.main" : "grey.400",
            }}
            onClick={() => handlePageChange("next")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Voucher;
