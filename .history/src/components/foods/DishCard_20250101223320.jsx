import PropTypes from "prop-types";
import { Box, Card, Typography, Button, Rating } from "@mui/material";

const DishCard = ({ dish, onEditClick }) => {
  return (
    <Card
      sx={{
        width: "280px",
        bgcolor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.2s",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Box sx={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <Box
          component="img"
          src={dish.image}
          alt={dish.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            bgcolor: "#F4F6F8"
          }}
        />
        {dish.discount > 0 && (
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={dish.rating}
            readOnly
            size="small"
            sx={{ color: "#FFC107" }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: "#212B36",
            fontSize: "1rem",
            fontWeight: 600,
            mb: 1
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
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            height: "3.6em",
            lineHeight: "1.2em"
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
                bgcolor: "transparent",
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
