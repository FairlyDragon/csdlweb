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
import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import EditOrder from "./EditOrder";
import { toast } from "react-hot-toast";

export function WaitingAccept({ onOrderSelect }) {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const data = await OrderService.getPendingOrdersPreviews();
        setPendingOrders(data);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleRowClick = (order) => {
    onOrderSelect(order.order_id);
    setSelectedOrder(order);
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await OrderService.updateOrderStatus(orderId, "processing");
      setPendingOrders(prevOrders => 
        prevOrders.filter(order => order.order_id !== orderId)
      );
      setSelectedOrder(null);
      toast.success("Order accepted successfully");
    } catch (error) {
      console.error("Error accepting order:", error);
      toast.error("Failed to accept order");
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await OrderService.updateOrderStatus(orderId, "rejected");
      setPendingOrders(prevOrders => 
        prevOrders.filter(order => order.order_id !== orderId)
      );
      setSelectedOrder(null);
      toast.success("Order rejected successfully");
    } catch (error) {
      console.error("Error rejecting order:", error);
      toast.error("Failed to reject order");
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" component="h2">
          Waiting to Accept
        </Typography>
        <Chip
          label={pendingOrders.length}
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
            {pendingOrders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => handleRowClick(order)}
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
                  {order.num_of_items} items
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label="Pending"
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

      <EditOrder
        orderId={selectedOrder?.order_id}
        onClose={() => setSelectedOrder(null)}
        onAccept={handleAcceptOrder}
        onReject={handleRejectOrder}
      />
    </Box>
  );
}

WaitingAccept.propTypes = {
  onOrderSelect: PropTypes.func.isRequired,
};
