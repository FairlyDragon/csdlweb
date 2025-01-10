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
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
} from "date-fns";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TodayIcon from "@mui/icons-material/Today";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("WEEK"); // DAY, WEEK, MONTH, YEAR

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

  const handleDateChange = (direction) => {
    let newDate;
    switch (view) {
      case "DAY":
        newDate =
          direction === "next"
            ? addDays(selectedDate, 1)
            : subDays(selectedDate, 1);
        break;
      case "WEEK":
        newDate =
          direction === "next"
            ? addWeeks(selectedDate, 1)
            : subWeeks(selectedDate, 1);
        break;
      case "MONTH":
        newDate =
          direction === "next"
            ? addMonths(selectedDate, 1)
            : subMonths(selectedDate, 1);
        break;
      case "YEAR":
        newDate =
          direction === "next"
            ? addYears(selectedDate, 1)
            : subYears(selectedDate, 1);
        break;
      default:
        newDate = selectedDate;
    }
    setSelectedDate(newDate);
  };

  const renderHeader = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() => {
            const today = new Date();
            setCurrentDate(today);
            setSelectedDate(today);
          }}
        >
          <TodayIcon />
        </IconButton>
        <IconButton onClick={() => handleDateChange("prev")}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton onClick={() => handleDateChange("next")}>
          <KeyboardArrowRightIcon />
        </IconButton>
        <Typography variant="h6">
          {format(selectedDate, "MMMM yyyy")}
          {view === "WEEK" && ` (Week ${format(selectedDate, "w")})`}
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
      </ButtonGroup>
    </Box>
  );

  const renderWeekView = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
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
                  color: !isSameMonth(day, selectedDate)
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
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: isSameDay(day, new Date())
                    ? "#1a73e8"
                    : isSameDay(day, selectedDate)
                    ? "#e8f0fe"
                    : "transparent",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: isSameDay(day, new Date())
                      ? "white"
                      : isSameDay(day, selectedDate)
                      ? "#1a73e8"
                      : !isSameMonth(day, selectedDate)
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
