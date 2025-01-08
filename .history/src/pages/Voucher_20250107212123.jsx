import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper, Box, Tabs, Tab } from "@mui/material";
import CreateVoucher from "../components/vouchers/CreateVoucher";
import VoucherAvailable from "../components/vouchers/VoucherAvailable";
import VoucherExpired from "../components/vouchers/VoucherExpired";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Voucher = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sampleVouchers = [
      {
        voucher_id: "v00001",
        code: "NEWCUSTOMER_1234",
        start_date: "2024-01-01T00:00",
        end_date: "2024-12-31T23:59",
        discount_percentage: 5,
        minimum_order_amount: 0,
        total_usage_limit: 100,
        description: "FOR WHOLE ORDER"
      },
      {
        voucher_id: "v00002",
        code: "YOUR_BIRTHDAY_1234",
        start_date: "2024-01-01T00:00",
        end_date: "2024-12-31T23:59",
        discount_percentage: 10,
        minimum_order_amount: 50,
        total_usage_limit: 20,
        description: "FOR ORDERS ABOVE $50.00"
      },
      {
        voucher_id: "v00003",
        code: "COFFEELOVER",
        start_date: "2024-01-01T00:00",
        end_date: "2024-12-31T23:59",
        discount_percentage: 30,
        minimum_order_amount: 0,
        total_usage_limit: 50,
        description: "FOR WHOLE ORDER"
      },
    ];
    setVouchers(sampleVouchers);
  }, []);

  const handleAddVoucher = (newVoucher) => {
    const newId = `v${(vouchers.length + 1).toString().padStart(5, "0")}`;
    const voucherWithId = { ...newVoucher, voucher_id: newId };
    setVouchers([...vouchers, voucherWithId]);
    setShowCreateForm(false);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Voucher</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowCreateForm(true)}
            sx={{
              bgcolor: '#40B76A',
              '&:hover': { bgcolor: '#359c59' },
              textTransform: 'none',
              borderRadius: 1
            }}
          >
            + Add Voucher
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <KeyboardArrowLeftIcon />
            <Typography>Show 1-5</Typography>
            <KeyboardArrowRightIcon />
          </Box>
        </Box>
      </Box>

      {showCreateForm && (
        <CreateVoucher onAddVoucher={handleAddVoucher} />
      )}

      <Box sx={{ bgcolor: 'white', borderRadius: 1, p: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              color: '#666',
              '&.Mui-selected': {
                color: '#40B76A',
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#40B76A',
            }
          }}
        >
          <Tab label="Available" />
          <Tab label="Expired" />
        </Tabs>

        {activeTab === 0 ? (
          <VoucherAvailable vouchers={vouchers} />
        ) : (
          <VoucherExpired vouchers={vouchers} />
        )}
      </Box>
    </Box>
  );
};

export default Voucher;
