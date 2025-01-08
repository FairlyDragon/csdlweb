import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PropTypes from "prop-types";
import { intervalToDuration, format } from "date-fns";

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

    const hours = duration.hours || 0;
    const minutes = duration.minutes || 0;
    const seconds = duration.seconds || 0;

    return `${hours.toString().padStart(2, "0")} h ${minutes
      .toString()
      .padStart(2, "0")} m ${seconds.toString().padStart(2, "0")} s`;
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
              overflow: "visible",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  color: "#1a237e",
                }}
              >
                {voucher.discount_percentage
                  ? `${voucher.discount_percentage}% OFF`
                  : `$${voucher.discount_amount.toLocaleString()} OFF`}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  color: "#1a237e",
                  fontWeight: 500,
                }}
              >
                {voucher.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#2196f3",
                    fontWeight: 500,
                  }}
                >
                  Code: {voucher.code}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleCopyCode(voucher.code)}
                  sx={{
                    color: "#2196f3",
                    "&:hover": {
                      backgroundColor: "rgba(33, 150, 243, 0.08)",
                    },
                  }}
                >
                  <ContentCopyIcon /> Copy
                </IconButton>
              </Box>

              {/* Flash Sale Timer */}
              <Box
                sx={{
                  bgcolor: "#ffd700",
                  py: 1.5,
                  px: 2,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ElectricBoltIcon sx={{ color: "#000" }} />
                  <Typography sx={{ color: "#000", fontWeight: 500 }}>
                    Flash sale
                  </Typography>
                </Box>
                <Typography sx={{ color: "#000", fontWeight: 500 }}>
                  Ends in {getTimeRemaining(voucher.end_date)}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                • {format(new Date(voucher.start_date), "dd/MM/yyyy HH:mm")} -{" "}
                {format(new Date(voucher.end_date), "dd/MM/yyyy HH:mm")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Minimum order amount: $
                {voucher.minimum_order_amount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
