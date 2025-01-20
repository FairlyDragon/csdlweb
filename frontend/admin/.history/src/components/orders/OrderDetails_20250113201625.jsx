import { Box, Typography, Card, Avatar, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function OrderDetails() {
  // Mock data - sau này sẽ thay bằng API
  const orderDetails = {
    order_details_id: "001",
    order_date: "2024-01-11 5:56:00 PM",
    status: "Completed",
    paymentMethod: "Online(QR code)",
    shipper: {
      name: "Nguyen Van B",
    },
    user: {
      name: "Nguyen Van A",
      address: "334 Nguyen Trai",
      phone: "0987654321",
      avatar_url: "https://source.unsplash.com/random/100x100?avatar",
    },
    orderItems: [
      {
        id: 1,
        quantity: 1,
        price: 5.99,
        food: {
          name: "Pepperoni Pizza",
          image: "/images/pepperoni-pizza.png",
        },
      },
      {
        id: 2,
        quantity: 1,
        price: 5.99,
        food: {
          name: "Cheese Burger",
          image: "/images/cheese-burger.png",
        },
      },
      {
        id: 3,
        quantity: 1,
        price: 5.99,
        food: {
          name: "Vegan Pizza",
          image: "/images/vegan-pizza.png",
        },
      },
    ],
    orderPrice: 17,
    discountAmount: 2.5,
    deliveryCharges: 1,
    tax: 1,
    totalPrice: 17,
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Link to="/orders" style={{ textDecoration: "none" }}>
          <Button 
            startIcon={<ArrowBack />} 
            sx={{ 
              color: "#637381",
              textTransform: "uppercase",
              fontWeight: 500
            }}
          >
            Back
          </Button>
        </Link>
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 600, color: "#212B36" }}>
          Order Details: #{orderDetails.order_details_id}
        </Typography>
      </Box>

      {/* Order Info & Customer Info */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Card sx={{ flex: 2, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Order Date
              </Typography>
              <Typography>{orderDetails.order_date}</Typography>
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

        <Card sx={{ flex: 1, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar 
              src={orderDetails.user.avatar_url} 
              sx={{ mr: 2, width: 48, height: 48 }} 
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {orderDetails.user.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
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
          </Box>
        </Card>
      </Box>

      {/* Food Items */}
      <Typography variant="h6" sx={{ mb: 2, color: "#212B36" }}>
        Food Item
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Card sx={{ flex: 2, p: 3 }}>
          {orderDetails.orderItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                "&:last-child": { mb: 0 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                <Typography>{item.food.name}</Typography>
              </Box>
              <Typography sx={{ color: "#212B36" }}>
                ${item.price.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Card>

        {/* Price Summary */}
        <Card sx={{ flex: 1, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography>Order Price</Typography>
            <Typography>${orderDetails.orderPrice}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography>Discount Amount</Typography>
              <Typography variant="caption" color="textSecondary">
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
              pt: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Total Price
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              ${orderDetails.totalPrice}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
