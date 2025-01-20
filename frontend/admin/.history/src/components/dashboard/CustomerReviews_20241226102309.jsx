import { Box, Typography, Avatar, Rating, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";

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
  const maxLength = 100; // Độ dài tối đa trước khi cắt
  
  const needsExpansion = comment.length > maxLength;
  const displayText = isExpanded ? comment : `${comment.slice(0, maxLength)}...`;

  return (
    <Box>
      <Typography 
        sx={{ 
          mb: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          height: 'auto',
          lineHeight: '1.5em',
          WebkitLineClamp: isExpanded ? 'unset' : 3,
        }}
      >
        {displayText}
      </Typography>
      {needsExpansion && (
        <Typography
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: 'primary.main',
            fontSize: '0.75rem',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
            mb: 1
          }}
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </Typography>
      )}
    </Box>
  );
};

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3; // Số lượng items hiển thị cùng lúc

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
          transition: "all 0.3s ease",
        }}
      >
        {reviews.map((review) => (
          <Box
            key={review.id}
            sx={{
              width: 300,
              minHeight: 420,
              bgcolor: "white",
              borderRadius: 2,
              p: 2,
              border: 1,
              borderColor: "divider",
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Avatar src={review.avatar} />
              <Box>
                <Typography fontWeight="bold">{review.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.time}
                </Typography>
              </Box>
            </Box>

            <ReviewComment comment={review.comment} />

            <Rating
              value={review.rating}
              precision={0.5}
              readOnly
              size="small"
              sx={{ mb: 2 }}
            />

            <Box
              component="img"
              src={review.image}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 1,
                mt: "auto",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
