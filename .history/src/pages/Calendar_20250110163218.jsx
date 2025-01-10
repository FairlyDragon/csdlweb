import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Paper,
} from "@mui/material";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TodayIcon from "@mui/icons-material/Today";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("WEEK"); // DAY, WEEK, MONTH, YEAR, AGENDA

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Hackathon 2020",
      start: new Date(2024, 0, 15, 9, 0),
      end: new Date(2024, 0, 15, 17, 0),
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Team Scrum",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      color: "#2196F3",
    },
    {
      id: 3,
      title: "Breakfast",
      start: new Date(2024, 0, 15, 9, 0),
      end: new Date(2024, 0, 15, 10, 0),
      color: "#FFA726",
    },
  ];

  const renderHeader = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        p: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => setCurrentDate(new Date())}>
          <TodayIcon />
        </IconButton>
        <IconButton onClick={() => setCurrentDate((d) => subMonths(d, 1))}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton onClick={() => setCurrentDate((d) => addMonths(d, 1))}>
          <KeyboardArrowRightIcon />
        </IconButton>
        <Typography variant="h6">
          {format(currentDate, "MMMM yyyy")} (Week {format(currentDate, "w")})
        </Typography>
      </Box>

      <ButtonGroup variant="outlined">
        <Button
          onClick={() => setView("DAY")}
          variant={view === "DAY" ? "contained" : "outlined"}
        >
          DAY
        </Button>
        <Button
          onClick={() => setView("WEEK")}
          variant={view === "WEEK" ? "contained" : "outlined"}
        >
          WEEK
        </Button>
        <Button
          onClick={() => setView("MONTH")}
          variant={view === "MONTH" ? "contained" : "outlined"}
        >
          MONTH
        </Button>
        <Button
          onClick={() => setView("YEAR")}
          variant={view === "YEAR" ? "contained" : "outlined"}
        >
          YEAR
        </Button>
        <Button
          onClick={() => setView("AGENDA")}
          variant={view === "AGENDA" ? "contained" : "outlined"}
        >
          AGENDA
        </Button>
      </ButtonGroup>
    </Box>
  );

  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <Box sx={{ display: "flex", height: "calc(100vh - 200px)" }}>
        {/* Time column */}
        <Box
          sx={{
            width: "60px",
            borderRight: "1px solid #e0e0e0",
            pt: 8,
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                height: "60px",
                borderBottom: "1px solid #f0f0f0",
                px: 1,
                fontSize: "12px",
                color: "#666",
              }}
            >
              {`${i}:00`}
            </Box>
          ))}
        </Box>

        {/* Days columns */}
        {days.map((day, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              borderRight: "1px solid #e0e0e0",
              position: "relative",
            }}
          >
            {/* Day header */}
            <Box
              sx={{
                p: 1,
                textAlign: "center",
                borderBottom: "1px solid #e0e0e0",
                bgcolor: "#f5f5f5",
                height: "80px",
              }}
            >
              <Typography
                sx={{
                  color: !isSameMonth(day, currentDate)
                    ? "#bbb"
                    : format(day, "eee") === "Sun"
                    ? "red"
                    : format(day, "eee") === "Sat"
                    ? "red"
                    : "inherit",
                }}
              >
                {format(day, "eee")}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: !isSameMonth(day, currentDate)
                    ? "#bbb"
                    : format(day, "eee") === "Sun"
                    ? "red"
                    : format(day, "eee") === "Sat"
                    ? "red"
                    : "inherit",
                }}
              >
                {format(day, "d")}
              </Typography>
            </Box>

            {/* Events */}
            {events.map((event) => {
              if (isSameDay(day, event.start)) {
                const top =
                  event.start.getHours() * 60 + event.start.getMinutes();
                const height =
                  (event.end.getHours() - event.start.getHours()) * 60;

                return (
                  <Paper
                    key={event.id}
                    sx={{
                      position: "absolute",
                      left: "4px",
                      right: "4px",
                      top: `${top + 80}px`,
                      height: `${height}px`,
                      bgcolor: event.color,
                      color: "white",
                      p: 1,
                      fontSize: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.9,
                      },
                    }}
                  >
                    {event.title}
                  </Paper>
                );
              }
              return null;
            })}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      {renderHeader()}
      {renderWeekView()}
    </Box>
  );
};

export default Calendar;
