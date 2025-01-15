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

  const handleOrderSelect = async (orderId) => {
    try {
      // Fetch chi tiết đơn hàng pending
      const pendingDetails = await OrderService.getPendingOrderDetails();
      const orderDetail = pendingDetails.find(
        (order) => order.order_id === orderId
      );

      if (!orderDetail) {
        // Nếu không tìm thấy trong pending, tìm trong passed
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
        <WaitingAccept
          orders={pendingOrders}
          onOrderSelect={handleOrderSelect}
        />
        <Box sx={{ mt: 4 }}>
          <OrderList orders={passedOrders} />
        </Box>
        {selectedOrder && (
          <EditOrder
            order={selectedOrder}
            onClose={handleCloseEdit}
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
          />
        )}
      </Box>
    </Container>
  );
}
