import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({ dish, onEditClick }) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0px 0px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={dish.image}
          alt={dish.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        {dish.discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "#FF4842",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: "6px",
              fontSize: "0.875rem",
            }}
          >
            {dish.discount}% Off
          </Box>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={dish.rating}
            readOnly
            size="small"
            sx={{ color: "#FFC107" }}
          />
          <Typography sx={{ ml: 1, color: "#637381", fontSize: "0.875rem" }}>
            ({dish.reviews})
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontSize: "1.125rem",
            fontWeight: 600,
            mb: 1,
          }}
        >
          {dish.name}
        </Typography>

        <Typography
          sx={{
            color: "#637381",
            fontSize: "0.875rem",
            mb: 2,
            height: "3em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {dish.details}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
            ${dish.price}
          </Typography>
          <Button
            onClick={() => onEditClick(dish)}
            sx={{
              color: "#00AB55",
              "&:hover": { bgcolor: "rgba(0, 171, 85, 0.08)" },
              textTransform: "none",
            }}
          >
            Edit Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

DishCard.propTypes = {
  dish: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default DishCard;
