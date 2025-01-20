import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Rating,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { dashboardService } from "../../services/DashBoardService";
import { format } from "date-fns";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [skip, setSkip] = useState(0);
  const LIMIT = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await dashboardService.getCustomerReviews(skip, LIMIT);
        if (skip === 0) {
          setReviews(response);
        } else {
          setReviews((prev) => [...prev, ...response]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [skip]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + LIMIT);
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
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#111827",
          mb: 3,
        }}
      >
        Customer Reviews
      </Typography>

      <Stack spacing={2}>
        {reviews.map((review) => (
          <Box key={review.review_id}>
            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Avatar
                src={review.image_url}
                alt={review.name}
                sx={{ width: 48, height: 48 }}
              />
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 0.5,
                  }}
                >
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
                      {format(new Date(review.review_date), "MMM d, yyyy")}
                    </Typography>
                  </Box>
                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                    sx={{
                      color: "#FBBF24",
                    }}
                  />
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
            </Box>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
      </Stack>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handleLoadMore}
          sx={{
            color: "#10B981",
            borderColor: "#10B981",
            "&:hover": {
              borderColor: "#10B981",
              backgroundColor: "rgba(16, 185, 129, 0.08)",
            },
          }}
        >
          Load More
        </Button>
      </Box>
    </Card>
  );
};

export default CustomerReviews;
