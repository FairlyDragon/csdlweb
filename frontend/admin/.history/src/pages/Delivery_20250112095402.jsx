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
} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'; 
import LayersIcon from '@mui/icons-material/Layers';

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
  ]);

  const [orderManagement, setOrderManagement] = useState([
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
  ]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ color: "#637381", fontSize: "24px" }}>
          Delivery
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#36B37E",
            "&:hover": { bgcolor: "#2E9567" },
            textTransform: "none",
          }}
        >
          Auto Assigned
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Card sx={{ 
            p: 2, 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
          }}>
            <FormatListBulletedIcon sx={{ fontSize: 40, color: "#1890FF" }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{activeShippers}</Typography>
              <Typography color="textSecondary">Total Active Shipper</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ 
            p: 2, 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
          }}>
            <LocalShippingOutlinedIcon sx={{ fontSize: 40, color: "#36B37E" }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{deliveringOrders}</Typography>
              <Typography color="textSecondary">Delivering Order</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ 
            p: 2, 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            bgcolor: "white", 
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
          }}>
            <LayersIcon sx={{ fontSize: 40, color: "#FFAB00" }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{waitingOrders}</Typography>
              <Typography color="textSecondary">Waiting Order</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Currently Waiting Shipper */}
        <Grid item xs={6}>
          <Paper sx={{ 
            p: 2, 
            bgcolor: "#334155",
            color: "white",
            borderRadius: "8px",
            height: "100%"
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
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
                        textTransform: "none",
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
                    "&:hover": { bgcolor: "#F8FAFC" }
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
          <Paper sx={{ 
            p: 2, 
            bgcolor: "#854D0E",
            color: "white",
            borderRadius: "8px",
            height: "100%"
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
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
                        textTransform: "none",
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
                    "&:hover": { bgcolor: "#F8FAFC" }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>ID: {order.order_id}</Typography>
                        <Typography>Customer: {order.customer}</Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
