import { Box, Typography, Button, Rating, Card } from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowForwardIos } from '@mui/icons-material';

const popularDishes = [
  {
    id: 1,
    name: 'Spicy Noodles',
    image: '/food1.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: '15% OFF',
    category: 'Dishes'
  },
  {
    id: 2,
    name: 'Egg Noodles',
    image: '/food2.jpg',
    rating: 5,
    reviews: '1.11',
    price: 5.59,
    discount: '15% OFF',
    category: 'Dishes'
  },
  {
    id: 3,
    name: 'Burger',
    image: '/food3.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: '15% OFF',
    category: 'Dishes'
  },
  // Duplicate for second row
  {
    id: 4,
    name: 'Spicy Noodles',
    image: '/food1.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: '15% OFF',
    category: 'Dishes'
  },
  {
    id: 5,
    name: 'Egg Noodles',
    image: '/food2.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: '15% OFF',
    category: 'Dishes'
  },
  {
    id: 6,
    name: 'Burger',
    image: '/food3.jpg',
    rating: 5,
    reviews: '1.31',
    price: 5.59,
    discount: '15% OFF',
    category: 'Dishes'
  }
];

export default function Foods() {
  return (
    <Box sx={{ p: 3, bgcolor: '#F4F6F8', minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
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
          borderRadius: 3,
        }}
      >
        <Box sx={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)' }}>
          <Button
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'white',
              color: '#637381',
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <ChevronLeft />
          </Button>
        </Box>
        <Box sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)' }}>
          <Button
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'white',
              color: '#637381',
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <ChevronRight />
          </Button>
        </Box>
        
        <Typography sx={{ opacity: 0.8, mb: 1 }}>
          December 21-27
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
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
            borderRadius: 1,
          }}
        >
          Get Started
        </Button>
      </Card>

      {/* Popular Dishes */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Popular Dishes
        </Typography>
        <Button
          endIcon={<ArrowForwardIos sx={{ fontSize: 12 }} />}
          sx={{
            color: '#637381',
            '&:hover': { bgcolor: 'transparent', color: '#212B36' },
            textTransform: 'none',
          }}
        >
          View all
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
        {popularDishes.map((dish) => (
          <Card key={dish.id} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={dish.image}
                alt={dish.name}
                sx={{ width: '100%', height: 200, objectFit: 'cover' }}
              />
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
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {dish.discount}
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Rating value={dish.rating} readOnly size="small" />
                <Typography variant="body2" sx={{ color: '#637381', fontSize: 12 }}>
                  ({dish.reviews})
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#637381', mb: 1 }}>
                {dish.category}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                  <Box component="span" sx={{ color: '#FFA723', mr: 0.5 }}>$</Box>
                  {dish.price}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: '#212B36',
                    '&:hover': { bgcolor: '#454F5B' },
                    textTransform: 'none',
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

