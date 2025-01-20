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
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { format, parseISO, isWithinInterval } from "date-fns";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function ShipperReport() {
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
      id: "S0001",
      name: "Nguyen Van B",
      email: "nguyenvanb@email.com",
      phone: "0987654321",
      address: "123 Le Loi",
      created_at: "2024-09-05",
      totalDelivery: 20,
      totalIncome: 200,
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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Shipper Report");

    worksheet.mergeCells("A1:H1");
    worksheet.getCell("A1").value = "Shipper Report";
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
      "Total Delivery",
      "Total Income",
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
        row.totalDelivery,
        row.totalIncome,
      ]);
    });

    const lastRow = worksheet.rowCount + 1;
    worksheet.mergeCells(`A${lastRow}:F${lastRow}`);
    worksheet.getCell(`G${lastRow}`).value = "Total:";
    worksheet.getCell(`G${lastRow}`).font = { bold: true };
    worksheet.getCell(`G${lastRow + 1}`).value = filteredData.reduce(
      (sum, row) => sum + row.totalDelivery,
      0
    );
    worksheet.getCell(`H${lastRow + 1}`).value = filteredData.reduce(
      (sum, row) => sum + row.totalIncome,
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
    link.download = "shipper_report.xlsx";
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
          "Total Delivery",
          "Total Income",
        ],
      ],
      body: filteredData.map((row) => [
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.totalDelivery,
        `$${row.totalIncome}`,
      ]),
    });
    doc.save("shipper_report.pdf");
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
        "Total Delivery",
        "Total Income",
      ],
      ...filteredData.map((row) => [
        row.id,
        row.name,
        row.email,
        row.phone,
        row.address,
        formatDate(row.created_at),
        row.totalDelivery,
        row.totalIncome,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shipper_report.csv";
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
          sx={{ flex: 1 }}
          size="small"
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
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>Total Delivery</TableCell>
              <TableCell>Total Income</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{row.totalDelivery}</TableCell>
                <TableCell>${row.totalIncome}</TableCell>
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
    </>
  );
}
