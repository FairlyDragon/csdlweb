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
  ListItemText,
  Divider,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";

export default function Delivery() {
  const [activeShippers, setActiveShippers] = useState(20);
  const [deliveringOrders, setDeliveringOrders] = useState(10);
  const [waitingOrders, setWaitingOrders] = useState(10);
  const [waitingShippers, setWaitingShippers] = useState([
    {
      shipper_id: "#S0001",
      name: "Nguyen Van A",
      address: "334 Nguyen Trai",
    },
    // ... more shippers
  ]);
  const [orderManagement, setOrderManagement] = useState([
    {
      order_id: "#0001",
      customer: "Nguyen Hoang A",
      address: "334 Nguyen Trai",
      accepted_time: "5 minutes ago",
    },
    // ... more orders
  ]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Delivery
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#36B37E",
            "&:hover": { bgcolor: "#2E9567" },
          }}
        >
          Auto Assigned
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Card sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <LocalShippingOutlinedIcon
              sx={{ fontSize: 40, color: "#1890FF" }}
            />
            <Box>
              <Typography variant="h4">{activeShippers}</Typography>
              <Typography color="textSecondary">
                Total Active Shipper
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <InventoryOutlinedIcon sx={{ fontSize: 40, color: "#36B37E" }} />
            <Box>
              <Typography variant="h4">{deliveringOrders}</Typography>
              <Typography color="textSecondary">Delivering Order</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <PendingActionsOutlinedIcon
              sx={{ fontSize: 40, color: "#FFAB00" }}
            />
            <Box>
              <Typography variant="h4">{waitingOrders}</Typography>
              <Typography color="textSecondary">Waiting Order</Typography>
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
              p: 2,
              bgcolor: "#475569",
              color: "white",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Currently waiting shipper
            </Typography>
            <List>
              {waitingShippers.map((shipper) => (
                <ListItem
                  key={shipper.shipper_id}
                  secondaryAction={
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: "#4AEDC4",
                        color: "black",
                        "&:hover": { bgcolor: "#3BC5A0" },
                      }}
                    >
                      Choose
                    </Button>
                  }
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    mb: 1,
                    borderRadius: "4px",
                  }}
                >
                  <ListItemText
                    primary={shipper.name}
                    secondary={`${shipper.shipper_id} | ${shipper.address}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Order Management */}
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#854D0E",
              color: "white",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Management
            </Typography>
            <List>
              {orderManagement.map((order) => (
                <ListItem
                  key={order.order_id}
                  secondaryAction={
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: "#FEF3C7",
                        color: "black",
                        "&:hover": { bgcolor: "#FDE68A" },
                      }}
                    >
                      Choose
                    </Button>
                  }
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    mb: 1,
                    borderRadius: "4px",
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>ID: {order.order_id}</Typography>
                        <Typography>Customer: {order.customer}</Typography>
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Address: {order.address}</Typography>
                        <Typography>Accepted: {order.accepted_time}</Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
