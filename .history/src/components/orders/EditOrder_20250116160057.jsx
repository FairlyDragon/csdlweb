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
import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";

export default function EditOrder({ orderId, onClose, onAccept, onReject }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await OrderService.getPendingOrderDetails();
        const orderDetail = data.find((order) => order.order_id === orderId);
        setOrderDetails(orderDetail);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) return null;

  return (
    <Dialog
      open={Boolean(orderId)}
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
                <Typography>{orderDetails?.order_id}</Typography>
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
                <Typography>{orderDetails?.customer?.name}</Typography>
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
                <Typography>{orderDetails?.customer?.email}</Typography>
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
                <Typography>{orderDetails?.customer?.phone_number}</Typography>
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
                <Typography>{orderDetails?.customer?.address}</Typography>
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
                <Typography>{orderDetails?.payment?.method}</Typography>
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
                <Typography>
                  {formatDateTime(orderDetails?.order_date)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="#637381" gutterBottom>
                  Note:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={orderDetails?.note}
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

              {orderDetails?.order_details?.map((item, index) => (
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
                    src={item.order_items?.image_url || "/placeholder-food.png"}
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
                      (item.quantity || 0) * (item.subtotal || 0)
                    ).toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Code Voucher: ${orderDetails?.voucher_code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ship: ${orderDetails?.delivery_fee}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Successfully applied {orderDetails?.discount_applied}%
                    discount
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
                  {orderDetails?.total_amount.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: "1px solid #DFE3E8" }}>
        <Button onClick={() => onReject(orderId)}>Reject</Button>
        <Button onClick={() => onAccept(orderId)}>Accept</Button>
      </DialogActions>
    </Dialog>
  );
}
EditOrder.propTypes = {
  orderId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};
