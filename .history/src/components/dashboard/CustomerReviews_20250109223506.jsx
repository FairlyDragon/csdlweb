import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Rating,
  IconButton,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { dashboardService } from "../../services/DashBoardService";
import { format, formatDistanceToNow } from "date-fns";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [skip, setSkip] = useState(0);
  const LIMIT = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await dashboardService.getCustomerReviews(skip, LIMIT);
        setReviews(response);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [skip]);

  const handlePrevious = () => {
    setSkip((prev) => Math.max(0, prev - LIMIT));
  };

  const handleNext = () => {
    setSkip((prev) => prev + LIMIT);
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "24px",
        bgcolor: "#FFFFFF",
        boxShadow:
          "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Customer Review
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            Review food
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={handlePrevious}
            disabled={skip === 0}
            sx={{
              width: 32,
              height: 32,
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              color: "#111827",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
              "&.Mui-disabled": {
                color: "#D1D5DB",
                borderColor: "#E5E7EB",
              },
            }}
          >
            <ChevronLeft sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={reviews.length < LIMIT}
            sx={{
              width: 32,
              height: 32,
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              color: "#111827",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
              "&.Mui-disabled": {
                color: "#D1D5DB",
                borderColor: "#E5E7EB",
              },
            }}
          >
            <ChevronRight sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      <Stack spacing={3}>
        {reviews.map((review) => (
          <Box
            key={review.review_id}
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Avatar
                  src={review.image_url}
                  alt={review.name}
                  sx={{ width: 32, height: 32 }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {review.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#6B7280",
                    }}
                  >
                    {formatDistanceToNow(new Date(review.review_date), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  sx={{
                    color: "#FBBF24",
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    ml: 1,
                    fontSize: "14px",
                    color: "#111827",
                  }}
                >
                  {review.rating.toFixed(1)}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#374151",
                  lineHeight: 1.5,
                }}
              >
                {review.comment}
              </Typography>
            </Box>
            <Box
              component="img"
              src={review.image_url}
              alt={review.name}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default CustomerReviews;
