import { Card, CardContent, Typography, Box } from '@mui/material';

const CategoryCard = ({ icon: Icon, name, active, onClick }) => {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        cursor: 'pointer',
        backgroundColor: active ? 'primary.main' : 'background.paper',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: active ? 'primary.dark' : 'grey.100'
        }
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        <Icon sx={{ fontSize: 40 }} />
        <Typography 
          variant="h6"
          sx={{ 
            color: active ? 'text.primary' : 'text.secondary',
            fontWeight: active ? 600 : 400
          }}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;