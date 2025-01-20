import { useState, useEffect } from "react";
import OrderService from "../../services/OrderService";

export default function WaitingAccept() {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const data = await OrderService.getPendingOrdersPreviews();
        setPendingOrders(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPendingOrders();
  }, []);

  // Rest of your component code
}
