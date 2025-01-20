import { Card, CardContent, Typography, Box, Grid, Stack, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PropTypes from "prop-types";
import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInDays,
} from "date-fns";
import { useState, useEffect } from "react";

const VoucherAvailable = ({ vouchers, onEditClick }) => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  const shouldShowFlashSale = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    return differenceInDays(end, now) <= 1;
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);

    const hours = differenceInHours(end, now);
    const minutes = differenceInMinutes(end, now) % 60;
    const seconds = differenceInSeconds(end, now) % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  // Flash Sale Timer với style mới
  const FlashSaleTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(getTimeRemaining(endDate));
      }, 1000);

      return () => clearInterval(timer);
    }, [endDate]);

    return (
      <Box
        sx={{
          bgcolor: "#FFF3E0",
          p: 2,
          borderRadius: 2,
          mb: 2,
          border: "1px solid #FFE0B2",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <ElectricBoltIcon sx={{ color: "#FF9800" }} />
          <Typography sx={{ color: "#E65100", fontWeight: 600 }}>
            Flash Sale
          </Typography>
          <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            <TimeBox value={timeLeft.hours} label="h" />
            <TimeBox value={timeLeft.minutes} label="m" />
            <TimeBox value={timeLeft.seconds} label="s" />
          </Box>
        </Stack>
      </Box>
    );
  };

  const TimeBox = ({ value, label }) => (
    <Box
      sx={{
        bgcolor: "#FF9800",
        px: 1,
        py: 0.5,
        borderRadius: 1,
        color: "white",
        fontWeight: "bold",
        minWidth: 40,
        textAlign: "center",
      }}
    >
      {value}
      {label}
    </Box>
  );

  // Thêm PropTypes cho các components con
  FlashSaleTimer.propTypes = {
    endDate: PropTypes.string.isRequired,
  };

  TimeBox.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  // Sort vouchers by creation date/ID (newest first)
  const sortedVouchers = [...vouchers].sort((a, b) =>
    b.voucher_id.localeCompare(a.voucher_id)
  );

  return (
    <Grid container spacing={3}>
      {sortedVouchers.map((voucher) => (
        <Grid item xs={12} sm={6} md={4} key={voucher.voucher_id}>
          <Card
            sx={{
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              boxShadow: "none",
              background: "linear-gradient(135deg, #FFFFFF 0%, #F4F4F4 100%)",
              position: "relative",
            }}
          >

            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#1a237e",
                  fontSize: "32px",
                }}
              >
                {voucher.discount_percentage
                  ? `${voucher.discount_percentage}% OFF`
                  : `$${voucher.discount_amount} OFF`}
              </Typography>
              <Typography
                sx={{
                  color: "#1a237e",
                  fontWeight: 500,
                  fontSize: "16px",
                  mb: 2,
                }}
              >
                {voucher.description}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography
                  sx={{
                    color: "#2196f3",
                    fontSize: "14px",
                  }}
                >
                  Code: {voucher.code}
                </Typography>
                <Box
                  onClick={() => handleCopyCode(voucher.code)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#2196f3",
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                  <Typography>Copy</Typography>
                </Box>
              </Stack>

              {/* Flash Sale Timer - Only show if less than 1 day remaining */}
              {shouldShowFlashSale(voucher.end_date) && (
                <FlashSaleTimer endDate={voucher.end_date} />
              )}

              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                  • {format(new Date(voucher.start_date), "dd/MM/yyyy HH:mm")} -{" "}
                  {format(new Date(voucher.end_date), "dd/MM/yyyy HH:mm")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Minimum order amount: ${voucher.minimum_order_amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Total usage limit: {voucher.total_usage_limit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Used: {voucher.used}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

VoucherAvailable.propTypes = {
  vouchers: PropTypes.arrayOf(
    PropTypes.shape({
      voucher_id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      discount_percentage: PropTypes.number,
      discount_amount: PropTypes.number,
      minimum_order_amount: PropTypes.number.isRequired,
      total_usage_limit: PropTypes.number.isRequired,
      used: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default VoucherAvailable;
