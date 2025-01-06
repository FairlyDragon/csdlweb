import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import BakeryIcon from '../../assets/food/Baked.svg';
import BurgerIcon from '../../assets/food/Burger.svg';
import BeverageIcon from '../../assets/food/Coffee.svg';
import ChickenIcon from '../../assets/food/Chicken.svg';
import PizzaIcon from '../../assets/food/Fast.svg';
import SeafoodIcon from '../../assets/food/Fish.svg';

const categories = [
  { id: 'bakery', icon: BakeryIcon, label: 'Bakery' },
  { id: 'burger', icon: BurgerIcon, label: 'Burger' },
  { id: 'beverage', icon: BeverageIcon, label: 'Beverage' },
  { id: 'chicken', icon: ChickenIcon, label: 'Chicken' },
  { id: 'pizza', icon: PizzaIcon, label: 'Pizza' },
  { id: 'seafood', icon: SeafoodIcon, label: 'Seafood' },
];

const Food = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, color: '#212B36' }}>
        Foods
      </Typography>
      
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            sx={{
              minWidth: '100px',
              flexDirection: 'column',
              gap: 1,
              p: 2,
              bgcolor: selectedCategory === category.id ? '#919EAB14' : 'white',
              border: '1px solid',
              borderColor: selectedCategory === category.id ? '#919EAB33' : '#919EAB14',
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#919EAB14',
              }
            }}
          >
            <img 
              src={category.icon} 
              alt={category.label}
              style={{ width: 56, height: 56 }}
            />
            <Typography 
              sx={{ 
                color: '#637381',
                fontSize: '14px',
                textTransform: 'none'
              }}
            >
              {category.label}
            </Typography>
          </Button>
        ))}
      </Box>

      {/* Phần nội dung hiển thị các món ăn theo category */}
      <Box sx={{ mt: 4 }}>
        {/* Thêm DishCard components ở đây và filter theo selectedCategory */}
      </Box>
    </Box>
  );
};

export default Food;
