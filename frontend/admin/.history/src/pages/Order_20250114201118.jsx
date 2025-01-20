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
      // Fetch cả pending và passed orders
      const [pendingPreview, passedPreview] = await Promise.all([
        OrderService.getPendingOrdersPreviews(),
        OrderService.getPassedOrdersPreviews(),
      ]);

      setPendingOrders(pendingPreview);
      setPassedOrders(passedPreview);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSelect = async (orderId) => {
    try {
      // Fetch chi tiết đơn hàng khi được chọn
      const orderDetails = await OrderService.getPendingOrderDetails();
      const selectedOrderDetail = orderDetails.find(
        (order) => order.order_id === orderId
      );
      setSelectedOrder(selectedOrderDetail);
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
      // Refresh lại danh sách đơn hàng
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await OrderService.updateOrderStatus(orderId, "rejected");
      // Refresh lại danh sách đơn hàng
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
