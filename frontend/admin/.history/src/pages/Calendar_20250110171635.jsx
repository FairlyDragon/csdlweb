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
  startOfMonth,
  endOfMonth,
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
      <Box sx={{ display: "flex", height: "calc(100vh - 120px)" }}>
        {/* Time column */}
        <Box
          sx={{
            width: "60px",
            borderRight: "1px solid #e0e0e0",
            pt: 10,
            bgcolor: "#fff",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                height: "48px",
                borderBottom: "1px solid #f0f0f0",
                px: 1,
                fontSize: "0.75rem",
                color: "#637381",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: 2,
              }}
            >
              {i === 0
                ? "12 AM"
                : i < 12
                ? `${i} AM`
                : i === 12
                ? "12 PM"
                : `${i - 12} PM`}
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
              bgcolor: "#fff",
            }}
          >
            {/* Day header */}
            <Box
              sx={{
                p: 1,
                textAlign: "center",
                borderBottom: "1px solid #e0e0e0",
                height: "80px",
                position: "sticky",
                top: 0,
                bgcolor: "#fff",
                zIndex: 1,
              }}
            >
              <Typography
                sx={{
                  color:
                    i === 0
                      ? "#FF4842" // Sunday
                      : i === 6
                      ? "#FF4842" // Saturday
                      : "#637381",
                  fontSize: "0.875rem",
                  mb: 1,
                }}
              >
                {format(day, "EEE")}
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
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: isSameDay(day, new Date())
                      ? "#fff"
                      : isSameDay(day, selectedDate)
                      ? "#1a73e8"
                      : i === 0 || i === 6
                      ? "#FF4842"
                      : "#333",
                  }}
                >
                  {format(day, "d")}
                </Typography>
              </Box>
            </Box>

            {/* Time grid */}
            <Box>
              {Array.from({ length: 24 }).map((_, hour) => (
                <Box
                  key={hour}
                  sx={{
                    height: "48px",
                    borderBottom: "1px solid #f0f0f0",
                    position: "relative",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.02)",
                    },
                  }}
                />
              ))}
            </Box>

            {/* Events */}
            {events.map((event) => {
              if (isSameDay(day, event.start)) {
                const top =
                  event.start.getHours() * 48 +
                  (event.start.getMinutes() / 60) * 48;
                const height =
                  (event.end.getHours() - event.start.getHours()) * 48 +
                  ((event.end.getMinutes() - event.start.getMinutes()) / 60) *
                    48;

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
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      cursor: "pointer",
                      borderRadius: "4px",
                      "&:hover": {
                        opacity: 0.9,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

  const renderMonthView = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const firstDayOfMonth = startOfWeek(start);
    const lastDayOfMonth = endOfWeek(end);
    const days = eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    });
    const weeks = Math.ceil(days.length / 7);

    return (
      <Box sx={{ flex: 1, p: 2 }}>
        {/* Header row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            borderBottom: "1px solid #e0e0e0",
            mb: 1,
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <Typography
              key={i}
              sx={{
                textAlign: "center",
                color: i === 0 || i === 6 ? "red" : "inherit",
                py: 1,
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Calendar grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: `repeat(${weeks}, 1fr)`,
            height: "calc(100vh - 250px)",
          }}
        >
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <Box
              key={weekIndex}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1,
                    position: "relative",
                    borderRight: "1px solid #e0e0e0",
                    minHeight: "120px",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.02)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {weekIndex === 0 && (
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: "#637381",
                          mb: 0.5,
                        }}
                      >
                        {format(day, "MMM")}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        bgcolor: isSameDay(day, new Date())
                          ? "#1a73e8"
                          : isSameDay(day, selectedDate)
                          ? "#e8f0fe"
                          : "transparent",
                      }}
                    >
                      <Typography
                        sx={{
                          color: isSameDay(day, new Date())
                            ? "white"
                            : isSameDay(day, selectedDate)
                            ? "#1a73e8"
                            : !isSameMonth(day, selectedDate)
                            ? "#bbb"
                            : i === 0 || i === 6
                            ? "red"
                            : "inherit",
                          fontWeight: isSameMonth(day, selectedDate)
                            ? 500
                            : 400,
                        }}
                      >
                        {format(day, "d")}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Week number */}
                  {i === 0 && (
                    <Typography
                      sx={{
                        position: "absolute",
                        left: 4,
                        top: 4,
                        fontSize: "0.75rem",
                        color: "#637381",
                      }}
                    >
                      {format(day, "w")}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthDate = new Date(selectedDate.getFullYear(), i, 1);
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);
      const firstDay = startOfWeek(start);
      const lastDay = endOfWeek(end);
      return eachDayOfInterval({ start: firstDay, end: lastDay });
    });

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
          p: 3,
          height: "calc(100vh - 200px)",
          overflow: "auto",
        }}
      >
        {months.map((days, monthIndex) => (
          <Box key={monthIndex}>
            <Typography
              sx={{
                mb: 1.5,
                color: "#637381",
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              {format(new Date(selectedDate.getFullYear(), monthIndex), "MMMM")}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 0.5,
              }}
            >
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <Typography
                  key={i}
                  sx={{
                    textAlign: "center",
                    color: i === 0 || i === 6 ? "#FF4842" : "#637381",
                    fontSize: "0.75rem",
                    mb: 0.5,
                  }}
                >
                  {day}
                </Typography>
              ))}

              {days.map((day, i) => {
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(
                  day,
                  new Date(selectedDate.getFullYear(), monthIndex)
                );
                const isSunday = i % 7 === 0;
                const isSaturday = i % 7 === 6;

                return (
                  <Box
                    key={i}
                    sx={{
                      position: "relative",
                      textAlign: "center",
                      py: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        bgcolor: isToday
                          ? "#1a73e8"
                          : isSelected
                          ? "#e8f0fe"
                          : "transparent",
                        color: isToday
                          ? "white"
                          : !isCurrentMonth
                          ? "#bbb"
                          : isSunday || isSaturday
                          ? "#FF4842"
                          : "#333",
                        "&:hover": {
                          bgcolor: isToday ? "#1a73e8" : "rgba(0,0,0,0.04)",
                        },
                      }}
                    >
                      {format(day, "d")}
                    </Typography>
                    {/* Week number */}
                    {i < 7 && i === 0 && (
                      <Typography
                        sx={{
                          position: "absolute",
                          left: -24,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "0.75rem",
                          color: "#637381",
                        }}
                      >
                        {format(day, "w")}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const renderDayView = () => {
    return (
      <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
        {/* Time column */}
        <Box sx={{ 
          width: '60px', 
          borderRight: '1px solid #e0e0e0',
          pt: 10,
          bgcolor: '#fff'
        }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                height: '48px',
                borderBottom: '1px solid #f0f0f0',
                px: 1,
                fontSize: '0.75rem',
                color: '#637381',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                pr: 2
              }}
            >
              {i === 0 ? '12 AM' : 
               i < 12 ? `${i} AM` : 
               i === 12 ? '12 PM' : 
               `${i-12} PM`}
            </Box>
          ))}
        </Box>

        {/* Day column */}
        <Box sx={{
          flex: 1,
          borderRight: '1px solid #e0e0e0',
          position: 'relative',
          bgcolor: '#fff'
        }}>
          {/* Day header */}
          <Box sx={{
            p: 1,
            textAlign: 'center',
            borderBottom: '1px solid #e0e0e0',
            height: '80px',
            position: 'sticky',
            top: 0,
            bgcolor: '#fff',
            zIndex: 1
          }}>
            <Typography sx={{
              color: format(selectedDate, 'eee') === 'Sun' || 
                     format(selectedDate, 'eee') === 'Sat' ? '#FF4842' : '#637381',
              fontSize: '0.875rem',
              mb: 1
            }}>
              {format(selectedDate, 'EEE')}
            </Typography>
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: isSameDay(selectedDate, new Date()) ? '#1a73e8' : '#e8f0fe',
            }}>
              <Typography sx={{
                fontSize: '1.5rem',
                fontWeight: 500,
                color: isSameDay(selectedDate, new Date()) ? '#fff' : '#1a73e8'
              }}>
                {format(selectedDate, 'd')}
              </Typography>
            </Box>
          </Box>

          {/* Time grid */}
          <Box>
            {Array.from({ length: 24 }).map((_, hour) => (
              <Box
                key={hour}
                sx={{
                  height: '48px',
                  borderBottom: '1px solid #f0f0f0',
                  position: 'relative',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.02)'
                  }
                }}
              />
            ))}
          </Box>

          {/* Events */}
          {events.map(event => {
            if (isSameDay(selectedDate, event.start)) {
              const top = event.start.getHours() * 48 + 
                         (event.start.getMinutes() / 60) * 48;
              const height = (
                (event.end.getHours() - event.start.getHours()) * 48 +
                ((event.end.getMinutes() - event.start.getMinutes()) / 60) * 48
              );

              return (
                <Paper
                  key={event.id}
                  sx={{
                    position: 'absolute',
                    left: '4px',
                    right: '4px',
                    top: `${top + 80}px`,
                    height: `${height}px`,
                    bgcolor: event.color,
                    color: 'white',
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      {renderHeader()}
      {view === "WEEK" && renderWeekView()}
      {view === "MONTH" && renderMonthView()}
      {view === "YEAR" && renderYearView()}
    </Box>
  );
};

export default Calendar;
