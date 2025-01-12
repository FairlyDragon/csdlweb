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

export default function RestaurantReport() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const handleReset = () => {
    setSearch("");
    setDate("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch {
      return dateString;
    }
  };

  const reportData = [
    {
      id: "R0001",
      name: "Nha Hang C",
      address: "456 Tran Phu",
      date: "2024-09-06",
      totalOrders: 50,
      totalRevenue: 500,
    },
    // Add more data...
  ];

  return (
    <>
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F4F6F8" }}>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Total Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell>{row.totalOrders}</TableCell>
                <TableCell>${row.totalRevenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
          Total Orders: <strong>
            {reportData.reduce((sum, row) => sum + row.totalOrders, 0)}
          </strong>
        </Typography>
        <Typography>
          Total Revenue: <strong>
            ${reportData.reduce((sum, row) => sum + row.totalRevenue, 0)}
          </strong>
        </Typography>
      </Box>
    </>
  );
}
