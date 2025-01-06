import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { WaitingAccept } from "../components/orders/WaitingAccept";
import { OrderList } from "../components/orders/OrderList";
import { EditOrder } from "../components/orders/EditOrder";

// Cấu trúc dữ liệu mẫu phù hợp với ERD
const sampleOrders = [
  // Các đơn hàng đang chờ xử lý (waiting)
  {
    order_id: "00002",
    customer_id: 2,
    order_date: "2024-01-06",
    total_amount: 15.99,
    status: "waiting",
    customer: {
      name: "Ho Thi B",
      address: "20 Tay Son",
      phone_number: "0987654321",
    },
    order_details: [
      {
        menuitem_id: 1,
        quantity: 1,
        subtotal: 15.99,
        item_name: "Fried Rice",
      },
    ],
    payment: { payment_method: "Direct", amount: 15.99 },
    delivery: { delivery_status: "pending" },d: "00003",
    customer_id: 3,
    order_date: "2024-01-06",
    total_amount: 15.99,
    status: "waiting",
    customer: {
      name: "Ho Thi B",
      address: "20 Tay Son",
      phone_number: "0987654321",
    },
    order_details: [
      {
        menuitem_id: 1,
        quantity: 1,
        subtotal: 15.99,
        item_name: "Fried Rice",
      },
    ],
    payment: { payment_method: "Direct", amount: 15.99 },
    delivery: { delivery_status: "pending" },
  },

  // Các đơn hàng trong OrderList
  {
    order_id: "00001",
    customer_id: 1,
    order_date: "2024-01-04",
    total_amount: 15.99,
    status: "completed",
    customer: {
      name: "Nguyen Van A",
      address: "354 Nguyen Tri",
      phone_number: "0123456789",
    },
    order_details: [
      {
        menuitem_id: 1,
        quantity: 1,
        subtotal: 15.99,
        item_name: "Fried Rice",
      },
    ],
    payment: { payment_method: "Direct", amount: 15.99 },
    delivery: { delivery_status: "completed" },
  },
  {
    order_id: "00004",
    customer_id: 4,
    order_date: "2024-02-05",
    total_amount: 15.99,
    status: "completed",
    customer: {
      name: "Tran Minh D",
      address: "55 Ton That Tung",
      phone_number: "0123456789",
    },
    order_details: [
      {
        menuitem_id: 1,
        quantity: 1,
        subtotal: 15.99,
        item_name: "Fried Rice",
      },
    ],
    payment: { payment_method: "Direct", amount: 15.99 },
    delivery: { delivery_status: "completed" },
  },
  {
    order_id: "00005",
    customer_id: 5,
    order_date: "2024-07-29",
    total_amount: 18.99,
    status: "processing",
    customer: {
      name: "Nguyen Van E",
      address: "36 Truong Chinh",
      phone_number: "0123456789",
    },
    order_details: [
      {
        menuitem_id: 2,
        quantity: 1,
        subtotal: 18.99,
        item_name: "Pho",
      },
    ],
    payment: { payment_method: "Direct", amount: 18.99 },
    delivery: { delivery_status: "processing" },
  },
  {
    order_id: "00006",
    customer_id: 6,
    order_date: "2024-08-15",
    total_amount: 18.99,
    status: "completed",
    customer: {
      name: "Ho Xuan Huong",
      address: "212 Thai Ha",
      phone_number: "0123456789",
    },
    order_details: [
      {
        menuitem_id: 2,
        quantity: 1,
        subtotal: 18.99,
        item_name: "Pho",
      },
    ],
    payment: { payment_method: "Direct", amount: 18.99 },
    delivery: { delivery_status: "completed" },
  },
  {
    order_id: "00007",
    customer_id: 7,
    order_date: "2024-12-21",
    total_amount: 18.99,
    status: "processing",
    customer: {
      name: "Chu Van An",
      address: "448 Pham Ngoc Thach",
      phone_number: "0123456789",
    },
    order_details: [
      {
        menuitem_id: 2,
        quantity: 1,
        subtotal: 18.99,
        item_name: "Pho",
      },
    ],
    payment: { payment_method: "Direct", amount: 18.99 },
    delivery: { delivery_status: "processing" },
  },
  {
    order_id: "00008",
    customer_id: 8,
    order_date: "2024-04-30",
    total_amount: 18.99,
    status: "completed",
    customer: {
      name: "Tran Quang Khai",
      address: "512 Dai La",
      phone_number: "0123456789",
    },
    order_details: [
      {
        menuitem_id: 2,
        quantity: 1,
        subtotal: 18.99,
        item_name: "Pho",
      },
    ],
    payment: { payment_method: "Direct", amount: 18.99 },
    delivery: { delivery_status: "completed" },
  },
  {
    order_id: "00009",
    customer_id: 9,
    order_date: "2024-01-09",
    total_amount: 18.99,
    status: "completed",
    customer: {
      name: "Nguyen Chi Thanh",
      address: "43 Nguyen Chi Thanh",
      phone_number: "0123456789",
    },
    order_details: [
      {
        menuitem_id: 2,
        quantity: 1,
        subtotal: 18.99,
        item_name: "Pho",
      },
    ],
    payment: { payment_method: "Direct", amount: 18.99 },
    delivery: { delivery_status: "completed" },
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
    const updatedOrders = orders.map((order) =>
      order.order_id === orderId
        ? {
            ...order,
            status: "processing",
            delivery: {
              ...order.delivery,
              delivery_status: "processing",
            },
            order_date: new Date().toISOString(),
          }
        : order
    );

    const sortedOrders = [...updatedOrders].sort((a, b) => {
      if (a.order_id === orderId) return -1;
      if (b.order_id === orderId) return 1;
      return new Date(b.order_date) - new Date(a.order_date);
    });

    updateLocalStorage(sortedOrders);
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
              delivery_status: "rejected",
            },
            order_date: new Date().toISOString(),
          }
        : order
    );

    const sortedOrders = [...updatedOrders].sort((a, b) => {
      if (a.order_id === orderId) return -1;
      if (b.order_id === orderId) return 1;
      return new Date(b.order_date) - new Date(a.order_date);
    });

    updateLocalStorage(sortedOrders);
    setSelectedOrder(null);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        {/* Thêm console.log để kiểm tra dữ liệu được truyền */}
        {console.log(
          "Waiting orders:",
          orders.filter((order) => order.status === "waiting")
        )}
        {console.log("All orders:", orders)}

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
