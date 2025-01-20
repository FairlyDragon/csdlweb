import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns';

const VoucherAvailable = ({ vouchers }) => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  const getTimeRemaining = (endDate) => {
    return formatDistanceToNow(new Date(endDate), { addSuffix: true });
  };

  return (
    <Grid container spacing={3}>
      {vouchers.map((voucher) => (
        <Grid item xs={12} sm={6} md={4} key={voucher.voucher_id}>
          <Card
            sx={{
              borderRadius: 1,
              border: "1px solid #e0e0e0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {voucher.discount_percentage 
                  ? `${voucher.discount_percentage}% OFF`
                  : `$${voucher.discount_amount.toLocaleString()} OFF`
                }
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {voucher.description}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography variant="body2" color="primary">
                  Code: {voucher.code}
                </Typography>
                <IconButton size="small" onClick={() => handleCopyCode(voucher.code)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="caption" color="text.secondary" display="block">
                • Expires {getTimeRemaining(voucher.end_date)}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Minimum order amount: ${voucher.minimum_order_amount.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Total usage limit: {voucher.total_usage_limit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

VoucherAvailable.propTypes = {
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

export default VoucherAvailable;
