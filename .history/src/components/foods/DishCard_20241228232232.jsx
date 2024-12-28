import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({ dish, onEditClick }) => {
  if (!dish) return null;

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
        },
        maxWidth: "100%",
        width: "300px",
      }}
    >
      {dish.discount > 0 && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "#FF4842",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {dish.discount}% Off
        </Typography>
      )}
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
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Rating
            value={Number(dish.rating) || 0}
            readOnly
            size="small"
            precision={0.1}
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#FFC107",
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "#637381",
              fontSize: 12,
            }}
          >
            ({dish.reviews || 0})
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 0.5,
            color: "#212B36",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {dish.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "#637381",
            fontSize: 13,
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
            variant="subtitle1"
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: "#212B36",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box component="span" sx={{ color: "#FFC107" }}>
              $
            </Box>
            {Number(dish.price).toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => onEditClick?.(dish)}
            sx={{
              bgcolor: "#F4F6F8",
              color: "#212B36",
              "&:hover": {
                bgcolor: "#E7E9EC",
              },
              textTransform: "none",
              boxShadow: "none",
              px: 2,
              py: 0.75,
              fontSize: 13,
              fontWeight: 500,
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onEditClick: PropTypes.func,
};

DishCard.defaultProps = {
  onEditClick: () => {},
};

export default DishCard;
