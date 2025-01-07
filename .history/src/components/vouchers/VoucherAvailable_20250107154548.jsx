import { Card, CardContent, Typography, Box, Chip, IconButton, Grid } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";

const VoucherAvailable = ({ vouchers }) => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 3,
        }}
      >
        Available Vouchers
      </Typography>
      <Grid container spacing={3}>
        {vouchers.map((voucher) => (
          <Grid item xs={12} sm={6} md={4} key={voucher.voucher_id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {voucher.discount_percentage}% OFF
                  </Typography>
                  <IconButton
                    onClick={() => handleCopyCode(voucher.code)}
                    aria-label="copy code"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Code: {voucher.code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Valid from {new Date(voucher.start_date).toLocaleDateString()} to{" "}
                  {new Date(voucher.end_date).toLocaleDateString()}
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  <Chip
                    label={`Min. Order: $${voucher.minimum_order_amount}`}
                    size="small"
                    color="secondary"
                  />
                  <Chip
                    label={`Usage Limit: ${voucher.total_usage_limit}`}
                    size="small"
                    color="info"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

VoucherAvailable.propTypes = {
  vouchers: PropTypes.arrayOf(
    PropTypes.shape({
      voucher_id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      discount_percentage: PropTypes.number.isRequired,
      minimum_order_amount: PropTypes.number.isRequired,
      total_usage_limit: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default VoucherAvailable;
