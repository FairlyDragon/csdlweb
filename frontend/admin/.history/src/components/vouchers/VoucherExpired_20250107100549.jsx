import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

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

export default VoucherExpired;
