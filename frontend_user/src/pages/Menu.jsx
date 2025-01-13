import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import SortIcon from '@mui/icons-material/Sort';

const categories = [
  { id: 1, name: 'Bakery' },
  { id: 2, name: 'Burger' },
  { id: 3, name: 'Beverage' },
  { id: 4, name: 'Chicken' },
  { id: 5, name: 'Pizza' },
  { id: 6, name: 'Seafood' }
];

const menuItems = [
  {
    id: 1,
    name: 'Egg salad',
    price: 5,
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    rating: 4
  },
  {
    id: 2,
    name: 'Spring roll',
    price: 5,
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    rating: 4
  },
  {
    id: 3,
    name: 'Pho',
    price: 5,
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43',
    rating: 4
  },
  {
    id: 4,
    name: 'Chicken',
    price: 5,
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f',
    rating: 4
  },
  {
    id: 5,
    name: 'Fried Rice',
    price: 5,
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    rating: 4
  },
  {
    id: 6,
    name: 'Beef Noodle',
    price: 5,
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa',
    rating: 4
  },
  {
    id: 7,
    name: 'Com Tam',
    price: 5,
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb',
    rating: 4
  },
  {
    id: 8,
    name: 'Chung cake',
    price: 5,
    description: 'Description',
    image: 'https://example.com/chung-cake.jpg',
    rating: 4
  }
];

const Menu = () => {
  return (
    <Box>
      <Header />
      
      <Box sx={{ p: 3 }}>
        {/* Category Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Category
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <CategoryCard 
                key={category.id}
                name={category.name}
              />
            ))}
          </Box>
        </Box>

        {/* Menu Items Section */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h6">Menu Item</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ 
                bgcolor: '#f5f5f5',
                px: 2,
                py: 1,
                borderRadius: 1,
                cursor: 'pointer'
              }}>
                Available
              </Box>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer'
              }}>
                <IconButton size="small">
                  <SortIcon sx={{ fontSize: 20 }} />
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
    </Box>
  );
};

export default Menu;