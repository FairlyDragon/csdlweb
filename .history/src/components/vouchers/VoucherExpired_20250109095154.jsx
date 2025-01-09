import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Stack,
  Pagination,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import { format, differenceInHours } from "date-fns";
import VoucherCard from "./VoucherCard";

const ITEMS_PER_PAGE = 9;

const VoucherExpired = ({ vouchers }) => {
  const [page, setPage] = useState(1);

  // Sort vouchers by end_date (newest first)
  const sortedVouchers = [...vouchers].sort(
    (a, b) => new Date(b.end_date) - new Date(a.end_date)
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
            <VoucherCard voucher={voucher} isExpired={true} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
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
