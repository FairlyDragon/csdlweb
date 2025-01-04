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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { format } from "date-fns";
import EditCustomer from "../components/customer/EditCustomer";

// Sample data structure
const initialCustomers = [
  {
    customer_id: "00001",
    name: "Nguyen Van A",
    email: "customer1@gmail.com",
    password: "hashedpass1",
    phone_number: "0123456789",
    address: "334 Nguyen Trai",
    created_at: new Date("2024-01-04").toISOString(),
    date_of_birth: new Date("1990-01-15").toISOString(),
    gender: "Male",
  },
  // ... other customer data
];

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const itemsPerPage = 5;

  // Initialize data
  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    const customersToUse = storedCustomers ? JSON.parse(storedCustomers) : initialCustomers;
    setCustomers(customersToUse);
    setFilteredCustomers(customersToUse);
    if (!storedCustomers) {
      localStorage.setItem("customers", JSON.stringify(initialCustomers));
    }
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    applyFilters(searchValue, genderFilter, dateFilter);
  };

  const handleGenderFilter = (value) => {
    setGenderFilter(value);
    applyFilters(searchTerm, value, dateFilter);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    applyFilters(searchTerm, genderFilter, value);
  };

  const applyFilters = (search, gender, date) => {
    let filtered = [...customers];

    if (search) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (gender !== "all") {
      filtered = filtered.filter((customer) => customer.gender === gender);
    }

    if (date !== "all") {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
      filtered = filtered.filter((customer) => {
        const customerDate = new Date(customer.created_at);
        return date === "recent"
          ? customerDate >= thirtyDaysAgo
          : customerDate < thirtyDaysAgo;
      });
    }

    setFilteredCustomers(filtered);
    setPage(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateFilter("all");
    setGenderFilter("all");
    setFilteredCustomers(customers);
  };

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
  };

  const handleSaveCustomer = (updatedCustomer) => {
    const newCustomers = customers.map((c) =>
      c.customer_id === updatedCustomer.customer_id ? updatedCustomer : c
    );
    setCustomers(newCustomers);
    setFilteredCustomers(newCustomers);
    localStorage.setItem("customers", JSON.stringify(newCustomers));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#212B36", fontSize: "24px" }}>
        Customer
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={dateFilter}
            onChange={(e) => handleDateFilter(e.target.value)}
            displayEmpty
            startAdornment={<FilterAltOutlinedIcon sx={{ mr: 1 }} />}
            sx={{
              borderRadius: "8px",
              bgcolor: "#F8F9FA",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
            }}
          >
            <MenuItem value="all">All Date</MenuItem>
            <MenuItem value="recent">Recent</MenuItem>
            <MenuItem value="older">Older</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={genderFilter}
            onChange={(e) => handleGenderFilter(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: "8px",
              bgcolor: "#F8F9FA",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
            }}
          >
            <MenuItem value="all">All Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          size="small"
          placeholder="Search by name or email"
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              bgcolor: "#F8F9FA",
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: "transparent" },
            },
          }}
          InputProps={{
            startAdornment: <SearchOutlinedIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />

        <Button
          variant="outlined"
          color="error"
          onClick={handleResetFilters}
          sx={{
            whiteSpace: "nowrap",
            borderRadius: "8px",
            textTransform: "none",
            borderColor: "#FF4842",
            color: "#FF4842",
            "&:hover": {
              borderColor: "#FF4842",
              bgcolor: "rgba(255, 72, 66, 0.08)",
            },
          }}
        >
          Reset Filter
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid #E5E8EB",
          borderRadius: "16px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F4F6F8" }}>
              <TableCell sx={{ color: "#637381" }}>ID</TableCell>
              <TableCell sx={{ color: "#637381" }}>NAME</TableCell>
              <TableCell sx={{ color: "#637381" }}>ADDRESS</TableCell>
              <TableCell sx={{ color: "#637381" }}>DATE</TableCell>
              <TableCell sx={{ color: "#637381" }}>EMAIL</TableCell>
              <TableCell sx={{ color: "#637381" }}>GENDER</TableCell>
              <TableCell sx={{ color: "#637381" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCustomers.map((customer) => (
              <TableRow
                key={customer.customer_id}
                sx={{ "&:hover": { backgroundColor: "#F4F6F8" } }}
              >
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  {format(new Date(customer.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(customer)}
                    sx={{
                      color: "#00A76F",
                      "&:hover": { bgcolor: "rgba(0, 167, 111, 0.08)" },
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#FF4842",
                      "&:hover": { bgcolor: "rgba(255, 72, 66, 0.08)" },
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          px: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Show {(page - 1) * itemsPerPage + 1}-
          {Math.min(page * itemsPerPage, filteredCustomers.length)} of{" "}
          {filteredCustomers.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            sx={{
              bgcolor: "#F8F9FA",
              "&:hover": { bgcolor: "#F4F6F8" },
              "&.Mui-disabled": { bgcolor: "#F8F9FA" },
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            sx={{
              bgcolor: "#F8F9FA",
              "&:hover": { bgcolor: "#F4F6F8" },
              "&.Mui-disabled": { bgcolor: "#F8F9FA" },
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>

      <EditCustomer
        open={Boolean(editingCustomer)}
        customer={editingCustomer}
        onClose={() => setEditingCustomer(null)}
        onSave={handleSaveCustomer}
      />
    </Box>
  );
};

export default Customer;

