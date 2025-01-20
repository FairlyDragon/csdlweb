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
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

// Sample data structure
const initialCustomers = [
  {
    customer_id: "00001",
    name: "Nguyen Van A",
    email: "customer1@gmail.com",
    password: "hashedpassword",
    phone_number: "0123456789",
    address: "123 Nguyen Trai",
    gender: "Male",
    created_at: new Date("2024-01-04").toISOString(),
  },
  // Add more sample data as needed
];

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    // Load customers from localStorage or use initial data
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      setCustomers(initialCustomers);
      localStorage.setItem("customers", JSON.stringify(initialCustomers));
    }
  }, []);

  useEffect(() => {
    let filtered = [...customers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply gender filter
    if (genderFilter !== "all") {
      filtered = filtered.filter(
        (customer) => customer.gender === genderFilter
      );
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

      filtered = filtered.filter((customer) => {
        const customerDate = new Date(customer.created_at);
        return dateFilter === "recent"
          ? customerDate >= thirtyDaysAgo
          : customerDate < thirtyDaysAgo;
      });
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, dateFilter, genderFilter, customers]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateFilter("all");
    setGenderFilter("all");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Customer
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
        {/* Date Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            size="small"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            displayEmpty
            startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Date</MenuItem>
            <MenuItem value="recent">Recent</MenuItem>
            <MenuItem value="older">Older</MenuItem>
          </Select>
        </FormControl>

        {/* Gender Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            size="small"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="all">All Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>

        {/* Search Field */}
        <TextField
          size="small"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />

        {/* Reset Filter Button */}
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetFilters}
          sx={{ whiteSpace: "nowrap" }}
        >
          Reset Filter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell>GENDER</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  {format(new Date(customer.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Show 1-20
        </Typography>
      </Box>
    </Box>
  );
};

export default Customer;
