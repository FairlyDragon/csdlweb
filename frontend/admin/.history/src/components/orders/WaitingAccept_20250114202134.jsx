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
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">NAME</TableCell>
              <TableCell align="center">PHONE</TableCell>
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center">ITEMS</TableCell>
              <TableCell align="center">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => onOrderSelect(order.order_id)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <TableCell align="center">{order.order_id}</TableCell>
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{order.phone_number}</TableCell>
                <TableCell align="center">
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{order.num_of_items} items</TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.status}
                    size="small"
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
