import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import SortIcon from '@mui/icons-material/Sort';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import SetMealIcon from '@mui/icons-material/SetMeal';

const categories = [
  { id: 1, name: 'Bakery', icon: FastfoodIcon },
  { id: 2, name: 'Burger', icon: FastfoodIcon },
  { id: 3, name: 'Beverage', icon: LocalDrinkIcon },
  { id: 4, name: 'Chicken', icon: RestaurantIcon },
  { id: 5, name: 'Pizza', icon: LocalPizzaIcon },
  { id: 6, name: 'Seafood', icon: SetMealIcon },
  { id: 7, name: 'Seafood', icon: SetMealIcon },
  { id: 8, name: 'Seafood', icon: SetMealIcon },
  { id: 9, name: 'Seafood', icon: SetMealIcon }
];

const menuItems = [
  {
    id: 1,
    name: 'Egg Salad',
    price: 5,
    description: 'Vietnamese style salad with eggs',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    rating: 4,
    category: 'Salad',
    available: true
  },
  {
    id: 2,
    name: 'Spring Roll',
    price: 5,
    description: 'Traditional Vietnamese spring rolls',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    rating: 4,
    category: 'Appetizer',
    available: true
  },
  {
    id: 3,
    name: 'Pho',
    price: 5,
    description: 'Vietnamese noodle soup',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43',
    rating: 4,
    category: 'Noodle',
    available: true
  },
  {
    id: 4,
    name: 'Grilled Chicken',
    price: 5,
    description: 'Vietnamese style grilled chicken',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f',
    rating: 4,
    category: 'Chicken',
    available: true
  },
  {
    id: 5,
    name: 'Fried Rice',
    price: 5,
    description: 'Vietnamese fried rice with egg',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    rating: 4,
    category: 'Rice',
    available: true
  },
  {
    id: 6,
    name: 'Beef Noodle',
    price: 5,
    description: 'Vietnamese beef noodle soup',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa',
    rating: 4,
    category: 'Noodle',
    available: true
  },
  {
    id: 7,
    name: 'Com Tam',
    price: 5,
    description: 'Broken rice with grilled pork',
    image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb',
    rating: 4,
    category: 'Rice',
    available: true
  },
  {
    id: 8,
    name: 'Chung Cake',
    price: 5,
    description: 'Traditional Vietnamese rice cake',
    image: 'https://example.com/chung-cake.jpg',
    rating: 4,
    category: 'Cake',
    available: true
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Category</Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexWrap: 'wrap',
        mb: 4 
      }}>
        {categories.map((category) => (
          <CategoryCard 
            key={category.id}
            category={category}
            selected={selectedCategory === category.name}
            onClick={() => setSelectedCategory(category.name)}
          />
        ))}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6">Menu Item</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box 
              sx={{ 
                bgcolor: '#f5f5f5',
                px: 2,
                py: 1,
                borderRadius: 1,
                cursor: 'pointer'
              }}
              onClick={() => setIsAvailableOnly(!isAvailableOnly)}
            >
              Available
            </Box>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer'
            }}>
              <IconButton size="small">
                <SortIcon />
              </IconButton>
              Sort by
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2
        }}>
          {menuItems.map((item) => (
            <FoodCard key={item.id} food={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;