import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatDateTime } from "../../utils/formatDateTime";
import { useState, useEffect } from 'react';
import OrderService from '../../services/OrderService';

export function EditOrder({ orderId, onClose }) {
  const [orderDetails, setOrderDetails] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await OrderService.getPendingOrderDetails();
        const orderData = data.find(order => order.order_id === orderId);
        setOrderDetails(orderData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);

  const handleAccept = async () => {
    try {
      await OrderService.updateOrderStatus(orderId, "processing");
      onClose();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async () => {
    try {
      await OrderService.updateOrderStatus(orderId, "canceled");
      onClose();
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  if (!orderDetails) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
            borderBottom: "1px solid #DFE3E8",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Order
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#637381" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 3 } }}>
              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle2" color="#637381">
                  ID:
                </Typography>
                <Typography>{orderDetails.order_id}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle2" color="#637381">
                  Name:
                </Typography>
                <Typography>{orderDetails.customer?.name}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle2" color="#637381">
                  Email:
                </Typography>
                <Typography>{orderDetails.customer?.email}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle2" color="#637381">
                  Phone:
                </Typography>
                <Typography>{orderDetails.customer?.phone_number}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle2" color="#637381">
                  Address:
                </Typography>
                <Typography>{orderDetails.customer?.address}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle2" color="#637381">
                  Payment:
                </Typography>
                <Typography>{orderDetails.payment?.payment_method}</Typography>
              </Box>

              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle2" color="#637381">
                  Order Date:
                </Typography>
                <Typography>{formatDateTime(orderDetails.order_date)}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="#637381" gutterBottom>
                  Note:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={orderDetails.note}
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      "& fieldset": {
                        borderColor: "#DFE3E8",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{ pl: { md: 3 }, borderLeft: { md: "1px solid #DFE3E8" } }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                Order Menu
              </Typography>

              {orderDetails.order_details?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 2,
                    borderBottom:
                      index !== orderDetails.order_details.length - 1
                        ? "1px solid #DFE3E8"
                        : "none",
                  }}
                >
                  <Box
                    component="img"
                    src={item.menuitem?.image_url || "/placeholder-food.png"}
                    alt={item.menuitem?.name || "Food item"}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      mr: 2,
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {item.menuitem?.name || "Unknown Item"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      x{item.quantity}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    +$
                    {(
                      (item.quantity || 0) * (item.menuitem?.price || 0)
                    ).toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Ship: ${orderDetails.delivery_fee}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Successfully applied {orderDetails.discount_applied}% discount
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 3,
                  pt: 2,
                  borderTop: "1px solid #DFE3E8",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#FF4842",
                  }}
                >
                  $
                  {orderDetails.order_details
                    ?.reduce(
                      (sum, item) =>
                        sum +
                        (item.quantity || 0) * (item.menuitem?.price || 0),
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: "1px solid #DFE3E8" }}>
        <Button
          onClick={handleReject}
          variant="contained"
          sx={{
            minWidth: 120,
            bgcolor: "#FF4842",
            color: "white",
            "&:hover": {
              bgcolor: "#B72136",
            },
          }}
        >
          Reject
        </Button>
        <Button
          onClick={handleAccept}
          variant="contained"
          sx={{
            minWidth: 120,
            bgcolor: "#00AB55",
            "&:hover": {
              bgcolor: "#007B55",
            },
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditOrder.propTypes = {
  orderId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
