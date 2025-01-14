import { Box, Card, CardMedia, Typography, Rating, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const FoodCard = ({ food }) => {
  const { name, price, description, image, rating } = food;

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
      />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 2
        }}>
          <Rating value={rating} readOnly size="small" />
          <Typography variant="h6" color="primary">
            ${price}
          </Typography>
        </Box>
      </Box>

      <IconButton
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          bgcolor: 'white',
          '&:hover': {
            bgcolor: 'white',
          }
        }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </Card>
  );
};

export default FoodCard;