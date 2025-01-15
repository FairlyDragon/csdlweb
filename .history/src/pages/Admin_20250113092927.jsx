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
  IconButton,
} from "@mui/material";
import { format, parseISO, isWithinInterval } from "date-fns";
import AddIcon from "@mui/icons-material/Add";

export default function Admin() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
        admin.id === id ? { ...admin, status: !admin.status } : admin
      )
    );
  };

  const handlePermissionChange = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, permission: !admin.permission } : admin
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
        : row.email.toLowerCase().includes(search.toLowerCase());

    const withinDateRange =
      !startDate || !endDate
        ? true
        : isWithinInterval(parseISO(row.register_date), {
            start: parseISO(startDate),
            end: parseISO(endDate),
          });

    return matchesSearch && withinDateRange;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Sub Admins
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#00A76F",
            "&:hover": {
              bgcolor: "#00875C",
            },
          }}
        >
          Add Admin
        </Button>
      </Box>

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
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F4F6F8" }}>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>REGISTER DATE</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
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
