import {
import { Card, CardContent, Typography, Box, Grid, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PropTypes from "prop-types";
import { format, differenceInHours, differenceInDays } from "date-fns";

const VoucherAvailable = ({ vouchers }) => {
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

    const hoursLeft = differenceInHours(end, now);
    const minutesLeft = Math.floor((end - now) / (1000 * 60)) % 60;
    const secondsLeft = Math.floor((end - now) / 1000) % 60;

    return `${hoursLeft.toString().padStart(2, "0")} h ${minutesLeft
      .toString()
      .padStart(2, "0")} m ${secondsLeft.toString().padStart(2, "0")} s`;
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
                <Box
                  sx={{
                    bgcolor: "#FFD700",
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ElectricBoltIcon sx={{ color: "#000" }} />
                      <Typography sx={{ color: "#000", fontWeight: 500 }}>
                        Flash sale
                      </Typography>
                    </Stack>
                    <Typography sx={{ color: "#000", fontWeight: 500 }}>
                      Ends in {getTimeRemaining(voucher.end_date)}
                    </Typography>
                  </Stack>
                </Box>
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
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VoucherAvailable;
