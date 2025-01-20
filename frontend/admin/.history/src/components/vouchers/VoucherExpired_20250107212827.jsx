import { Card, CardContent, Typography, Box, Grid, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";

const VoucherExpired = ({ vouchers }) => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  return (
    <Grid container spacing={3}>
      {vouchers.map((voucher) => (
        <Grid item xs={12} sm={6} md={4} key={voucher.voucher_id}>
          <Card
            sx={{
              borderRadius: 1,
              border: "1px solid #e0e0e0",
              boxShadow: "none",
              opacity: 0.7,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {voucher.discount_percentage}% OFF
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {voucher.description}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography variant="body2" color="primary">
                  Code: {voucher.code}
                </Typography>
                <IconButton 
                  size="small"
                  onClick={() => handleCopyCode(voucher.code)}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                • {new Date(voucher.start_date).toLocaleDateString()} -{" "}
                {new Date(voucher.end_date).toLocaleDateString()}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                • Minimum order amount: ${voucher.minimum_order_amount}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                • Total usage limit: {voucher.total_usage_limit}
              </Typography>
              <Typography
                variant="caption"
                color="error"
                sx={{ 
                  display: "block",
                  mt: 1,
                  fontWeight: "bold"
                }}
              >
                Expired on {new Date(voucher.end_date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

VoucherExpired.propTypes = {
  vouchers: PropTypes.arrayOf(
    PropTypes.shape({
      voucher_id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      discount_percentage: PropTypes.number.isRequired,
      minimum_order_amount: PropTypes.number.isRequired,
      total_usage_limit: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VoucherExpired;
