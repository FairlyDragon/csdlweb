import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { WaitingAccept } from "../components/orders/WaitingAccept";
import { OrderList } from "../components/orders/OrderList";
import { EditOrder } from "../components/orders/EditOrder";

// Cấu trúc dữ liệu mẫu phù hợp với ERD
const sampleOrders = [
  // Các đơn hàng đang chờ xử lý (waiting)
  {
    order_id: "o00002",
    customer_id: "c00002",
    order_date: "2024-01-06",
    total_amount: 15.99,
    status: "Pending",
    note: "",
    voucher_id: "v00002",
    discount_applied: 5,
    // Thông tin từ bảng Customer
    customer: {
      customer_id: "c00002",
      name: "Ho Thi B",
      address: "20 Tay Son",
      phone_number: "0987654321",
      email: "customer2@email.com",
      created_at: "2024-01-01",
    },
    // Thông tin từ bảng OrderDetails
    order_details: [
      {
        order_details_id: "od00001",
        order_id: "o00002",
        menuitem_id: "m00001",
        quantity: 1,
        subtotal: 15.99,
        item_name: "Fried Rice",
      },
    ],
    // Thông tin từ bảng Payment
    payment: {
      payment_id: "p00001",
      order_id: "o00002",
      payment_method: "Direct",
      amount: 15.99,
    },
    // Thông tin từ bảng OrderDelivery
    delivery: {
      delivery_id: "d00001",
      order_id: "o00002",
      shipper_id: "s00001",
      delivery_status: "waiting",
    },
  },
  {
    order_id: "o00003",
    customer_id: "c00003",
    order_date: "2024-01-06",
    total_amount: 15.99,
    status: "Pending",
    note: "",
    voucher_id: "v00003",
    discount_applied: 20,
    customer: {
      customer_id: "c00003",
      name: "Ho Thi B",
      address: "20 Tay Son",
      phone_number: "0987654321",
      email: "customer3@email.com",
      created_at: "2024-01-01",
    },
    order_details: [
      {
        order_details_id: "od00002",
        order_id: "o00003",
        menuitem_id: "m00002",
        quantity: 1,
        subtotal: 15.99,
        item_name: "Fried Rice",
      },
    ],
    payment: {
      payment_id: "p00002",
      order_id: "o00003",
      payment_method: "Direct",
      amount: 15.99,
    },
    delivery: {
      delivery_id: "d00002",
      order_id: "o00003",
      shipper_id: "s00002",
      delivery_status: "waiting",
    },
  },

  // Các đơn hàng trong OrderList
  {
    order_id: "o00001",
    customer_id: "c00001",
    order_date: "2024-01-04",
    total_amount: 15.99,
    status: "completed",
    note: "",
    voucher_id: "v00001",
    discount_applied: 0,
    customer: {
      customer_id: "c00001",
      name: "Nguyen Van A",
      address: "354 Nguyen Tri",
      phone_number: "0123456789",
      email: "customer1@email.com",
      created_at: "2024-01-01",
    },
    order_details: [
      {
        order_details_id: "od00003",
        order_id: "o00001",
        menuitem_id: "m00003",
        quantity: 1,
        subtotal: 15.99,
        item_name: "Fried Rice",
      },
    ],
    payment: {
      payment_id: "p00003",
      order_id: "o00001",
      payment_method: "Direct",
      amount: 15.99,
    },
    delivery: {
      delivery_id: "d00003",
      order_id: "o00001",
      shipper_id: "s00003",
      delivery_status: "completed",
    },
  },
];

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Thêm console.log để kiểm tra
    console.log("Loading orders from localStorage");
    const storedOrders = localStorage.getItem("orders");
    if (!storedOrders) {
      console.log("No stored orders, using sample data:", sampleOrders);
      localStorage.setItem("orders", JSON.stringify(sampleOrders));
      setOrders(sampleOrders);
    } else {
      console.log("Found stored orders:", JSON.parse(storedOrders));
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
    const processedOrder = orders.find((order) => order.order_id === orderId);
    const otherOrders = orders.filter((order) => order.order_id !== orderId);

    // Cập nhật trạng thái của đơn hàng được xử lý
    const updatedProcessedOrder = {
      ...processedOrder,
      status: "processing",
      delivery: {
        ...processedOrder.delivery,
        delivery_status: "processing",
      },
      order_date: new Date().toISOString(),
    };

    // Đặt đơn hàng vừa xử lý lên đầu mảng
    const updatedOrders = [updatedProcessedOrder, ...otherOrders];

    updateLocalStorage(updatedOrders);
    setSelectedOrder(null);
  };

  const handleRejectOrder = async (orderId) => {
    const processedOrder = orders.find((order) => order.order_id === orderId);
    const otherOrders = orders.filter((order) => order.order_id !== orderId);

    // Cập nhật trạng thái của đơn hàng được xử lý
    const updatedProcessedOrder = {
      ...processedOrder,
      status: "rejected",
      delivery: {
        ...processedOrder.delivery,
        delivery_status: "rejected",
      },
      order_date: new Date().toISOString(),
    };

    // Đặt đơn hàng vừa xử lý lên đầu mảng
    const updatedOrders = [updatedProcessedOrder, ...otherOrders];

    updateLocalStorage(updatedOrders);
    setSelectedOrder(null);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <WaitingAccept
          orders={orders.filter((order) => order.status === "Pending")}
          onOrderSelect={handleOrderSelect}
        />
        <Box sx={{ mt: 4 }}>
          <OrderList 
            orders={orders.filter((order) => order.status !== "Pending")}
          />
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
