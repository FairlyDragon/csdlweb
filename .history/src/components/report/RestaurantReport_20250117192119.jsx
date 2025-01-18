import { useState, useEffect } from "react";
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
import ReportService from "../../services/ReportService";

export default function RestaurantReport() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [reportData, setReportData] = useState({
    totalFoodQuantity: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  const fetchReport = async () => {
    try {
      if (!startDate || !endDate) return;
      
      setLoading(true);
      const response = await ReportService.getRestaurantReport(startDate, endDate);
      setReportData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant report:", error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setSearchType("name");
    setPage(1);
  };

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      name: "Nha Hang A",
      email: "nhahanga@email.com",
      phone: "0123456789",
      address: "456 Tran Phu",
      created_at: "2024-09-06",
      totalOrders: 50,
      totalRevenue: 500,
      food: 150,
      amount: 300,
    },
    // Add more data...
  ];

  const filteredData = reportData.filter((row) => {
    const matchesSearch =
      searchType === "name"
        ? row.name.toLowerCase().includes(search.toLowerCase())
        : searchType === "email"
        ? row.email.toLowerCase().includes(search.toLowerCase())
        : searchType === "phone"
        ? row.phone.includes(search)
        : row.address.toLowerCase().includes(search.toLowerCase());

    const withinDateRange =
      !startDate || !endDate
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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Restaurant Report");

    worksheet.mergeCells("A1:J1");
    worksheet.getCell("A1").value = "Restaurant Report";
    worksheet.getCell("A1").font = {
      size: 16,
      bold: true,
      color: { argb: "000000" },
    };
    worksheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    worksheet.addRow([
      "ID",
      "NAME",
      "EMAIL",
      "PHONE",
      "ADDRESS",
      "DATE",
      "Food",
      "Amount",
    ]);
    worksheet.getRow(2).font = { bold: true };
    worksheet.getRow(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "f4f6f8" },
    };

    filteredData.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.food,
        row.amount,
      ]);
    });

    const lastRow = worksheet.rowCount + 1;
    worksheet.mergeCells(`A${lastRow}:F${lastRow}`);
    worksheet.getCell(`G${lastRow}`).value = "Total:";
    worksheet.getCell(`G${lastRow}`).font = { bold: true };
    worksheet.getCell(`G${lastRow + 1}`).value = filteredData.reduce(
      (sum, row) => sum + row.food,
      0
    );
    worksheet.getCell(`H${lastRow + 1}`).value = filteredData.reduce(
      (sum, row) => sum + row.amount,
      0
    );

    worksheet.columns.forEach((column) => {
      column.width = 15;
      column.alignment = { horizontal: "left", vertical: "middle" };
    });

    worksheet.getColumn("G").numFmt = "#,##0";
    worksheet.getColumn("H").numFmt = "$#,##0.00";

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "restaurant_report.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
    handleClose();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ["ID", "Name", "Email", "Phone", "Address", "Date", "Food", "Amount"],
      ],
      body: filteredData.map((row) => [
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.food,
        `$${row.amount}`,
      ]),
    });
    doc.save("restaurant_report.pdf");
    handleClose();
  };

  const exportToCSV = () => {
    const csv = [
      ["ID", "Name", "Email", "Phone", "Address", "Date", "Food", "Amount"],
      ...filteredData.map((row) => [
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.food,
        row.amount,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "restaurant_report.csv";
    link.click();
    handleClose();
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
                Food
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              displayedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">
                    {formatDate(row.created_at)}
                  </TableCell>
                  <TableCell align="center">{row.food}</TableCell>
                  <TableCell align="center">${row.amount}</TableCell>
                </TableRow>
              ))
            )}
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
          Total Food Quantity: <strong>{reportData.totalFoodQuantity}</strong>
        </Typography>
        <Typography>
          Total Revenue: <strong>${reportData.totalRevenue}</strong>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
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
