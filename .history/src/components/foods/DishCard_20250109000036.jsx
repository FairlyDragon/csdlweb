import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({
  dish,
  showDiscountedPrice,
  calculatedPrice,
  onEditClick,
}) => {
  const handleEdit = () => {
    console.log("Editing dish with ID:", dish.menuitem_id);
    onEditClick(dish);
  };

  return (
    <Card
      sx={{
        width: "280px",
        bgcolor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.2s",
        border: `2px solid ${dish.is_active ? "#00AB55" : "#FF4842"}`,
        boxShadow: "none",
        "&:hover": {
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        },
      }}
    >
      <Box sx={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <Box
          component="img"
          src={dish.image_url}
          alt={dish.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            bgcolor: "#F4F6F8",
          }}
        />
        {dish.discount > 0 && showDiscountedPrice && (
          <Typography
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "#FF4842",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            {dish.discount}% Off
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Rating
            value={dish.average_rating}
            readOnly
            size="small"
            sx={{ color: "#FFC107" }}
          />
          <Typography
            sx={{
              color: "white",
              bgcolor: dish.is_active ? "#00AB55" : "#FF4842",
              px: 1,
              py: 0.5,
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            {dish.is_active ? "In Stock" : "Out of Stock"}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: "#212B36",
            fontSize: "1rem",
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
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: "2.4em",
            lineHeight: "1.2em",
          }}
        >
          {dish.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography
              component="span"
              sx={{
                color: "#637381",
                fontSize: "0.875rem",
                mr: 0.5,
              }}
            >
              $
            </Typography>
            <Typography
              sx={{
                color:
                  showDiscountedPrice && dish.discount ? "#FF4842" : "#212B36",
                fontSize: "1.125rem",
                fontWeight: 600,
              }}
            >
              {calculatedPrice}
            </Typography>
            {showDiscountedPrice && dish.discount > 0 && (
              <Typography
                sx={{
                  color: "#637381",
                  fontSize: "0.875rem",
                  ml: 1,
                  textDecoration: "line-through",
                }}
              >
                ${dish.price}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            onClick={handleEdit}
            sx={{
              bgcolor: "#F4F6F8",
              color: "#212B36",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#F4F6F8",
                boxShadow: "none",
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
  dish: PropTypes.shape({
    menuitem_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    average_rating: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
  }).isRequired,
  showDiscountedPrice: PropTypes.bool.isRequired,
  calculatedPrice: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default DishCard;
