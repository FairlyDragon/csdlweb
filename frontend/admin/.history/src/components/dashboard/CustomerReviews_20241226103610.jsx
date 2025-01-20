import { Box, Typography, Avatar, Rating, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";

const reviews = [
  {
    id: 1,
    name: "Jons Sena",
    time: "2 days ago",
    rating: 4.5,
    comment: "The best dish I've ever experienced in my life",
    image: "/placeholder.svg",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sofia",
    time: "2 days ago",
    rating: 4.0,
    comment: "Really love food from FairyDragon",
    image: "/placeholder.svg",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Tâi",
    time: "3 days ago",
    rating: 5.0,
    comment:
      "Đồi mắt tôi đã nghĩ là khi thưởng thức được những món ăn tuyệt vời mà Fairy Dragon mang lại. Không có từ gì có thể diễn tả cảm xúc của tôi lúc này. Quá tuyệt vời !!!!",
    image: "/placeholder.svg",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "John Doe",
    time: "4 days ago",
    rating: 4.8,
    comment:
      "Amazing flavors and great service! Will definitely come back again.",
    image: "/placeholder.svg",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Maria Garcia",
    time: "5 days ago",
    rating: 4.7,
    comment:
      "The presentation and taste were both exceptional. Highly recommended!",
    image: "/placeholder.svg",
    avatar: "/placeholder.svg",
  },
];

const ReviewComment = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

  if (!comment) return null;

  const needsExpansion = comment.length > maxLength;
  const displayText = isExpanded
    ? comment
    : needsExpansion
    ? `${comment.slice(0, maxLength)}...`
    : comment;

  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          lineHeight: "1.5em",
          WebkitLineClamp: isExpanded ? "unset" : 3,
          transition: "max-height 0.3s ease",
          maxHeight: isExpanded ? "1000px" : "4.5em",
        }}
      >
        {displayText}
      </Typography>
      {needsExpansion && (
        <Typography
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: "#6B7280",
            fontSize: "0.75rem",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
            mt: 1,
          }}
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </Typography>
      )}
    </Box>
  );
};

ReviewComment.propTypes = {
  comment: PropTypes.string.isRequired,
};

const RatingWithScore = ({ value }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Rating value={value} precision={0.5} readOnly size="small" />
    <Typography
      sx={{
        color: "#6B7280",
        fontSize: "0.875rem",
        fontWeight: 500,
      }}
    >
      {value.toFixed(1)}
    </Typography>
  </Box>
);

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3;

  const handleScroll = (direction) => {
    const container = document.getElementById("reviews-container");
    if (container) {
      if (
        direction === "right" &&
        currentIndex < reviews.length - visibleItems
      ) {
        setCurrentIndex((prev) => prev + 1);
        container.scrollTo({
          left: (currentIndex + 1) * 320,
          behavior: "smooth",
        });
      } else if (direction === "left" && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        container.scrollTo({
          left: (currentIndex - 1) * 320,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Box sx={{ bgcolor: "#F9FAFB", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6">Customer Review</Typography>
          <Typography variant="body2" color="text.secondary">
            Review food
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => handleScroll("left")}
            disabled={currentIndex === 0}
            sx={{
              bgcolor: "white",
              "&:hover": { bgcolor: "white" },
              "&.Mui-disabled": {
                bgcolor: "rgba(255, 255, 255, 0.7)",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleScroll("right")}
            disabled={currentIndex >= reviews.length - visibleItems}
            sx={{
              bgcolor: "white",
              "&:hover": { bgcolor: "white" },
              "&.Mui-disabled": {
                bgcolor: "rgba(255, 255, 255, 0.7)",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      <Box
        id="reviews-container"
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "hidden",
          pb: 2,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollBehavior: "smooth",
        }}
      >
        {reviews.map((review) => (
          <Box
            key={review.id}
            sx={{
              width: 300,
              bgcolor: "white",
              borderRadius: 2,
              p: 2,
              border: 1,
              borderColor: "divider",
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "fit-content",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar src={review.avatar} />
              <Box>
                <Typography fontWeight="bold">{review.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.time}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              <ReviewComment comment={review.comment} />
              <Box
                component="img"
                src={review.image}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 1,
                  flexShrink: 0,
                }}
              />
            </Box>

            <RatingWithScore value={review.rating} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
