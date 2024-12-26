import { Box, Typography, Card } from "@mui/material";
import { CalendarToday, KeyboardArrowDown } from "@mui/icons-material";

const dateRange = {
  from: new Date(2024, 10, 17),
  to: new Date(2024, 11, 17),
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export default function FilterPeriod() {
  return (
    <Card
      sx={{
        width: 320,
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        cursor: "pointer",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        ml: "auto",
        borderRadius: "14px",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "rgba(99, 102, 241, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CalendarToday
          sx={{
            color: "#6366F1",
            fontSize: 20,
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#111827",
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          Filter Period
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#B9BBBD",
            fontSize: "0.7rem",
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          {`17 November 2024 - 17 December 2024`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <KeyboardArrowDown
          sx={{
            color: "#6B7280",
            fontSize: 24,
          }}
        />
      </Box>
    </Card>
  );
}
