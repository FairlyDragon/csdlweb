import { useState } from "react";
import { Box, Container } from "@mui/material";
import { WaitingAccept } from "../components/orders/WaitingAccept";
import { OrderList } from "../components/orders/OrderList";
import { EditOrder } from "../components/orders/EditOrder";
import OrderService from "../services/OrderService";

export default function Order() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOrderSelect = async (orderId) => {
    try {
      const pendingDetails = await OrderService.getPendingOrderDetails();
      const orderDetail = pendingDetails.find(
        (order) => order.order_id === orderId
      );

      if (!orderDetail) {
        const passedDetails = await OrderService.getPassedOrderDetails();
        const passedOrderDetail = passedDetails.find(
          (order) => order.order_id === orderId
        );
        setSelectedOrder(passedOrderDetail);
      } else {
        setSelectedOrder(orderDetail);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleCloseEdit = () => {
    setSelectedOrder(null);
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await OrderService.updateOrderStatus(orderId, "processing");
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await OrderService.updateOrderStatus(orderId, "canceled");
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>Loading...</Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <WaitingAccept onOrderSelect={handleOrderSelect} />
        <Box sx={{ mt: 4 }}>
          <OrderList />
        </Box>
        {selectedOrder && (
          <EditOrder
            orderId={selectedOrder.order_id}
            onClose={handleCloseEdit}
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
          />
        )}
      </Box>
    </Container>
  );
}
