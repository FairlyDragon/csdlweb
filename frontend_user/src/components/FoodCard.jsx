import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const FoodCard = ({ food }) => {
  const { image, name, description, price } = food;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{ 
          objectFit: 'cover',
          borderRadius: '16px 16px 0 0'
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 3, flexGrow: 1 }}
        >
          {description}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 600 
            }}
          >
            ${price.toFixed(2)}
          </Typography>
          
          <Button 
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard;