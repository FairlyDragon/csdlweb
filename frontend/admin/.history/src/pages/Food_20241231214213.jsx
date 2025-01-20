import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
  Chip
} from '@mui/material';
import EditProduct from './EditProduct';

const Foods = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Dishes 1',
      price: 5.99,
      rating: 4.5,
      reviews: 131,
      category: 'Dishes',
      image: '/path/to/image1.jpg',
      discount: '10% Off'
    },
    // Add more products...
  ]);

  const [editDialog, setEditDialog] = useState({
    open: false,
    product: null
  });

  const handleEditClick = (product) => {
    setEditDialog({
      open: true,
      product: product
    });
  };

  const handleSave = (editedProduct) => {
    setProducts(products.map(p => 
      p.id === editedProduct.id ? editedProduct : p
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Foods
        </Typography>
        <Button 
          variant="contained"
          sx={{
            bgcolor: '#2D9CDB',
            '&:hover': {
              bgcolor: '#2386c0'
            }
          }}
        >
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ 
              borderRadius: '14px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)'
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                {product.discount && (
                  <Chip
                    label={product.discount}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: '#FF6B6B',
                      color: 'white'
                    }}
                  />
                )}
              </Box>

              <CardContent>
                <Box sx={{ mb: 1 }}>
                  <Rating value={product.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({product.reviews})
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 1 }}>
                  {product.name}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {product.category}
                </Typography>

                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Button 
                    variant="outlined"
                    onClick={() => handleEditClick(product)}
                    sx={{
                      color: '#2D9CDB',
                      borderColor: '#2D9CDB',
                      '&:hover': {
                        borderColor: '#2386c0'
                      }
                    }}
                  >
                    Edit Product
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <EditProduct
        open={editDialog.open}
        product={editDialog.product}
        onClose={() => setEditDialog({ open: false, product: null })}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Foods;

