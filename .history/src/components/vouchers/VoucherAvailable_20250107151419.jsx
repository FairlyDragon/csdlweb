import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PropTypes from "prop-types";

const VoucherAvailable = ({ vouchers }) => {
  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <LocalOfferIcon color="primary" />
        Available Vouchers
      </Typography>
      {vouchers.map((voucher, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {voucher.discount_percentage}% OFF
              </Typography>
              <Chip 
                label={voucher.code}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Valid from {new Date(voucher.start_date).toLocaleDateString()} to {new Date(voucher.end_date).toLocaleDateString()}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Chip 
                label={`Min. Order: $${voucher.minimum_order_amount}`}
                size="small"
                color="secondary"
              />
              <Chip 
                label={`Usage Limit: ${voucher.total_usage_limit}`}
                size="small"
                color="info"
              />
            </Box>
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
