import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { format } from "date-fns";

const VoucherExpired = ({ vouchers }) => {
  // Kiểm tra và sắp xếp vouchers
  const sortedVouchers = vouchers && vouchers.length > 0 
    ? [...vouchers].sort((a, b) => {
        if (!a.voucher_id || !b.voucher_id) return 0;
        return b.voucher_id.localeCompare(a.voucher_id);
      })
    : [];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Expired Vouchers
      </Typography>
      <Grid container spacing={3}>
        {sortedVouchers.map((voucher) => (
          <Grid item xs={12} sm={6} md={4} key={voucher.voucher_id}>
            <Card
              sx={{
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                opacity: 0.7,
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
                {/* Rest of your component */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

VoucherExpired.propTypes = {
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

export default VoucherExpired;
