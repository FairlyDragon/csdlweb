import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { WaitingAccept } from "../components/orders/WaitingAccept";
import { OrderList } from "../components/orders/OrderList";
import { EditOrder } from "../components/orders/EditOrder";
import OrderService from "../services/OrderService";

export default function Order() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [passedOrders, setPassedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Fetch pending orders preview
      const pendingPreview = await OrderService.getPendingOrdersPreviews();
      setPendingOrders(pendingPreview);

      // Fetch passed orders preview
      const passedPreview = await OrderService.getPassedOrdersPreviews();
      setPassedOrders(passedPreview);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSelect = async (order) => {
    try {
      const pendingDetails = await OrderService.getPendingOrderDetails();
      const orderDetail = pendingDetails.find(
        (item) => item.order_id === order.order_id
      );
      setSelectedOrder(orderDetail);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await OrderService.updateOrderStatus(orderId, "processing");
      await fetchOrders(); // Refresh lại danh sách
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await OrderService.updateOrderStatus(orderId, "canceled");
      await fetchOrders(); // Refresh lại danh sách
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
          <OrderList orders={passedOrders} />
        </Box>
        {selectedOrder && (
          <EditOrder
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
          />
        )}
      </Box>
    </Container>
  );
}
