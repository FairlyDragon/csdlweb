import { Grid } from '@mui/material';
import DishCard from './DishCard';
import MenuFilters from './MenuFilters';

const MenuGrid = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
  });

  const dishes = [
    {
      id: 1,
      name: 'Spicy Noodles',
      price: 12.99,
      image: '/src/assets/images/dishes/dish1.jpg',
      category: 'noodles'
    },
    // ... thêm món ăn khác
  ];

  return (
    <Box>
      <MenuFilters filters={filters} setFilters={setFilters} />
      <Grid container spacing={3}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <DishCard dish={dish} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuGrid;