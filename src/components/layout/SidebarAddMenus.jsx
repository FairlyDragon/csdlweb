import { Box, Typography, Button } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddIcon from '@mui/icons-material/Add';

export default function SidebarAddMenus() {
  return (
    <Box
      sx={{
        width: '100%',
        p: 1.5,
        bgcolor: 'rgba(0, 167, 111, 0.08)',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1.5,
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 8px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <RestaurantIcon sx={{ color: '#00A76F', fontSize: 18 }} />
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          color: '#637381',
          mb: 1,
          lineHeight: 1.4,
        }}
      >
        Please, organize your
        <br />
        menus through button
      </Typography>
      <Button
        startIcon={<AddIcon sx={{ fontSize: 16 }} />}
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#00A76F',
          '&:hover': {
            bgcolor: '#007867',
          },
          textTransform: 'none',
          borderRadius: 1,
          boxShadow: 'none',
          py: 0.5,
          fontSize: 12,
        }}
      >
        Add Menus
      </Button>
    </Box>
  );
}

