import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({ dish, onEditClick }) => {
  return (
    <Card
      sx={{
        borderRadius: '14px',
        overflow: "hidden",
        transition: "all 0.2s",
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
          border: "3px solid #2D9CDB",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={dish.image}
          alt={dish.name}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
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
              px: 1.5,
              py: 0.5,
              borderRadius: '4px',
              fontSize: 12,
              fontWeight: 500,
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
            sx={{ color: '#FFC107' }}
          />
          <Typography
            variant="body2"
            sx={{ ml: 1, color: "#637381" }}
          >
            ({dish.reviews})
          </Typography>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#212B36',
            mb: 1
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
          <Typography
            sx={{ 
              color: "#2D9CDB", 
              fontSize: '18px',
              fontWeight: 600,
              '&::before': {
                content: '"$"',
                fontSize: '14px',
                verticalAlign: 'top',
                marginRight: '2px'
              }
            }}
          >
            {dish.price}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => onEditClick(dish)}
            sx={{
              color: "#637381",
              borderColor: "#DFE3E8",
              borderRadius: '8px',
              textTransform: 'none',
              "&:hover": {
                borderColor: "#2D9CDB",
                color: "#2D9CDB",
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
