import {
  Box,
  Card,
  Typography,
  Button,
  Rating,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowForwardIos } from '@mui/icons-material';

const popularDishes = [
  {
    id: 1,
    name: 'Spicy Noodles',
    image: '/food1.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: 15,
  },
  {
    id: 2,
    name: 'Egg Noodles',
    image: '/food2.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: 15,
  },
  {
    id: 3,
    name: 'Burger',
    image: '/food3.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: 15,
  },
  // Duplicate dishes for the second row
  {
    id: 4,
    name: 'Spicy Noodles',
    image: '/food1.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: 15,
  },
  {
    id: 5,
    name: 'Egg Noodles',
    image: '/food2.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: 15,
  },
  {
    id: 6,
    name: 'Burger',
    image: '/food3.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: 15,
  },
];

export default function Foods() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          color: '#212B36',
          fontSize: 24,
          fontWeight: 600
        }}
      >
        Foods
      </Typography>

      {/* Promotion Banner */}
      <Card
        sx={{
          bgcolor: '#4F46E5',
          color: 'white',
          p: 4,
          mb: 4,
          position: 'relative',
          overflow: 'visible',
          borderRadius: 3,
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'white',
            '&:hover': { bgcolor: 'white' },
            width: 40,
            height: 40,
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'white',
            '&:hover': { bgcolor: 'white' },
            width: 40,
            height: 40,
          }}
        >
          <ChevronRight />
        </IconButton>
        <Typography 
          sx={{ 
            mb: 1,
            fontSize: 14,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          December 21-27
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2,
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.5
          }}
        >
          Enjoy 20% discount
          <br />
          in this Christmas
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#FF6B6B',
            '&:hover': { bgcolor: '#FF5252' },
            textTransform: 'none',
            borderRadius: 1.5,
            px: 3,
            py: 1,
          }}
        >
          Get Started
        </Button>
      </Card>

      {/* Popular Dishes */}
      <Box sx={{ 
        mb: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Typography 
          sx={{ 
            fontSize: 18,
            fontWeight: 600,
            color: '#212B36'
          }}
        >
          Popular Dishes
        </Typography>
        <Button 
          endIcon={<ArrowForwardIos sx={{ fontSize: 14 }} />}
          sx={{ 
            textTransform: 'none',
            color: '#637381',
            '&:hover': {
              bgcolor: 'transparent',
              color: '#212B36'
            },
            '& .MuiButton-endIcon': {
              ml: 0.5
            }
          }}
        >
          View all
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
        {popularDishes.map((dish) => (
          <Card 
            key={dish.id} 
            sx={{ 
              position: 'relative',
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            {dish.discount && (
              <Typography
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  bgcolor: '#FF4842',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {dish.discount}% Off
              </Typography>
            )}
            <Box
              component="img"
              src={dish.image}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
              }}
            />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Rating 
                  value={dish.rating} 
                  readOnly 
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#FFC107'
                    }
                  }}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#637381',
                    fontSize: 12
                  }}
                >
                  ({dish.reviews})
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 1,
                  color: '#637381',
                  fontSize: 13
                }}
              >
                Dishes
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography 
                  sx={{ 
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#212B36',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <span style={{ color: '#FFC107' }}>$</span>
                  {dish.price}
                </Typography>
                <Button 
                  variant="contained" 
                  size="small"
                  sx={{
                    textTransform: 'none',
                    bgcolor: '#1C2128',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#2D333B'
                    },
                    fontSize: 13,
                    borderRadius: 1.5,
                    px: 2,
                    py: 0.75
                  }}
                >
                  Edit Product
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

