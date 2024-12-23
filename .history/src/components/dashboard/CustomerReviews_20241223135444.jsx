import { Box, Card, Typography, Avatar, Rating, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const reviews = [
  {
    id: 1,
    name: 'Jons Sena',
    time: '2 days ago',
    rating: 4.5,
    comment: "The best dish I've ever experienced in my life",
    image: '/placeholder.svg',
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Sofia',
    time: '2 days ago',
    rating: 4.0,
    comment: 'Really love food from FairyDragon',
    image: '/placeholder.svg',
    avatar: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Tai',
    time: '3 days ago',
    rating: 5.0,
    comment: 'Món này rất là ngon và hương thơm',
    image: '/placeholder.svg',
    avatar: '/placeholder.svg',
  },
]

export default function CustomerReviews() {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6">Customer Review</Typography>
          <Typography variant="body2" color="text.secondary">
            Review food
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton size="small">
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-track': { bgcolor: '#f1f1f1' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#888', borderRadius: 2 },
        }}
      >
        {reviews.map((review) => (
          <Box
            key={review.id}
            sx={{
              minWidth: 300,
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 2,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Avatar src={review.avatar} />
              <Box>
                <Typography fontWeight="bold">{review.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.time}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ mb: 2 }}>{review.comment}</Typography>
            <Rating value={review.rating} precision={0.5} readOnly size="small" />
            <Box
              component="img"
              src={review.image}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 1,
                mt: 2,
              }}
            />
          </Box>
        ))}
      </Box>
    </Card>
  )
}

