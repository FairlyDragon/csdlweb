import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { format, parseISO } from "date-fns";

export default function CustomerReport() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const handleReset = () => {
    setSearch("");
    setDate("");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch {
      return dateString;
    }
  };

  // Sample data
  const reportData = [
    {
      id: "C0001",
      name: "Nguyen Van A",
      address: "334 Nguyen Trai",
      date: "2024-09-04",
      totalOrder: 31,
      totalPurchase: 100,
    },
    // Add more data...
  ];

  return (
    <>
      {/* Search and Filter */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search by ID/Name/Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
          size="small"
        />
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: 200 }}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={handleReset}
          sx={{
            color: "#00A76F",
            borderColor: "#00A76F",
            "&:hover": {
              borderColor: "#00A76F",
              backgroundColor: "rgba(0, 167, 111, 0.08)",
            },
          }}
          variant="outlined"
        >
          Reset
        </Button>
        <Button
          startIcon={<FileDownloadIcon />}
          sx={{
            bgcolor: "#00A76F",
            color: "white",
            "&:hover": {
              bgcolor: "#00875C",
            },
          }}
          variant="contained"
        >
          Save Report
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F4F6F8" }}>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>Total Order</TableCell>
              <TableCell>Total Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell>{row.totalOrder}</TableCell>
                <TableCell>${row.totalPurchase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 4,
          mt: 2,
          p: 2,
        }}
      >
        <Typography>
          Total Order: <strong>
            {reportData.reduce((sum, row) => sum + row.totalOrder, 0)}
          </strong>
        </Typography>
        <Typography>
          Total Purchase: <strong>
            ${reportData.reduce((sum, row) => sum + row.totalPurchase, 0)}
          </strong>
        </Typography>
      </Box>
    </>
  );
}
