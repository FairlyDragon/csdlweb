import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const VoucherAvailable = ({ vouchers }) => {
  return (
    <Box>
      <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: 10 }}>
        Available Vouchers
      </Typography>
      {vouchers.map((voucher, index) => (
        <Card
          key={index}
          style={{
            marginBottom: 10,
            borderRadius: 8,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {voucher.discount_percentage}% OFF
            </Typography>
            <Typography variant="body2">Code: {voucher.code}</Typography>
            <Typography variant="body2">
              Valid from {voucher.start_date} to {voucher.end_date}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

VoucherAvailable.propTypes = {
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

export default VoucherAvailable;
