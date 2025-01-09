import { useState } from 'react';
import { 
  Card, CardContent, Typography, Box, Grid, Stack,
  Pagination, Button
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import { format, differenceInHours } from "date-fns";

const ITEMS_PER_PAGE = 9;

const VoucherExpired = ({ vouchers }) => {
  const [page, setPage] = useState(1);

  // Sort vouchers by end_date (newest first)
  const sortedVouchers = [...vouchers].sort((a, b) => 
    new Date(b.end_date) - new Date(a.end_date)
  );

  // Pagination
  const totalPages = Math.ceil(sortedVouchers.length / ITEMS_PER_PAGE);
  const currentVouchers = sortedVouchers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {currentVouchers.map((voucher) => (
          <Grid item xs={12} sm={6} md={4} key={voucher.voucher_id}>
            <Card
              sx={{
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                opacity: 0.7,
                position: 'relative',
                overflow: 'visible'
              }}
            >
              {/* Discount Label */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: 20,
                  bgcolor: '#FF4842',
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 'bold'
                }}
              >
                {voucher.discount_percentage
                  ? `${voucher.discount_percentage}% OFF`
                  : `$${voucher.discount_amount} OFF`}
              </Box>

              <CardContent sx={{ pt: 4, px: 3, pb: 3 }}>
                <Typography
                  sx={{
                    color: "#212B36",
                    fontWeight: 600,
                    fontSize: "14px",
                    mb: 2,
                  }}
                >
                  FOR WHOLE ORDER
                </Typography>

                {/* Code Section */}
                <Box
                  sx={{
                    bgcolor: '#F4F6F8',
                    p: 2,
                    borderRadius: 1,
                    mb: 2
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography sx={{ color: '#212B36', fontWeight: 500 }}>
                      Code: {voucher.code}
                    </Typography>
                    <Button
                      startIcon={<ContentCopyIcon />}
                      onClick={() => handleCopyCode(voucher.code)}
                      sx={{
                        color: '#212B36',
                        '&:hover': { bgcolor: 'transparent', opacity: 0.8 }
                      }}
                    >
                      Copy
                    </Button>
                  </Stack>
                </Box>

                {/* Expired Notice */}
                <Box
                  sx={{
                    bgcolor: "#ffebee",
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Typography sx={{ color: "#d32f2f", fontSize: "13px" }}>
                    Expired at {format(new Date(voucher.end_date), "dd/MM/yyyy HH:mm")}
                  </Typography>
                </Box>

                {/* Details */}
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    • Valid until: {format(new Date(voucher.end_date), "dd/MM/yyyy HH:mm")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Minimum order: ${voucher.minimum_order_amount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Usage limit: {voucher.total_usage_limit}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination 
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
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
