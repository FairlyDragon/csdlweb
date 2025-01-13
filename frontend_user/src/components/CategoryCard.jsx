import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import SetMealIcon from '@mui/icons-material/SetMeal';

const CategoryContainer = styled(Box)({
  width: '80px',
  height: '80px',
  border: '1px solid #eee',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '#fff',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9'
  }
});

const IconWrapper = styled(Box)({
  fontSize: '1.5rem',
  marginBottom: '4px',
  '& .MuiSvgIcon-root': {
    fontSize: '24px',
    color: '#666'
  }
});

const getIcon = (name) => {
  const icons = {
    'Bakery': BakeryDiningIcon,
    'Burger': LunchDiningIcon,
    'Beverage': LocalCafeIcon,
    'Chicken': RestaurantIcon,
    'Pizza': LocalPizzaIcon,
    'Seafood': SetMealIcon
  };
  const Icon = icons[name] || RestaurantIcon;
  return <Icon />;
};

const CategoryCard = ({ name }) => {
  return (
    <CategoryContainer>
      <IconWrapper>
        {getIcon(name)}
      </IconWrapper>
      <Typography 
        sx={{ 
          fontSize: '0.75rem',
          color: '#666',
          textAlign: 'center'
        }}
      >
        {name}
      </Typography>
    </CategoryContainer>
  );
};

export default CategoryCard;