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
  MenuItem,
  Menu,
  InputAdornment,
  Pagination,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { format, parseISO, isWithinInterval } from "date-fns";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import SearchIcon from "@mui/icons-material/Search";

export default function ShipperReport() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const rowsPerPage = 10;

  const filteredData = reportData.filter((row) => {
    const matchesSearch = searchType === 'name' 
      ? row.name.toLowerCase().includes(search.toLowerCase())
      : searchType === 'email'
      ? row.email.toLowerCase().includes(search.toLowerCase())
      : searchType === 'phone'
      ? row.phone.includes(search)
      : row.address.toLowerCase().includes(search.toLowerCase());

    const withinDateRange = !startDate || !endDate
      ? true
      : isWithinInterval(parseISO(row.created_at), {
          start: parseISO(startDate),
          end: parseISO(endDate),
        });

    return matchesSearch && withinDateRange;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleReset = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    setSearchType('name');
    setPage(1);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          size="small"
          sx={{ width: 120 }}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="phone">Phone</MenuItem>
          <MenuItem value="address">Address</MenuItem>
        </TextField>

        <TextField
          placeholder={`Search by ${searchType}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type="date"
          label="From Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ width: 170 }}
          size="small"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="date"
          label="To Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ width: 170 }}
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
          onClick={handleExportClick}
          sx={{
            bgcolor: "#00A76F",
            color: "white",
            "&:hover": {
              bgcolor: "#00875C",
            },
          }}
          variant="contained"
        >
          Export Report
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={exportToExcel}>Export to Excel</MenuItem>
          <MenuItem onClick={exportToPDF}>Export to PDF</MenuItem>
          <MenuItem onClick={exportToCSV}>Export to CSV</MenuItem>
        </Menu>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F4F6F8" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                NAME
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                EMAIL
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                PHONE
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ADDRESS
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                DATE
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Total Delivery
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Total Income
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">
                  {formatDate(row.created_at)}
                </TableCell>
                <TableCell align="center">{row.totalDelivery}</TableCell>
                <TableCell align="center">${row.totalIncome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
          }}
        >
          <Typography>
            Total Delivery:{" "}
            <strong>
              {filteredData.reduce((sum, row) => sum + row.totalDelivery, 0)}
            </strong>
          </Typography>
          <Typography>
            Total Income:{" "}
            <strong>
              ${filteredData.reduce((sum, row) => sum + row.totalIncome, 0)}
            </strong>
          </Typography>
        </Box>
        
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#00A76F",
              "&.Mui-selected": {
                bgcolor: "#00A76F",
                color: "white",
                "&:hover": {
                  bgcolor: "#00875C",
                },
              },
              "&:hover": {
                bgcolor: "rgba(0, 167, 111, 0.08)",
              },
            },
          }}
        />
      </Box>
    </>
  );
}
