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
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "error.main",
            fontWeight: 500,
          }}
        >
          Waiting to Accept
        </Typography>
        <Chip
          label={orders.length}
          color="error"
          size="small"
          sx={{
            ml: 2,
            bgcolor: "error.main",
            color: "white",
            fontWeight: "bold",
          }}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>Food</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => onOrderSelect(order)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{order.customer.address}</TableCell>
                <TableCell>{order.order_details[0].item_name}</TableCell>
                <TableCell align="right">
                  <Chip
                    label="Process"
                    size="small"
                    sx={{
                      bgcolor: "warning.light",
                      color: "warning.dark",
                      fontWeight: 500,
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
