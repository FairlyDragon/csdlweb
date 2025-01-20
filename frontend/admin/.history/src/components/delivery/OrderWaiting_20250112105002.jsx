import PropTypes from "prop-types";
import { Paper, Typography, List, ListItem, Box, Button } from "@mui/material";

export default function OrderWaiting({
  orderManagement,
  selectedPair,
  onChooseOrder,
  setOpenDialog,
}) {
  return (
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
                onChooseOrder(order);
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
  );
}

OrderWaiting.propTypes = {
  orderManagement: PropTypes.array.isRequired,
  selectedPair: PropTypes.object.isRequired,
  onChooseOrder: PropTypes.func.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};
