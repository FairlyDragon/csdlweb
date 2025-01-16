import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../services/OrderService";
import { Box, Typography, Card, Avatar, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function OrderDetails() {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const passedDetails = await OrderService.getPassedOrderDetails();
        const orderDetail = passedDetails.find(order => order.order_id === order_id);
        if (orderDetail) {
          setOrderDetails(orderDetail);
        } else {
          const pendingDetails = await OrderService.getPendingOrderDetails();
          const pendingOrder = pendingDetails.find(order => order.order_id === order_id);
          setOrderDetails(pendingOrder);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (order_id) {
      fetchOrderDetails();
    }
  }, [order_id]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Link to="/orders" style={{ textDecoration: "none" }}>
          <Button
            startIcon={<ArrowBack />}
            sx={{
              color: "#637381",
              textTransform: "none",
              fontWeight: 500,
              pl: 0,
              "&:hover": {
                backgroundColor: "rgba(99, 115, 129, 0.08)",
              },
            }}
          >
            Back
          </Button>
        </Link>
        <Typography
          variant="h5"
          sx={{ mt: 2, fontWeight: 700, color: "#212B36" }}
        >
          Order Details: #{orderDetails.order_details_id}
        </Typography>
      </Box>

      {/* Order Info & Customer Info */}
      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        <Card
          sx={{
            flex: 3,
            p: 3,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(145, 158, 171, 0.16)",
            border: "1px solid #E5E7EB",
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", mb: 4 }}>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Order Date
              </Typography>
              <Typography>{orderDetails.order_date}</Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Shipper
              </Typography>
              <Typography>{orderDetails.shipper.name}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Payment
              </Typography>
              <Typography>{orderDetails.paymentMethod}</Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Status
              </Typography>
              <Typography
                sx={{
                  bgcolor: "#E8FFF3",
                  color: "#00B69B",
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 1,
                  display: "inline-block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {orderDetails.status}
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          sx={{
            flex: 2,
            p: 3,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(145, 158, 171, 0.16)",
            border: "1px solid #E5E7EB",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              justifyContent: "center",
            }}
          >
            <Avatar
              src={orderDetails.user.avatar_url}
              sx={{
                mr: 2,
                width: 56,
                height: 56,
                bgcolor: "#F4F6F8",
                border: "1px solid #E5E7EB",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {orderDetails.user.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Address
              </Typography>
              <Typography>{orderDetails.user.address}</Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography color="textSecondary" gutterBottom>
                Phone
              </Typography>
              <Typography>{orderDetails.user.phone}</Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Food Items */}
      <Typography
        variant="h6"
        sx={{ mb: 3, color: "#212B36", fontWeight: 600 }}
      >
        Food Item
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        <Card
          sx={{
            flex: 3,
            p: 3,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(145, 158, 171, 0.16)",
            border: "1px solid #E5E7EB",
          }}
        >
          {orderDetails.orderItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2.5,
                "&:last-child": { mb: 0 },
                "&:hover": {
                  bgcolor: "#F4F6F8",
                  borderRadius: 1,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  pl: 4,
                }}
              >
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    marginRight: 16,
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography>{item.food.name}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 0.5 }}
                  >
                    x{item.quantity}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  color: "#212B36",
                  minWidth: "150px",
                  pr: 4,
                }}
              >
                ${item.price.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Card>

        {/* Price Summary */}
        <Card
          sx={{
            flex: 2,
            p: 3,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0px 2px 4px rgba(145, 158, 171, 0.16)",
            border: "1px solid #E5E7EB",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              textAlign: "center",
            }}
          >
            <Typography>Order Price</Typography>
            <Typography>${orderDetails.orderPrice}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography>Discount Amount</Typography>
              <Typography 
                variant="caption" 
                color="textSecondary"
              >
                Code:NEWCUSTOMER
              </Typography>
            </Box>
            <Typography color="error">-${orderDetails.discountAmount}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography>Delivery Charges</Typography>
            <Typography>${orderDetails.deliveryCharges}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography>Tax</Typography>
            <Typography>${orderDetails.tax}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #E5E7EB",
              pt: 3,
              mt: 3
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Total Price
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              ${orderDetails.totalPrice}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
