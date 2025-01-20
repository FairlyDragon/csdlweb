import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({ dish, onEditClick }) => {
  return (
    <Card
      sx={{
        bgcolor: "white",
        borderRadius: "14px",
        overflow: "hidden",
        transition: "all 0.2s",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
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
              borderRadius: "4px",
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
            sx={{ color: "#FFC107" }}
          />
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              color: "#637381",
              fontSize: "0.875rem",
            }}
          >
            ({dish.reviews})
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "#212B36",
            mb: 1,
            fontSize: "0.875rem",
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
                color: "#212B36",
                fontSize: "1.125rem",
                fontWeight: 600,
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
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
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
