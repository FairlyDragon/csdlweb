import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({ dish, onEditClick }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.2s",
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
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: 12,
            }}
          >
            {dish.discount}% Off
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={dish.rating} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1, color: "#637381" }}>
            ({dish.reviews})
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          {dish.category}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#2D9CDB", fontWeight: 600 }}>
            ${dish.price}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => onEditClick(dish)}
            sx={{
              color: "#637381",
              borderColor: "#DFE3E8",
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
