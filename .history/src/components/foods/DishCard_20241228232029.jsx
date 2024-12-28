import { Box, Card, Typography, Button, Rating } from "@mui/material";

export default function DishCard({ dish }) {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)'
        },
        maxWidth: '100%',
        width: '100%'
      }}
    >
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
            value={dish.rating}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#FFC107",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "#637381",
              fontSize: 12,
            }}
          >
            ({dish.reviews})
          </Typography>
        </Box>
        <Typography
          variant="h6"
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
          Dishes
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
              fontSize: 16,
              fontWeight: 600,
              color: "#212B36",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <span style={{ color: "#FFC107" }}>$</span>
            {dish.price}
          </Typography>
          <Button
            variant="contained"
            size="small"
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
}

