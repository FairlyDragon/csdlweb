import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Rating,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { dashboardService } from "../../services/DashBoardService";
import { formatDistanceToNow } from "date-fns";

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
            disabled={skip === 0}
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
            disabled={reviews.length < LIMIT}
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

      <Box>
        {reviews.map((review, index) => (
          <Box
            key={review.review_id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              py: 2,
              borderBottom: index !== reviews.length - 1 ? "1px solid #E5E7EB" : "none",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#DFE3E8",
                  color: "#637381",
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
                    mb: 1,
                  }}
                >
                  {formatDistanceToNow(new Date(review.review_date), {
                    addSuffix: true,
                  })}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#212B36",
                  }}
                >
                  {review.comment}
                </Typography>
              </Box>
            </Box>
            
            <Rating
              value={review.rating}
              readOnly
              size="small"
              sx={{
                color: "#FFAB00",
              }}
            />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default CustomerReviews;
