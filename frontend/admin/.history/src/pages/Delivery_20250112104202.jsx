import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  Paper,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LayersIcon from "@mui/icons-material/Layers";

// Initial data
const initialWaitingShippers = [
  {
    shipper_id: "#S0001",
    name: "Nguyen Van A",
    address: "334 Nguyen Trai",
  },
  {
    shipper_id: "#S0002",
    name: "Nguyen Van B",
    address: "334 Nguyen Trai",
  },
  {
    shipper_id: "#S0003",
    name: "Nguyen Van C",
    address: "334 Nguyen Trai",
  },
  {
    shipper_id: "#S0004",
    name: "Nguyen Van D",
    address: "334 Nguyen Trai",
  },
  {
    shipper_id: "#S0005",
    name: "Nguyen Van E",
    address: "334 Nguyen Trai",
  },
];

const initialOrderManagement = [
  {
    order_id: "#0001",
    customer: "Nguyen Hoang A",
    address: "334 Nguyen Trai",
    accepted_time: "5 minutes ago",
  },
  {
    order_id: "#0003",
    customer: "Nguyen Hoang A",
    address: "334 Nguyen Trai",
    accepted_time: "5 minutes ago",
  },
  {
    order_id: "#0004",
    customer: "Nguyen Hoang A",
    address: "334 Nguyen Trai",
    accepted_time: "5 minutes ago",
  },
];

