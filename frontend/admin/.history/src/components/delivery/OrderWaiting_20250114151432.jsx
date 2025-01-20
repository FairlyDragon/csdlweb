import PropTypes from "prop-types";
import { Typography, List, ListItem, Box } from "@mui/material";

export default function OrderWaiting({ orderManagement, selectedPair, onChooseOrder }) {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#376D87",
          p: 3,
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 500,
          }}
        >
          Currently waiting order
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
        }}
      >
        <List sx={{ p: 0 }}>
          {orderManagement.map((order) => (
            <ListItem
              key={order.order_id}
              sx={{
                bgcolor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 1,
                mb: 1.5,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "#F4F6F8",
                },
                bgcolor:
                  selectedPair.order?.order_id === order.order_id
                    ? "#F4F6F8"
                    : "white",
              }}
              onClick={() => onChooseOrder(order)}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    mb: 0.5,
                    color: "#212B36",
                  }}
                >
                  {order.customer_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#637381",
                  }}
                >
                  {order.address}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

OrderWaiting.propTypes = {
  orderManagement: PropTypes.array.isRequired,
  selectedPair: PropTypes.object.isRequired,
  onChooseOrder: PropTypes.func.isRequired,
};
