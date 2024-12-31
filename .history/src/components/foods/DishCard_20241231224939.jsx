import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({ dish, onEditClick }) => {
  return (
    <Card
      sx={{
        width: '304px',
        bgcolor: 'white',
        borderRadius: '16px',
        overflow: "hidden",
        transition: "all 0.2s",
        boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
        "&:hover": {
          boxShadow: "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          '& img': {
            transform: 'scale(1.05)',
          }
        },
      }}
    >
      <Box sx={{ position: "relative", height: '200px', overflow: 'hidden' }}>
        <Box
          component="img"
          src={dish.image}
          alt={dish.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: 'transform 0.3s ease-in-out'
          }}
        />
        {dish.discount && (
          <Typography
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "#FF4842",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              lineHeight: '20px',
              letterSpacing: '0.5px'
            }}
          >
            {dish.discount}% Off
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating 
            value={dish.rating} 
            readOnly 
            size="small"
            sx={{ 
              color: '#FFC107',
              '& .MuiRating-icon': {
                fontSize: '1rem'
              }
            }}
          />
          <Typography
            variant="body2"
            sx={{ 
              ml: 1, 
              color: "#637381",
              fontSize: '0.875rem'
            }}
          >
            ({dish.reviews})
          </Typography>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#212B36',
            mb: 1,
            fontSize: '0.875rem',
            fontWeight: 400
          }}
        >
          {dish.category}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography
              component="span"
              sx={{ 
                color: '#637381',
                fontSize: '0.875rem',
                mr: 0.5,
                fontWeight: 400
              }}
            >
              $
            </Typography>
            <Typography
              sx={{ 
                color: '#212B36',
                fontSize: '1.125rem',
                fontWeight: 600,
                lineHeight: '1.5'
              }}
            >
              {dish.price}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={onEditClick}
            sx={{
              color: "#637381",
              borderColor: "#DFE3E8",
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 400,
              px: 2,
              py: 0.75,
              minWidth: '92px',
              "&:hover": {
                borderColor: "#2D9CDB",
                color: "#2D9CDB",
                bgcolor: 'transparent'
              },
            }}
          >
            Edit Product
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

DishCard.propTypes = {
  dish: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default DishCard;
