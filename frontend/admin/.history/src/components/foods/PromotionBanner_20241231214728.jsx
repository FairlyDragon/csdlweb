import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const PromotionBanner = () => {
  return (
    <Box
      sx={{
        height: 200,
        borderRadius: '14px',
        bgcolor: '#6C5DD3',
        color: 'white',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        December 21-27
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Enjoy 20% discount
        <br />
        in this Christmas
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: '#FF6B6B',
          width: 'fit-content',
          '&:hover': {
            bgcolor: '#ff5252'
          }
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default PromotionBanner;

