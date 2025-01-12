import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LayersIcon from "@mui/icons-material/Layers";
import ShipperWaiting from "../components/delivery/ShipperWaiting";
import OrderWaiting from "../components/delivery/OrderWaiting";

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
    order_id: "#0002",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <FormatListBulletedIcon
                sx={{
                  fontSize: 45, // Tăng kích thước icon
                  color: "#1890FF",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    color: "#637381",
                    mb: 0.5,
                  }}
                >
                  Total Active Shipper
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {activeShippers}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <LocalShippingOutlinedIcon
                sx={{
                  fontSize: 45, // Tăng kích thước icon
                  color: "#36B37E",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    color: "#637381",
                    mb: 0.5,
                  }}
                >
                  Delivering Order
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {deliveringOrders}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <LayersIcon
                sx={{
                  fontSize: 45, // Tăng kích thước icon
                  color: "#FFAB00",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    color: "#637381",
                    mb: 0.5,
                  }}
                >
                  Waiting Order
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {waitingOrders}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ShipperWaiting
            waitingShippers={waitingShippers}
            selectedPair={selectedPair}
            onChooseShipper={handleChooseShipper}
            setOpenDialog={setOpenDialog}
          />
        </Grid>
        <Grid item xs={6}>
          <OrderWaiting
            orderManagement={orderManagement}
            selectedPair={selectedPair}
            onChooseOrder={handleChooseOrder}
            setOpenDialog={setOpenDialog}
          />
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
          <Button
            onClick={handleCancel}
            sx={{
              bgcolor: "#DC2626",
              color: "white",
              "&:hover": {
                bgcolor: "#B91C1C",
              },
            }}
          >
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
