import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Pagination,
  CircularProgress,
} from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";
import { voucherService } from "../services/VoucherService";

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchVouchers();
  }, [activeTab]);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const data = activeTab === 0
        ? await voucherService.getAvailableVouchers()
        : await voucherService.getExpiredVouchers();
      setVouchers(data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVoucher = async (newVoucher) => {
    try {
      const response = await voucherService.createVoucher(newVoucher);
      setVouchers(prevVouchers => [response, ...prevVouchers]);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error adding voucher:", error);
    }
  };

  // Filter vouchers safely
  const getFilteredVouchers = (isExpired) => {
    const now = new Date();
    return vouchers.filter((voucher) => {
      if (!voucher || !voucher.end_date) return false;
      const endDate = new Date(voucher.end_date);
      const isVoucherExpired = endDate < now;
      return isExpired ? isVoucherExpired : !isVoucherExpired;
    });
  };

  const paginatedVouchers = (vouchers) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return vouchers.slice(startIndex, endIndex);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1, bgcolor: "#F9FAFB" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Voucher
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
              <CreateVoucher
                onAddVoucher={handleAddVoucher}
                onClose={() => setShowCreateForm(false)}
              />
            </Box>
          )}

          <Box sx={{ bgcolor: "#F9FAFB", borderRadius: 1 }}>
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
              <>
                <VoucherAvailable
                  vouchers={paginatedVouchers(getFilteredVouchers(false))}
                />
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={Math.ceil(
                      getFilteredVouchers(false).length / itemsPerPage
                    )}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              </>
            ) : (
              <>
                <VoucherExpired
                  vouchers={paginatedVouchers(getFilteredVouchers(true))}
                />
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={Math.ceil(
                      getFilteredVouchers(true).length / itemsPerPage
                    )}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Voucher;
