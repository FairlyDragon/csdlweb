import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import SortIcon from '@mui/icons-material/Sort';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SetMealIcon from '@mui/icons-material/SetMeal';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import TapasIcon from '@mui/icons-material/Tapas';

const categories = [
  { id: 1, name: 'Rice Dishes', icon: RestaurantIcon },
  { id: 2, name: 'Noodles', icon: RamenDiningIcon },
  { id: 3, name: 'Street Food', icon: LunchDiningIcon },
  { id: 4, name: 'Seafood', icon: SetMealIcon },
  { id: 5, name: 'Beverages', icon: LocalBarIcon },
  { id: 6, name: 'Desserts', icon: BrunchDiningIcon },
  { id: 7, name: 'Appetizers', icon: TapasIcon },
  { id: 8, name: 'Hot Pot', icon: DinnerDiningIcon },
];
const menuItems = [
  {
    id: 1,
    name: 'Com Tam Suon Bi',
    price: 8.99,
    description: 'Broken rice with grilled pork chop and shredded pork skin',
    image: 'https://daynauan.info.vn/wp-content/uploads/2015/06/com-tam-suon-bi-cha.jpg',
    rating: 4.5,
    category: 'Rice Dishes',
    available: true
  },
  {
    id: 2,
    name: 'Pho Bo Tai Nam',
    price: 9.99,
    description: 'Rice noodle soup with rare beef and brisket',
    image: 'https://media.cooky.vn/recipe/g1/7751/s800x500/recipe7751-636422927556077030.jpg',
    rating: 4.8,
    category: 'Noodles',
    available: true
  },
  {
    id: 3,
    name: 'Banh Mi Thit Nuong',
    price: 6.99,
    description: 'Vietnamese sandwich with grilled pork',
    image: 'https://th.bing.com/th/id/R.866c20448d0ea3d6c1017413132774c8?rik=Po%2f6FswyrgjT1w&riu=http%3a%2f%2flonuongbanhmi.net.vn%2fwp-content%2fuploads%2f2015%2f10%2fava-cb72b.jpg&ehk=4K4fbc732WsQV3XtLwUjxgt3YqKqwkEvcF%2fkX1C%2fxd0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    rating: 4.6,
    category: 'Street Food',
    available: true
  },
  {
    id: 4,
    name: 'Goi Cuon Tom Thit',
    price: 7.99,
    description: 'Fresh spring rolls with shrimp and pork',
    image: 'https://i.pinimg.com/736x/80/95/40/809540058b26dd0e56966918aa8fc65e.jpg',
    rating: 4.4,
    category: 'Appetizers',
    available: true
  },
  {
    id: 5,
    name: 'Ca Phe Sua Da',
    price: 4.99,
    description: 'Vietnamese iced coffee with condensed milk',
    image: 'https://i.pinimg.com/736x/99/69/d9/9969d900634155d2753698c8bce88423.jpg',
    rating: 4.7,
    category: 'Beverages',
    available: true
  },
  {
    id: 6,
    name: 'Bun Bo Hue',
    price: 10.99,
    description: 'Spicy beef noodle soup from Hue',
    image: 'https://www.daklak24h.vn/images/news/2024/10/4/B%C3%BAn%20b%C3%B2%20Hu%E1%BA%BF%20v%E1%BB%9Bi%20b%C3%B2%20t%C3%A1i.png',
    rating: 4.6,
    category: 'Noodles',
    available: true
  },
  {
    id: 7,
    name: 'Lau Thai Hai San',
    price: 25.99,
    description: 'Thai-style seafood hot pot',
    image: 'https://i.pinimg.com/474x/4d/c3/f1/4dc3f1de184a91564f99a2df8cdb73c0.jpg',
    rating: 4.8,
    category: 'Hot Pot',
    available: true
  },
  {
    id: 8,
    name: 'Banh Xeo',
    price: 12.99,
    description: 'Vietnamese crispy pancake with shrimp',
    image: 'https://i.pinimg.com/736x/68/f6/4e/68f64e148a89d6ddb8293f2b1aacaad7.jpg',
    rating: 4.6,
    category: 'Street Food',
    available: true
  },
  {
  id: 9,
    name: 'Bun Cha Ha Noi',
    price: 11.99,
    description: 'Grilled pork with vermicelli, herbs and dipping sauce',
    image: 'https://i.pinimg.com/736x/8f/95/c2/8f95c217ba2d2346b499f9772ec15d3a.jpg',
    rating: 4.7,
    category: 'Noodles',
    available: true
  },
  {
    id: 10,
    name: 'Mi Quang',
    price: 12.99,
    description: 'Quang style noodles with pork, shrimp and quail eggs',
    image: 'https://i.pinimg.com/736x/28/0c/3f/280c3fa4dc8ed5bd40566ed360cc36a9.jpg',
    rating: 4.6,
    category: 'Noodles',
    available: true
  },
  {
    id: 11,
    name: 'Banh Cuon',
    price: 8.99,
    description: 'Steamed rice rolls with ground pork and wood ear mushroom',
    image: 'https://i.pinimg.com/236x/81/94/4c/81944cd43d10a0903162c567aef8da0d.jpg',
    category: 'Street Food',
    available: true
  },
  {
    id: 12,
    name: 'Cha Ca La Vong',
    price: 15.99,
    description: 'Turmeric-marinated fish with dill and noodles',
    image: 'https://i.pinimg.com/236x/ce/13/3d/ce133d9d69a317a4dd79dd2619909a87.jpg',
    rating: 4.8,
    category: 'Seafood',
    available: true
  },
  {
    id: 13,
    name: 'Tra Dao Cam Sa',
    price: 4.99,
    description: 'Peach tea with orange and cinnamon',
    image: 'https://i.pinimg.com/236x/20/56/44/205644e9c3334aefb25f107e30498b21.jpg',
    rating: 4.4,
    category: 'Beverages',
    available: true
  },
  {
    id: 14,
    name: 'Che Troi Nuoc',
    price: 6.99,
    description: 'Glutinous rice balls in ginger syrup',
    image: 'https://i.pinimg.com/236x/76/8d/04/768d0465df1d62d807a0ae9683251dbb.jpg',
    rating: 4.3,
    category: 'Desserts',
    available: true
  },
  {
    id: 15,
    name: 'Bo La Lot',
    price: 9.99,
    description: 'Grilled beef wrapped in betel leaves',
    image: 'https://i.pinimg.com/236x/1d/28/5c/1d285c94350c30c7b805b3bb726af16e.jpg',
    rating: 4.6,
    category: 'Appetizers',
    available: true
  },
  
  {
    id: 16,
    name: 'Com Chien Duong Chau',
    price: 10.99,
    description: 'Yang Chow fried rice Vietnamese style',
    image: 'https://th.bing.com/th/id/R.90ef5257e81a1bfd03c0826ced929811?rik=BH8x5vL0fH5jiA&pid=ImgRaw&r=0&sres=1&sresct=1',
    rating: 4.5,
    category: 'Rice Dishes',
    available: true
  },
  {
    id: 17,
    name: 'Banh Canh Cua',
    price: 13.99,
    description: 'Thick noodle soup with crab meat',
    image: 'https://i.pinimg.com/236x/1e/bd/8c/1ebd8c86da75aac4cba83303a1d5076b.jpg',
    rating: 4.6,
    category: 'Noodles',
    available: true
  },
  {
    id: 18,
    name: 'Sinh To Bo',
    price: 5.99,
    description: 'Fresh avocado smoothie with condensed milk',
    image: 'https://i.pinimg.com/236x/cc/9b/38/cc9b38af6f2d0d12eb7a06d8337d8e63.jpg',
    category: 'Beverages',
    available: true
  },
  {
    id: 19,
    name: 'Goi Ngo Sen',
    price: 11.99,
    description: 'Lotus stem salad with shrimp and pork',
    image: 'https://i.pinimg.com/236x/bd/6e/4a/bd6e4a2e452f3846ba3c250225908bb5.jpg',
    rating: 4.5,
    category: 'Appetizers',
    available: true
  },
  {
    id: 20,
    name: 'Ca Kho To',
    price: 14.99,
    description: 'Caramelized fish in clay pot',
    image: 'https://i.pinimg.com/736x/03/7f/28/037f28a1f061a5a6d69f289d861e1700.jpg',
    rating: 4.7,
    category: 'Seafood',
    available: true
  },
  {
    id: 21,
    name: 'Banh Flan',
    price: 4.99,
    description: 'Vietnamese style crème caramel',
    image: 'https://i.pinimg.com/236x/1a/ef/77/1aef771b0fd4ddffce50e4afba048cac.jpg',
    rating: 4.4,
    category: 'Desserts',
    available: true
  },
  {
    id: 22,
    name: 'Bo Kho',
    price: 13.99,
    description: 'Vietnamese style beef stew with bread',
    image: 'https://i.pinimg.com/236x/b2/b3/c6/b2b3c64129981bffdea0665ea960283c.jpg',
    rating: 4.6,
    category: 'Street Food',
    available: true
  },
  
  {
    id: 23,
    name: 'Tra Sen Vang',
    price: 4.99,
    description: 'Lotus tea with dried lotus seeds',
    image: 'https://i.pinimg.com/236x/f7/40/f6/f740f6b8f6ecb7c2946e80980b2d4b8e.jpg',
    rating: 4.5,
    category: 'Beverages',
    available: true
  },
  {
    id: 24,
    name: 'Nuoc Mia',
    price: 3.99,
    description: 'Fresh sugarcane juice',
    image: 'https://i.pinimg.com/736x/a8/c6/fe/a8c6fe00febc3575cebe01d6590774b4.jpg',
    category: 'Beverages',
    available: true
  },
  {
    id: 25,
    name: 'Sinh To Xoai',
    price: 5.99,
    description: 'Fresh mango smoothie with condensed milk',
    image: 'https://i.pinimg.com/736x/aa/fb/3a/aafb3aa51f54420f783e9ddfe64594fe.jpg',
    rating: 4.6,
    category: 'Beverages',
    available: true
  },
  {
    id: 26,
    name: 'Nuoc Sam',
    price: 4.99,
    description: 'Traditional herbal tea',
    image: 'https://i.pinimg.com/736x/a4/0d/f4/a40df4e0954ae5ef0f91465158a5a66c.jpg',
    rating: 4.3,
    category: 'Beverages',
    available: true
  },
  {
    id: 27,
    name: 'Tra Chanh',
    price: 3.99,
    description: 'Fresh lemon tea with honey',
    image: 'https://i.pinimg.com/736x/19/10/14/19101467353f72ff4ab38e0b4c637f74.jpg',
    rating: 4.5,
    category: 'Beverages',
    available: true
  },
  {
    id: 28,
    name: 'Cafe Trung',
    price: 5.99,
    description: 'Egg coffee - Hanoi specialty',
    image: 'https://i.pinimg.com/736x/41/10/04/4110048fc56571793f79678c93ee4979.jpg',
    rating: 4.7,
    category: 'Beverages',
    available: true
  }
  
  
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  // Lọc món ăn theo category và available
  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const availableMatch = !isAvailableOnly || item.available;
    return categoryMatch && availableMatch;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Category</Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexWrap: 'wrap',
        mb: 4 
      }}>
        {/* Thêm nút All để reset category */}
        <CategoryCard 
          key="all"
          category={{ id: 'all', name: 'All', icon: RestaurantIcon }}
          selected={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        />
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
          <Typography variant="h6">
            {selectedCategory === 'all' ? 'Menu Items' : selectedCategory}
            <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
              ({filteredItems.length} items)
            </Typography>
          </Typography>
          {/* ... rest of the code ... */}
        </Box>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2
        }}>
          {filteredItems.map((item) => (
            <FoodCard key={item.id} food={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;