import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { WaitingAccept } from "../components/orders/WaitingAccept";
import { OrderList } from "../components/orders/OrderList";
import { EditOrder } from "../components/orders/EditOrder";

// Cấu trúc dữ liệu mẫu phù hợp với ERD
const sampleOrders = [
  {
    order_id: "00001",
    customer_id: 1,
    order_date: "2024-01-04",
    total_amount: 17.97,
    status: "completed",
    note: "",
    voucher_id: null,
    discount_applied: 0,
    // Thông tin từ bảng Customer
    customer: {
      name: "Nguyen Van A",
      address: "354 Nguyen Tri",
      phone_number: "0123456789",
    },
    // Thông tin từ bảng OrderDetails
    order_details: [
      {
        menuitem_id: 1,
        quantity: 1,
        subtotal: 5.99,
        item_name: "Fried Rice",
      },
      {
        menuitem_id: 2,
        quantity: 2,
        subtotal: 11.98,
        item_name: "Cheese Burger",
      },
    ],
    // Thông tin từ bảng Payment
    payment: {
      payment_id: 1,
      payment_method: "Direct",
      amount: 17.97,
    },
    // Thông tin từ bảng OrderDelivery
    delivery: {
      delivery_id: 1,
      shipper_id: null,
      delivery_status: "completed",
    },
  },
];

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Khởi tạo dữ liệu từ localStorage hoặc dữ liệu mẫu
    const storedOrders = localStorage.getItem("orders");
    if (!storedOrders) {
      localStorage.setItem("orders", JSON.stringify(sampleOrders));
      setOrders(sampleOrders);
    } else {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const updateLocalStorage = (updatedOrders) => {
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseEdit = () => {
    setSelectedOrder(null);
  };

  const handleAcceptOrder = async (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.order_id === orderId
        ? {
            ...order,
            status: "processing",
            delivery: {
              ...order.delivery,
              delivery_status: "processing",
            },
          }
        : order
    );
    updateLocalStorage(updatedOrders);
    setSelectedOrder(null);
  };

  const handleRejectOrder = async (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.order_id === orderId
        ? {
            ...order,
            status: "rejected",
            delivery: {
              ...order.delivery,
              delivery_status: "cancelled",
            },
          }
        : order
    );
    updateLocalStorage(updatedOrders);
    setSelectedOrder(null);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <WaitingAccept
          orders={orders.filter((order) => order.status === "waiting")}
          onOrderSelect={handleOrderSelect}
        />
        <Box sx={{ mt: 4 }}>
          <OrderList orders={orders} onOrderSelect={handleOrderSelect} />
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
