import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const WaitingAccept = () => {
  const [waitingOrders, setWaitingOrders] = useState(() => {
    const saved = localStorage.getItem("waitingOrders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("waitingOrders", JSON.stringify(waitingOrders));
  }, [waitingOrders]);

  const handleAccept = (orderId) => {
    const updatedOrders = waitingOrders.map((order) =>
      order.id === orderId ? { ...order, status: "Processing" } : order
    );
    setWaitingOrders(updatedOrders);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>ADDRESS</TableCell>
            <TableCell>Food</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {waitingOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.food}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAccept(order.id)}
                  sx={{
                    bgcolor: "#FFC107",
                    color: "black",
                    "&:hover": { bgcolor: "#FFB000" },
                    textTransform: "none",
                  }}
                >
                  Process
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaitingAccept;
