import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, InputAdornment } from '@mui/material';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
// Import MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SetMealIcon from '@mui/icons-material/SetMeal';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

// Temporary data
const categories = [
  { id: 1, name: 'Burger', icon: FastfoodIcon },
  { id: 2, name: 'Pizza', icon: LocalPizzaIcon },
  { id: 3, name: 'Chicken', icon: RestaurantIcon },
  { id: 4, name: 'Fish', icon: SetMealIcon },
  { id: 5, name: 'Coffee', icon: LocalCafeIcon },
];

const foods = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
    price: 12.99,
    image: '/src/assets/images/burger.jpg',
    category: 1
  },
  // Thêm các món ăn khác...
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter foods based on category and search query
  const filteredFoods = foods.filter(food => 
    food.category === selectedCategory &&
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Header />
      
      <Container sx={{ py: 4 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="search" width={24} height={24} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'background.paper',
                borderRadius: 2,
                '& fieldset': {
                  borderColor: 'grey.200'
                }
              }
            }}
          />
        </Box>

        {/* Categories */}
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Categories
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {categories.map(category => (
            <Grid item key={category.id}>
              <CategoryCard
                icon={category.icon}
                name={category.name}
                active={category.id === selectedCategory}
                onClick={() => setSelectedCategory(category.id)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Foods */}
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Menu Items
        </Typography>
        
        <Grid container spacing={3}>
          {filteredFoods.map(food => (
            <Grid item key={food.id} xs={12} sm={6} md={4}>
              <FoodCard food={food} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Menu;