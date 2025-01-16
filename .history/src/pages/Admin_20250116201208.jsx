import { useState, useEffect } from "react";
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
  Pagination,
} from "@mui/material";
import { format, parseISO, isWithinInterval } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import CustomerService from "../services/CustomerService";
import AdminService from "../services/AdminService";
export default function Admin() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Số dòng tối đa mỗi trang
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Thêm useEffect để fetch data
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await CustomerService.getAllCustomers();
        // Transform data to match admin structure
        const transformedData = data.map((customer) => ({
          id: customer.user_id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone_number,
          register_date: customer.created_at,
          status: customer.account_status === "active",
          permission: customer.role === "admin",
        }));
        setAdmins(transformedData);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setSearchType("name");
    setStatusFilter("all");
    setPage(1); // Reset về trang 1
  };

  const handleStatusChange = async (id) => {
    try {
      await AdminService.updateAdminStatus(
        id,
        !admins.find((admin) => admin.id === id).status
      );
      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, status: !admin.status } : admin
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePermissionChange = async (id) => {
    try {
      await AdminService.updateAdminRole(id, "admin");
      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, permission: !admin.permission } : admin
        )
      );
    } catch (error) {
      console.error("Error updating permission:", error);
    }
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
        ? (row.name || "").toLowerCase().includes(search.toLowerCase())
        : searchType === "email"
        ? (row.email || "").toLowerCase().includes(search.toLowerCase())
        : (row.phone || "").includes(search);

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? row.status
        : !row.status;

    const withinDateRange =
      !startDate || !endDate
        ? true
        : isWithinInterval(parseISO(row.register_date), {
            start: parseISO(startDate),
            end: parseISO(endDate),
          });

    return matchesSearch && matchesStatus && withinDateRange;
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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{
            width: 120,
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#376D87",
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

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
            color: "#376D87",
            borderColor: "#376D87",
            "&:hover": {
              borderColor: "#376D87",
              backgroundColor: "rgba(55, 109, 135, 0.08)",
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
            bgcolor: "#376D87",
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
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                NAME
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Phone
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                REGISTER DATE
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              displayedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">
                    {formatDate(row.register_date)}
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={row.status}
                      onChange={() => handleStatusChange(row.id)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#376D87",
                          "&:hover": {
                            backgroundColor: "rgba(55, 109, 135, 0.08)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#376D87",
                          },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handlePermissionChange(row.id)}
                      sx={{
                        bgcolor: row.permission ? "#376D87" : "#F4F6F8",
                        color: row.permission ? "white" : "#376D87",
                        "&:hover": {
                          bgcolor: row.permission ? "#2B5468" : "#E5E8EC",
                        },
                      }}
                    >
                      Permission
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#376D87",
              "&.Mui-selected": {
                bgcolor: "#376D87",
                color: "white",
                "&:hover": {
                  bgcolor: "#2B5468",
                },
              },
              "&:hover": {
                bgcolor: "rgba(55, 109, 135, 0.08)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
