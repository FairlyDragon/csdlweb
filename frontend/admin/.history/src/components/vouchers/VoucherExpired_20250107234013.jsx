import { Card, CardContent, Typography, Box, Grid, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import { format } from "date-fns";

const VoucherExpired = ({ vouchers }) => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
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
                  mb: 1,
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

              <Box
                sx={{
                  bgcolor: "#ffebee",
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#d32f2f",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Expired at {format(new Date(voucher.end_date), "dd/MM/yyyy HH:mm")}
                </Typography>
              </Box>

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
