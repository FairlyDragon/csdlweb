import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { CalendarToday, KeyboardArrowDown, Close } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function FilterPeriod({ onDateChange }) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApply = () => {
    onDateChange(dateRange);
    handleClose();
  };

  return (
    <>
      <Card
        onClick={handleOpen}
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
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            backgroundColor: "#EEF2FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CalendarToday sx={{ color: "#6366F1", fontSize: 20 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Filter Period
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dateRange.start_date
              ? `${dateRange.start_date} - ${dateRange.end_date}`
              : "Select date range"}
          </Typography>
        </Box>
        <KeyboardArrowDown sx={{ color: "#637381" }} />
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Filter Period
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
            <TextField
              label="Start Date"
              type="date"
              value={dateRange.start_date}
              onChange={(e) =>
                setDateRange({ ...dateRange, start_date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              value={dateRange.end_date}
              onChange={(e) =>
                setDateRange({ ...dateRange, end_date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleApply} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

FilterPeriod.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};
