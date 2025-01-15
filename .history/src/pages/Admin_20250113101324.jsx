import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Switch,
  InputAdornment,
  Menu,
} from "@mui/material";
import { format, parseISO, isWithinInterval } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Admin() {
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

  // Sample data
  const adminData = [
    {
      id: "SS001",
      name: "Nguyen Van A",
      email: "admin1@gmail.com",
      phone: "0123456789",
      register_date: "2024-09-14",
      status: false,
      permission: false,
    },
    // Add more data...
  ];

  const [admins, setAdmins] = useState(adminData);

  const handleStatusChange = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: !admin.status,
              permission: !admin.status,
            }
          : admin
      )
    );
  };

  const handlePermissionChange = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              permission: !admin.permission,
              status: !admin.permission,
            }
          : admin
      )
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch {
      return dateString;
    }
  };

  const filteredData = admins.filter((row) => {
    const matchesSearch =
      searchType === "name"
        ? row.name.toLowerCase().includes(search.toLowerCase())
        : searchType === "email"
        ? row.email.toLowerCase().includes(search.toLowerCase())
        : row.phone.includes(search);

    const withinDateRange =
      !startDate || !endDate
        ? true
        : isWithinInterval(parseISO(row.register_date), {
            start: parseISO(startDate),
            end: parseISO(endDate),
          });

    return matchesSearch && withinDateRange;
  });

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Admin List");

    // Add headers
    worksheet.addRow([
      "NAME",
      "Email",
      "Phone",
      "Register Date",
      "Status",
      "Permission",
    ]);

    // Add data
    filteredData.forEach((row) => {
      worksheet.addRow([
        row.name,
        row.email,
        row.phone,
        formatDate(row.register_date),
        row.status ? "Active" : "Inactive",
        row.permission ? "Granted" : "Not Granted",
      ]);
    });

    // Style the worksheet
    worksheet.getRow(1).font = { bold: true };
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Generate & Save File
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin_list.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
    handleClose();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ["NAME", "Email", "Phone", "Register Date", "Status", "Permission"],
      ],
      body: filteredData.map((row) => [
        row.name,
        row.email,
        row.phone,
        formatDate(row.register_date),
        row.status ? "Active" : "Inactive",
        row.permission ? "Granted" : "Not Granted",
      ]),
    });
    doc.save("admin_list.pdf");
    handleClose();
  };

  const exportToCSV = () => {
    const csv = [
      ["NAME", "Email", "Phone", "Register Date", "Status", "Permission"],
      ...filteredData.map((row) => [
        row.name,
        row.email,
        row.phone,
        formatDate(row.register_date),
        row.status ? "Active" : "Inactive",
        row.permission ? "Granted" : "Not Granted",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin_list.csv";
    link.click();
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Sub Admins
      </Typography>

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
            bgcolor: "",
            color: "white",
            "&:hover": {
              bgcolor: "#00875C",
            },
          }}
          variant="contained"
        >
          Export
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
              <TableCell>NAME</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>REGISTER DATE</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{formatDate(row.register_date)}</TableCell>
                <TableCell>
                  <Switch
                    checked={row.status}
                    onChange={() => handleStatusChange(row.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handlePermissionChange(row.id)}
                    sx={{
                      bgcolor: row.permission ? "#2065D1" : "#F4F6F8",
                      color: row.permission ? "white" : "#2065D1",
                      "&:hover": {
                        bgcolor: row.permission ? "#1C54B2" : "#E5E8EC",
                      },
                    }}
                  >
                    Permission
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
