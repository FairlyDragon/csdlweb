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
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomerReport() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name"); // name, email, phone
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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

  // Sample data
  const reportData = [
    {
      id: "C0001",
      name: "Nguyen Van A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      address: "334 Nguyen Trai",
      created_at: "2024-09-04",
      totalOrder: 31,
      totalPurchase: 100,
    },
    // Add more data...
  ];

  // Filter data
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

  // Export functions
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customer Report");

    // Add title
    worksheet.mergeCells("A1:H1");
    worksheet.getCell("A1").value = "Customer Report";
    worksheet.getCell("A1").font = {
      size: 16,
      bold: true,
      color: { argb: "000000" },
    };
    worksheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Add headers
    worksheet.addRow([
      "ID",
      "NAME",
      "EMAIL",
      "PHONE",
      "ADDRESS",
      "DATE",
      "Total Order",
      "Total Purchase",
    ]);
    worksheet.getRow(2).font = { bold: true };
    worksheet.getRow(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "f4f6f8" },
    };

    // Add data
    filteredData.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.totalOrder,
        row.totalPurchase,
      ]);
    });

    // Add summary row
    const lastRow = worksheet.rowCount + 1;
    worksheet.mergeCells(`A${lastRow}:F${lastRow}`);
    worksheet.getCell(`G${lastRow}`).value = "Total:";
    worksheet.getCell(`G${lastRow}`).font = { bold: true };
    worksheet.getCell(`G${lastRow + 1}`).value = filteredData.reduce(
      (sum, row) => sum + row.totalOrder,
      0
    );
    worksheet.getCell(`H${lastRow + 1}`).value = filteredData.reduce(
      (sum, row) => sum + row.totalPurchase,
      0
    );

    // Style all cells
    worksheet.columns.forEach((column) => {
      column.width = 15;
      column.alignment = { horizontal: "left", vertical: "middle" };
    });

    // Style specific columns
    worksheet.getColumn("G").numFmt = "#,##0"; // Total Order column
    worksheet.getColumn("H").numFmt = "$#,##0.00"; // Total Purchase column

    // Add borders
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

    // Generate & Save File
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "customer_report.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
    handleClose();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "ID",
          "Name",
          "Email",
          "Phone",
          "Address",
          "Date",
          "Total Order",
          "Total Purchase",
        ],
      ],
      body: filteredData.map((row) => [
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.totalOrder,
        `$${row.totalPurchase}`,
      ]),
    });
    doc.save("customer_report.pdf");
    handleClose();
  };

  const exportToCSV = () => {
    const csv = [
      [
        "ID",
        "Name",
        "Email",
        "Phone",
        "Address",
        "Date",
        "Total Order",
        "Total Purchase",
      ],
      ...filteredData.map((row) => [
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.totalOrder,
        row.totalPurchase,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "customer_report.csv";
    link.click();
    handleClose();
  };

  return (
    <>
      {/* Search and Filter */}
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

      {/* Table */}
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
                Total Order
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Total Purchase
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
                <TableCell align="center">{row.totalOrder}</TableCell>
                <TableCell align="center">${row.totalPurchase}</TableCell>
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
          Total Order:{" "}
          <strong>
            {filteredData.reduce((sum, row) => sum + row.totalOrder, 0)}
          </strong>
        </Typography>
        <Typography>
          Total Purchase:{" "}
          <strong>
            ${filteredData.reduce((sum, row) => sum + row.totalPurchase, 0)}
          </strong>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography>
            Total Order:{" "}
            <strong>
              {filteredData.reduce((sum, row) => sum + row.totalOrder, 0)}
            </strong>
          </Typography>
          <Typography>
            Total Purchase:{" "}
            <strong>
              ${filteredData.reduce((sum, row) => sum + row.totalPurchase, 0)}
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
