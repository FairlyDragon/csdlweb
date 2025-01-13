import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

const CardContainer = styled(Box)({
  border: '1px solid #eee',
  borderRadius: '16px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  }
});

const ImageContainer = styled(Box)({
  position: 'relative',
  height: '200px',
  overflow: 'hidden'
});

const AddButton = styled(IconButton)({
  position: 'absolute',
  right: '8px',
  bottom: '-20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#fff'
  }
});

const RatingContainer = styled(Box)({
  display: 'flex',
  gap: '2px',
  '& .MuiSvgIcon-root': {
    color: '#ffd700',
    fontSize: '16px'
  }
});

const FoodCard = ({ food }) => {
  const { name, description, price, image, rating } = food;
  
  return (
    <CardContainer>
      <ImageContainer>
        <Box
          component="img"
          src={image}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <AddButton>
          <AddIcon />
        </AddButton>
      </ImageContainer>

      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 1 
        }}>
          <Typography variant="h6">{name}</Typography>
          <RatingContainer>
            {[...Array(rating)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </RatingContainer>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2 }}
        >
          {description}
        </Typography>
        <Typography 
          color="primary" 
          fontWeight="bold"
        >
          $ {price}
        </Typography>
      </Box>
    </CardContainer>
  );
};

export default FoodCard;