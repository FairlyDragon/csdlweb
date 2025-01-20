import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

export function WaitingAccept({ orders, onOrderSelect }) {
  if (!orders) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" component="h2">
          Waiting to Accept
        </Typography>
        <Chip
          label={orders.length}
          color="error"
          size="small"
          sx={{
            ml: 2,
            bgcolor: "#FF6B6B",
            color: "white",
            fontWeight: "bold",
            height: "24px",
            borderRadius: "12px",
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
          mb: 4,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                ADDRESS
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                Food
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => onOrderSelect(order)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <TableCell sx={{ color: "text.primary" }}>
                  {order.order_id}
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  {order.customer.name}
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  {order.customer.address}
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  {order.order_details[0].item_name}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label="Process"
                    size="small"
                    sx={{
                      bgcolor: "#FFF3E0",
                      color: "#E65100",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      height: "24px",
                      borderRadius: "12px",
                      "& .MuiChip-label": {
                        px: 2,
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

WaitingAccept.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  onOrderSelect: PropTypes.func.isRequired
};
