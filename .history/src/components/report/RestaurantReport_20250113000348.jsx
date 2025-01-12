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
  Menu
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { format, parseISO, isWithinInterval } from "date-fns";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function RestaurantReport() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setSearchType("name");
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
      amount: 300
    },
    // Add more data...
  ];

  const filteredData = reportData.filter(row => {
    const matchesSearch = searchType === "name" ? row.name.toLowerCase().includes(search.toLowerCase()) :
                         searchType === "email" ? row.email.toLowerCase().includes(search.toLowerCase()) :
                         row.phone.includes(search);

    const withinDateRange = (!startDate || !endDate) ? true :
      isWithinInterval(parseISO(row.created_at), {
        start: parseISO(startDate),
        end: parseISO(endDate)
      });

    return matchesSearch && withinDateRange;
  });

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Restaurant Report");

    worksheet.mergeCells("A1:J1");
    worksheet.getCell("A1").value = "Restaurant Report";
    worksheet.getCell("A1").font = {
      size: 16,
      bold: true,
      color: { argb: "000000" }
    };
    worksheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle"
    };

    worksheet.addRow(["ID", "NAME", "EMAIL", "PHONE", "ADDRESS", "DATE", "Total Orders", "Total Revenue", "Food", "Amount"]);
    worksheet.getRow(2).font = { bold: true };
    worksheet.getRow(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "f4f6f8" }
    };

    filteredData.forEach(row => {
      worksheet.addRow([
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.totalOrders,
        row.totalRevenue,
        row.food,
        row.amount
      ]);
    });

    const lastRow = worksheet.rowCount + 1;
    worksheet.mergeCells(`A${lastRow}:F${lastRow}`);
    worksheet.getCell(`G${lastRow}`).value = "Total:";
    worksheet.getCell(`G${lastRow}`).font = { bold: true };
    worksheet.getCell(`G${lastRow + 1}`).value = filteredData.reduce((sum, row) => sum + row.totalOrders, 0);
    worksheet.getCell(`H${lastRow + 1}`).value = filteredData.reduce((sum, row) => sum + row.totalRevenue, 0);
    worksheet.getCell(`I${lastRow + 1}`).value = filteredData.reduce((sum, row) => sum + row.food, 0);
    worksheet.getCell(`J${lastRow + 1}`).value = filteredData.reduce((sum, row) => sum + row.amount, 0);

    worksheet.columns.forEach(column => {
      column.width = 15;
      column.alignment = { horizontal: "left", vertical: "middle" };
    });

    worksheet.getColumn("G").numFmt = "#,##0";
    worksheet.getColumn("H").numFmt = "$#,##0.00";
    worksheet.getColumn("I").numFmt = "#,##0";
    worksheet.getColumn("J").numFmt = "$#,##0.00";
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
