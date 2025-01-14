import { Box, Typography } from '@mui/material';

const CategoryCard = ({ category, selected, onClick }) => {
  const { name, icon: Icon } = category;
  
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 80,
        height: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'grey.300',
        borderRadius: 2,
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
        }
      }}
    >
      <Icon sx={{ 
        fontSize: 32,
        color: selected ? 'primary.main' : 'text.primary'
      }} />
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          color: selected ? 'primary.main' : 'text.primary'
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default CategoryCard;