export default function Delivery() {
  // Initialize states with localStorage data or default values
  const [activeShippers, setActiveShippers] = useState(() => {
    const saved = localStorage.getItem("activeShippers");
    return saved ? parseInt(saved) : 20;
  });

  const [deliveringOrders, setDeliveringOrders] = useState(() => {
    const saved = localStorage.getItem("deliveringOrders");
    return saved ? parseInt(saved) : 10;
  });

  const [waitingOrders, setWaitingOrders] = useState(() => {
    const saved = localStorage.getItem("waitingOrders");
    return saved ? parseInt(saved) : 10;
  });

  const [waitingShippers, setWaitingShippers] = useState(() => {
    const saved = localStorage.getItem("waitingShippers");
    return saved ? JSON.parse(saved) : initialWaitingShippers;
  });

  const [orderManagement, setOrderManagement] = useState(() => {
    const saved = localStorage.getItem("orderManagement");
    return saved ? JSON.parse(saved) : initialOrderManagement;
  });

  // Add new state for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPair, setSelectedPair] = useState({
    shipper: null,
    order: null,
  });

  // Save to localStorage whenever states change
  useEffect(() => {
    localStorage.setItem("activeShippers", activeShippers.toString());
    localStorage.setItem("deliveringOrders", deliveringOrders.toString());
    localStorage.setItem("waitingOrders", waitingOrders.toString());
    localStorage.setItem("waitingShippers", JSON.stringify(waitingShippers));
    localStorage.setItem("orderManagement", JSON.stringify(orderManagement));
  }, [
    activeShippers,
    deliveringOrders,
    waitingOrders,
    waitingShippers,
    orderManagement,
  ]);

  // Handle choosing shipper
  const handleChooseShipper = (shipper) => {
    setSelectedPair((prev) => ({
      ...prev,
      shipper: shipper,
    }));
  };

  // Handle choosing order
  const handleChooseOrder = (order) => {
    if (selectedPair.shipper) {
      setSelectedPair((prev) => ({
        ...prev,
        order: order,
      }));
      setOpenDialog(true);
    } else {
      setSelectedPair((prev) => ({
        ...prev,
        order: order,
      }));
    }
  };

  // Handle dialog confirmation
  const handleConfirm = () => {
    const { shipper, order } = selectedPair;
    assignDelivery(shipper, order);
    setOpenDialog(false);
    setSelectedPair({ shipper: null, order: null });
  };

  // Handle dialog cancellation
  const handleCancel = () => {
    setOpenDialog(false);
    setSelectedPair({ shipper: null, order: null });
  };

  // Assign delivery function
  const assignDelivery = (shipper, order) => {
    setWaitingShippers((prev) =>
      prev.filter((s) => s.shipper_id !== shipper.shipper_id)
    );
    setOrderManagement((prev) =>
      prev.filter((o) => o.order_id !== order.order_id)
    );
    setActiveShippers((prev) => prev - 1);
    setDeliveringOrders((prev) => prev + 1);
    setWaitingOrders((prev) => prev - 1);
  };

  // Handle auto assign
  const handleAutoAssign = () => {
    const tempWaitingShippers = [...waitingShippers];
    const tempOrderManagement = [...orderManagement];

    while (tempWaitingShippers.length > 0 && tempOrderManagement.length > 0) {
      const shipper = tempWaitingShippers[0];
      const order = tempOrderManagement[0];

      // Remove first shipper and order from temp arrays
      tempWaitingShippers.shift();
      tempOrderManagement.shift();

      // Update states for this pair
      assignDelivery(shipper, order);
    }

    // Update final states
    setWaitingShippers(tempWaitingShippers);
    setOrderManagement(tempOrderManagement);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography variant="h4" sx={{ color: "black", fontWeight: 500 }}>
          Delivery
        </Typography>
        <Button
          variant="contained"
          onClick={handleAutoAssign}
          sx={{
            bgcolor: "#36B37E",
            "&:hover": { bgcolor: "#2E9567" },
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
          }}
        >
          Auto Assigned
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "none",
              bgcolor: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormatListBulletedIcon sx={{ fontSize: 32, color: "#1890FF" }} />
              <Box>
                <Typography variant="h3" sx={{ mb: 0.5, fontWeight: 600 }}>
                  {activeShippers}
                </Typography>
                <Typography sx={{ color: "#637381" }}>
                  Total Active Shipper
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "none",
              bgcolor: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LocalShippingOutlinedIcon
                sx={{ fontSize: 32, color: "#36B37E" }}
              />
              <Box>
                <Typography variant="h3" sx={{ mb: 0.5, fontWeight: 600 }}>
                  {deliveringOrders}
                </Typography>
                <Typography sx={{ color: "#637381" }}>
                  Delivering Order
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "none",
              bgcolor: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LayersIcon sx={{ fontSize: 32, color: "#FFAB00" }} />
              <Box>
                <Typography variant="h3" sx={{ mb: 0.5, fontWeight: 600 }}>
                  {waitingOrders}
                </Typography>
                <Typography sx={{ color: "#637381" }}>Waiting Order</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Currently Waiting Shipper */}
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#334155",
              borderRadius: 4,
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                mb: 3,
                fontWeight: 500,
              }}
            >
              Currently waiting shipper
            </Typography>
            <List sx={{ p: 0 }}>
              {waitingShippers.map((shipper) => (
                <ListItem
                  key={shipper.shipper_id}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    mb: 1.5,
                    p: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500, mb: 0.5 }}
                    >
                      {shipper.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#637381" }}>
                      {shipper.shipper_id} | {shipper.address}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => {
                      handleChooseShipper(shipper);
                      if (selectedPair.order) {
                        setOpenDialog(true);
                      }
                    }}
                    sx={{
                      bgcolor:
                        selectedPair.shipper?.shipper_id === shipper.shipper_id
                          ? "#2E9567"
                          : "#4AEDC4",
                      color:
                        selectedPair.shipper?.shipper_id === shipper.shipper_id
                          ? "white"
                          : "black",
                      "&:hover": {
                        bgcolor:
                          selectedPair.shipper?.shipper_id ===
                          shipper.shipper_id
                            ? "#236F4D"
                            : "#3BC5A0",
                      },
                      textTransform: "none",
                      borderRadius: 2,
                      px: 3,
                    }}
                  >
                    Choose
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Order Management */}
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#854D0E",
              borderRadius: 4,
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                mb: 3,
                fontWeight: 500,
              }}
            >
              Order Management
            </Typography>
            <List sx={{ p: 0 }}>
              {orderManagement.map((order) => (
                <ListItem
                  key={order.order_id}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    mb: 1.5,
                    p: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography sx={{ fontWeight: 500 }}>
                        ID: {order.order_id}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        Customer: {order.customer}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#637381",
                      }}
                    >
                      <Typography variant="body2">
                        Address: {order.address}
                      </Typography>
                      <Typography variant="body2">
                        Accepted: {order.accepted_time}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    onClick={() => {
                      handleChooseOrder(order);
                      if (selectedPair.shipper) {
                        setOpenDialog(true);
                      }
                    }}
                    sx={{
                      bgcolor:
                        selectedPair.order?.order_id === order.order_id
                          ? "#D97706"
                          : "#FEF3C7",
                      color:
                        selectedPair.order?.order_id === order.order_id
                          ? "white"
                          : "black",
                      "&:hover": {
                        bgcolor:
                          selectedPair.order?.order_id === order.order_id
                            ? "#B45309"
                            : "#FDE68A",
                      },
                      textTransform: "none",
                      borderRadius: 2,
                      px: 3,
                      ml: 2,
                    }}
                  >
                    Choose
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Assignment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to assign {selectedPair.shipper?.name} to
            order {selectedPair.order?.order_id}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} sx={{ color: "gray" }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{
              bgcolor: "#36B37E",
              color: "white",
              "&:hover": { bgcolor: "#2E9567" },
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
