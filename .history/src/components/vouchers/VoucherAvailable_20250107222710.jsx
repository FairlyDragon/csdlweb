import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import { formatDistanceToNow, intervalToDuration, format } from "date-fns";

const VoucherAvailable = ({ vouchers }) => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const duration = intervalToDuration({ start: now, end });

    if (end < now) return "Expired";

    const days = duration.days || 0;
    const hours = duration.hours || 0;
    const minutes = duration.minutes || 0;

    if (days > 0) return `${days}d ${hours}h ${minutes}m remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const getProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
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
              borderRadius: 1,
              border: "1px solid #e0e0e0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {voucher.discount_percentage
                  ? `${voucher.discount_percentage}% OFF`
                  : `$${voucher.discount_amount.toLocaleString()} OFF`}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {voucher.description}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography variant="body2" color="primary">
                  Code: {voucher.code}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleCopyCode(voucher.code)}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                • Valid from{" "}
                {format(new Date(voucher.start_date), "dd/MM/yyyy HH:mm")} to{" "}
                {format(new Date(voucher.end_date), "dd/MM/yyyy HH:mm")}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                • Minimum order amount: $
                {voucher.minimum_order_amount.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                • Total usage limit: {voucher.total_usage_limit}
              </Typography>

              {/* Flash Sale Timer */}
              <Box
                sx={{
                  bgcolor: "#FFF9C4",
                  p: 1,
                  borderRadius: 1,
                  mt: 1,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#FF6B00",
                    fontWeight: "bold",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  ⏰ {getTimeRemaining(voucher.end_date)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={getProgress(voucher.start_date, voucher.end_date)}
                  sx={{
                    mt: 0.5,
                    height: 2,
                    backgroundColor: "#FFE082",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#FF6B00",
                    },
                  }}
                />
              </Box>
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
