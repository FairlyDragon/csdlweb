import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const VoucherAvailable = ({ vouchers }) => {
  return (
    <Box>
      <Typography variant="h6">Available Vouchers</Typography>
      {vouchers.map((voucher, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <CardContent>
            <Typography variant="body1">
              {voucher.code} - {voucher.discount_percentage}% OFF
            </Typography>
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
