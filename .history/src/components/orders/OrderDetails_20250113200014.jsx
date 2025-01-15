import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const OrderDetails = () => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await orderService.getOrderById(order_id);
        setOrderDetails(response);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchOrderDetails();
  }, [order_id]);

  if (!orderDetails) return null;

  return (
    <Box sx={{ p: 3, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Link to="/orders" style={{ textDecoration: 'none' }}>
          <Button startIcon={<ArrowBack />} sx={{ color: '#6B7280' }}>
            Back
          </Button>
        </Link>
        <Typography variant="h5" sx={{ ml: 2, fontWeight: 600, color: '#111927' }}>
          Order #{orderDetails.order_id}
        </Typography>
      </Box>

      {/* Order Status & Date */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, p: 3 }}>
          <Typography color="textSecondary" gutterBottom>
            Status
          </Typography>
          <Chip 
            label={orderDetails.status}
            color={orderDetails.status === 'completed' ? 'success' : 'warning'}
            sx={{ borderRadius: 1 }}
          />
        </Card>
        <Card sx={{ flex: 1, p: 3 }}>
          <Typography color="textSecondary" gutterBottom>
            Order Date
          </Typography>
          <Typography>
            {new Date(orderDetails.order_date).toLocaleString()}
          </Typography>
        </Card>
      </Box>

      {/* Customer Info */}
      <Card sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Customer Information
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {orderDetails.customer.name}
            </Typography>
            <Typography color="textSecondary">
              {orderDetails.customer.email}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography>{orderDetails.customer.phone}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Shipping Address
            </Typography>
            <Typography>{orderDetails.customer.address}</Typography>
          </Box>
        </Box>
      </Card>

      {/* Order Items */}
      <Card sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order Items
        </Typography>
        {orderDetails.items.map((item) => (
          <Box 
            key={item.id}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              pb: 2,
              borderBottom: '1px solid #E5E7EB'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: 64, height: 64, borderRadius: 8, marginRight: 16 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Typography color="textSecondary">
                  ${item.price} x {item.quantity}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontWeight: 600 }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Card>

      {/* Payment Details */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Payment Details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography>${orderDetails.subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Discount</Typography>
          <Typography color="error">
            -${orderDetails.discount.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Shipping</Typography>
          <Typography>${orderDetails.shipping.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" color="primary">
            ${orderDetails.total.toFixed(2)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default OrderDetails;
