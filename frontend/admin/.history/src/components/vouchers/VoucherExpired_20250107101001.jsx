import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

const VoucherExpired = ({ vouchers }) => {
  return (
    <div>
      <Typography variant="h6">Expired Vouchers</Typography>
      {vouchers.map((voucher, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <CardContent>
            <Typography variant="body1">
              {voucher.code} - {voucher.discount_percentage}% OFF
            </Typography>
            <Typography variant="body2">
              Expired on {voucher.end_date}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
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
