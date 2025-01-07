import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const VoucherExpired = ({ vouchers }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Expired Vouchers
      </Typography>
      {vouchers.map((voucher, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {voucher.discount_percentage}% OFF
            </Typography>
            <Typography variant="body2">Code: {voucher.code}</Typography>
            <Typography variant="body2">
              Expired on {new Date(voucher.end_date).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

VoucherExpired.propTypes = {
  vouchers: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      discount_percentage: PropTypes.number.isRequired,
      minimum_order_amount: PropTypes.number.isRequired,
      total_usage_limit: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default VoucherExpired;
