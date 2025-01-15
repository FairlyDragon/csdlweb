import { Box, Typography, Card, Avatar, Button, Chip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function OrderDetails() {
  // Mock data - sau này sẽ thay bằng API
  const orderDetails = {
    order_id: "001",
    order_date: "2024-01-13T12:00:00",
    status: "Processing",
    paymentMethod: "Cash",
    shipper: {
      name: "John Shipper",
    },
    user: {
      name: "Nguyen Van A",
      address: "123 Street, City",
      phone: "0123456789",
      avatar
    },
    orderItems: [
      {
        id: 1,
        quantity: 2,
        price: 15.99,
        food: {
          name: "Chicken Rice",
          image: "https://source.unsplash.com/random/100x100?food",
        },
      },
      {
        id: 2,
        quantity: 1,
        price: 12.99,
        food: {
          name: "Beef Noodle",
          image: "https://source.unsplash.com/random/100x100?noodle",
        },
      },
    ],
    orderPrice: 44.97,
    discountAmount: 5,
    deliveryCharges: 2,
    tax: 4.2,
    totalPrice: 46.17,
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Link to="/orders" style={{ textDecoration: "none" }}>
          <Button startIcon={<ArrowBack />} sx={{ color: "#6B7280" }}>
            Back
          </Button>
        </Link>
        <Typography variant="h5" sx={{ ml: 2, fontWeight: 600 }}>
          Order Details: #{orderDetails.order_id.padStart(3, "0")}
        </Typography>
      </Box>

      {/* Order Info & Customer Info */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Card sx={{ flex: 2, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Order Date
              </Typography>
              <Typography>
                {new Date(orderDetails.order_date).toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Shipper
              </Typography>
              <Typography>{orderDetails.shipper.name}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Payment
              </Typography>
              <Typography>{orderDetails.paymentMethod}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Status
              </Typography>
              <Chip
                label={orderDetails.status}
                color="primary"
                size="small"
                sx={{
                  bgcolor: "#E0D7FF",
                  color: "#6226EF",
                  fontWeight: 600,
                  borderRadius: 1,
                }}
              />
            </Box>
          </Box>
        </Card>

        <Card sx={{ flex: 1, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ mr: 2 }} />
            <Typography variant="subtitle1">
              {orderDetails.user.name}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Address
            </Typography>
            <Typography>{orderDetails.user.address}</Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone
            </Typography>
            <Typography>{orderDetails.user.phone}</Typography>
          </Box>
        </Card>
      </Box>

      {/* Food Items */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Food Items
      </Typography>

      <Card sx={{ p: 3, mb: 3 }}>
        {orderDetails.orderItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={item.food.image}
                alt={item.food.name}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  marginRight: 16,
                }}
              />
              <Box>
                <Typography variant="subtitle1">{item.food.name}</Typography>
                <Typography color="textSecondary">x{item.quantity}</Typography>
              </Box>
            </Box>
            <Typography color="primary">+${item.price.toFixed(2)}</Typography>
          </Box>
        ))}
      </Card>

      {/* Price Summary */}
      <Card sx={{ p: 3, maxWidth: 300, ml: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>Order Price</Typography>
          <Typography>${orderDetails.orderPrice.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>Discount Amount</Typography>
          <Typography color="error">
            -${orderDetails.discountAmount.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>Delivery Charges</Typography>
          <Typography>${orderDetails.deliveryCharges.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>Tax</Typography>
          <Typography>${orderDetails.tax.toFixed(2)}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #E5E7EB",
            pt: 2,
            mt: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Total Price
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            ${orderDetails.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
