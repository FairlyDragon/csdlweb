import { Card, CardContent, Typography } from "@mui/material";

const VoucherAvailable = ({ vouchers }) => {
  return (
    <div>
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
    </div>
  );
};

export default VoucherAvailable;
