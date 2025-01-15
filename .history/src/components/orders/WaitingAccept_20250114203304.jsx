import PropTypes from "prop-types";
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
import { formatDateTime } from "../../utils/formatDateTime";

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
          <TableHead sx={{ backgroundColor: "#F8F9FA" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                NAME
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                ADDRESS
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                PHONE
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                DATE
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
                }}
              >
                Food
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#637381",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #DFE3E8",
                  py: 2,
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
                <TableCell align="center" sx={{ color: "text.primary" }}>
                  {order.customer.name}
                </TableCell>
                <TableCell align="center" sx={{ color: "text.primary" }}>
                  {order.customer.address}
                </TableCell>
                <TableCell align="center" sx={{ color: "text.primary" }}>
                  {order.customer.phone_number}
                </TableCell>
                <TableCell align="center" sx={{ color: "text.primary" }}>
                  {formatDateTime(order.order_date)}
                </TableCell>
                <TableCell align="center" sx={{ color: "text.primary" }}>
                  {order.order_details.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  items
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label="Pending"
                    size="small"
                    \
                    sx={{
                      bgcolor: "#FFF7CD",
                      color: "#B78103",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: "24px",
                      borderRadius: "6px",
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
  onOrderSelect: PropTypes.func.isRequired,
};
