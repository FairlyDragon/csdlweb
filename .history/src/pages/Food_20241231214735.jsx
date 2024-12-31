import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PromotionBanner from '../components/foods/PromotionBanner';
import PopularDishes from '../components/foods/PopularDishes';

const Foods = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#212B36",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        Foods
      </Typography>

      {/* Promotion Banner */}
      <Box sx={{ mb: 4, position: 'relative' }}>
        <PromotionBanner />
        <IconButton 
          sx={{ 
            position: 'absolute', 
            left: 10, 
            top: '50%', 
            transform: 'translateY(-50%)',
            bgcolor: 'white',
            '&:hover': { bgcolor: 'white' }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton 
          sx={{ 
            position: 'absolute', 
            right: 10, 
            top: '50%', 
            transform: 'translateY(-50%)',
            bgcolor: 'white',
            '&:hover': { bgcolor: 'white' }
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Popular Dishes Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Popular Dishes
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#2D9CDB',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            View all
          </Typography>
        </Box>
        <PopularDishes />
      </Box>
    </Box>
  );
};

export default Foods;

