import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Rating,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { dashboardService } from "../../services/DashBoardService";
import { formatDistanceToNow } from "date-fns";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ITEMS_PER_VIEW = 3;
  const LIMIT = 9;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await dashboardService.getCustomerReviews(0, LIMIT);
        setReviews(response);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, reviews.length - ITEMS_PER_VIEW)
    );
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + ITEMS_PER_VIEW
  );

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "24px",
        bgcolor: "#F9FAFB",
        boxShadow: "none",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#212B36",
            }}
          >
            Customer Review
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#637381",
            }}
          >
            Review food
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{
              width: 32,
              height: 32,
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              color: "#212B36",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
              "&.Mui-disabled": {
                color: "#919EAB",
                borderColor: "#E5E7EB",
              },
            }}
          >
            <ChevronLeft sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={currentIndex >= reviews.length - ITEMS_PER_VIEW}
            sx={{
              width: 32,
              height: 32,
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              color: "#212B36",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
              "&.Mui-disabled": {
                color: "#919EAB",
                borderColor: "#E5E7EB",
              },
            }}
          >
            <ChevronRight sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflow: "hidden",
        }}
      >
        {visibleReviews.map((review) => (
          <Card
            key={review.review_id}
            sx={{
              flex: 1,
              minWidth: 0,
              p: 2,
              borderRadius: 2,
              bgcolor: "white",
              boxShadow: "0px 2px 4px rgba(145, 158, 171, 0.16)",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0px 4px 8px rgba(145, 158, 171, 0.24)",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Avatar
                src={review.image_url}
                sx={{
                  width: 48,
                  height: 48,
                }}
              >
                {review.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#212B36",
                  }}
                >
                  {review.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#637381",
                  }}
                >
                  {formatDistanceToNow(new Date(review.review_date), {
                    addSuffix: true,
                  })}
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: "14px",
                color: "#212B36",
                mb: 2,
                minHeight: "60px",
              }}
            >
              {review.comment}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                value={review.rating}
                readOnly
                size="small"
                sx={{ color: "#FFAB00" }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#637381",
                }}
              >
                {review.rating.toFixed(1)}
              </Typography>
            </Box>

            {review.image_url && (
              <Box
                component="img"
                src={review.image_url}
                alt="Review"
                sx={{
                  mt: 2,
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
            )}
          </Card>
        ))}
      </Box>
    </Card>
  );
};

export default CustomerReviews;
