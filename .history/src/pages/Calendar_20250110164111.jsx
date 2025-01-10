import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Paper,
  TextField,
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
  getMonth,
  getYear,
} from "date-fns";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TodayIcon from "@mui/icons-material/Today";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("WEEK"); // DAY, WEEK, MONTH, YEAR
  const [filterText, setFilterText] = useState("");

  // Mock data for filters
  const filters = [
    { id: 1, name: "Bryntum team", color: "#4285f4" },
    { id: 2, name: "Hotel Park", color: "#fbbc04" },
    { id: 3, name: "Michael Johnson", color: "#ea4335" },
  ];

  const renderHeader = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid #e0e0e0",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() => setCurrentDate(new Date())}
          sx={{ color: "#5f6368" }}
        >
          <TodayIcon />
        </IconButton>
        <IconButton
          onClick={() => setCurrentDate((d) => subMonths(d, 1))}
          sx={{ color: "#5f6368" }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => setCurrentDate((d) => addMonths(d, 1))}
          sx={{ color: "#5f6368" }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: "#3c4043" }}>
          {format(currentDate, "MMMM d, yyyy")}
        </Typography>
      </Box>

      <ButtonGroup
        variant="outlined"
        sx={{
          "& .MuiButton-root": {
            color: "#3c4043",
            borderColor: "#dadce0",
            "&.Mui-selected": {
              bgcolor: "#1a73e8",
              color: "#fff",
            },
          },
        }}
      >
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

  const renderSidebar = () => (
    <Box
      sx={{
        width: 200,
        p: 2,
        borderRight: "1px solid #e0e0e0",
        height: "100%",
      }}
    >
      <TextField
        placeholder="Filter events"
        size="small"
        fullWidth
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{ mb: 2 }}
      />
      {filters.map((filter) => (
        <Box
          key={filter.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: 1,
              bgcolor: filter.color,
            }}
          />
          <Typography>{filter.name}</Typography>
        </Box>
      ))}
    </Box>
  );

  // Render functions for different views...
  // You can add renderDayView(), renderMonthView(), renderYearView()

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8f9fa",
      }}
    >
      {renderHeader()}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {renderSidebar()}
        <Box sx={{ flex: 1, p: 2 }}>
          {view === "DAY" && renderDayView()}
          {view === "WEEK" && renderWeekView()}
          {view === "MONTH" && renderMonthView()}
          {view === "YEAR" && renderYearView()}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
