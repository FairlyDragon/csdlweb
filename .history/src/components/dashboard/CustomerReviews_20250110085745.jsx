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
  const  = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await dashboardService.getCustomerReviews(skip, limit);
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

      <Stack spacing={2} divider={<Divider />}>
        {reviews.map((review) => (
          <Box
            key={review.review_id}
            sx={{
              display: "flex",
              gap: 2,
              py: 1,
            }}
          >
            <Avatar
              src={review.image_url}
              alt={review.name}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#DFE3E8",
                color: "#637381",
              }}
            >
              {review.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#212B36",
                    }}
                  >
                    {review.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#637381",
                    }}
                  >
                    {formatDistanceToNow(new Date(review.review_date), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                    sx={{
                      color: "#FFAB00",
                    }}
                  />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#212B36",
                  lineHeight: 1.5,
                }}
              >
                {review.comment}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default CustomerReviews;
