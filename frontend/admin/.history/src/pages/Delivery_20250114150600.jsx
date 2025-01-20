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
import DeliveryService from "../services/DeliveryService";

export default function Delivery() {
  const [activeShippers, setActiveShippers] = useState(0);
  const [deliveringOrders, setDeliveringOrders] = useState(0);
  const [waitingOrders, setWaitingOrders] = useState(0);
  const [waitingShippers, setWaitingShippers] = useState([]);
  const [orderManagement, setOrderManagement] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPair, setSelectedPair] = useState({
    shipper: null,
    order: null,
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          activeShippersCount,
          deliveringOrdersCount,
          waitingOrdersCount,
          waitingShippersList,
          waitingOrdersList,
        ] = await Promise.all([
          DeliveryService.getActiveShippers(),
          DeliveryService.getDeliveringOrders(),
          DeliveryService.getWaitingOrders(),
          DeliveryService.getCurrentlyWaitingShippers(),
          DeliveryService.getWaitingOrdersList(),
        ]);

        setActiveShippers(activeShippersCount);
        setDeliveringOrders(deliveringOrdersCount);
        setWaitingOrders(waitingOrdersCount);
        setWaitingShippers(waitingShippersList);
        setOrderManagement(waitingOrdersList);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
      }
    };

    fetchData();
  }, []);

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
      tempWaitingShippers.shift();
      tempOrderManagement.shift();
      assignDelivery(shipper, order);
    }

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
      <Grid container spacing={3} sx={{ mb: 4, maxWidth: "900px", mx: "auto" }}>
        <Grid item xs={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "none",
              bgcolor: "white",
              maxWidth: "280px",
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
                  fontSize: 45,
                  color: "#1890FF",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
                    textAlign: "center",
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
              maxWidth: "280px",
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
                  fontSize: 45,
                  color: "#36B37E",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
                    textAlign: "center",
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
              maxWidth: "280px",
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
                  fontSize: 45,
                  color: "#FFAB00",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
                    textAlign: "center",
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
