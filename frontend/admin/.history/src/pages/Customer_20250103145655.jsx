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
  {
    customer_id: "00002",
    name: "Ho Thi B",
    email: "customer2@gmail.com",
    password: "hashedpass2",
    phone_number: "0123456790",
    address: "20 Tay Son",
    created_at: new Date("2024-01-29").toISOString(),
    date_of_birth: new Date("1992-05-20").toISOString(),
    gender: "Female",
  },
  {
    customer_id: "00003",
    name: "Le Van C",
    email: "customer3@gmail.com",
    address: "18 Quan Nhan",
    created_at: new Date("2024-01-23").toISOString(),
    gender: "Male",
  },
  {
    customer_id: "00004",
    name: "Tran Minh D",
    email: "customer4@gmail.com",
    address: "55 Tan Thai Tung",
    created_at: new Date("2024-01-05").toISOString(),
    gender: "Male",
  },
  {
    customer_id: "00005",
    name: "Nguyen Van E",
    email: "customer5@gmail.com",
    address: "36 Truong Chinh",
    created_at: new Date("2024-01-29").toISOString(),
    gender: "Male",
  },
  {
    customer_id: "00006",
    name: "Ho Xuan Huong",
    email: "customer6@gmail.com",
    address: "212 Thai Ha",
    created_at: new Date("2024-01-15").toISOString(),
    gender: "Female",
  },
  {
    customer_id: "00007",
    name: "Chu Van An",
    email: "customer7@gmail.com",
    address: "448 Pham Ngoc Thach",
    created_at: new Date("2024-01-21").toISOString(),
    gender: "Male",
  },
];

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

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

  // Tính toán số trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentCustomers = filteredCustomers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "#212B36", fontSize: "24px" }}
      >
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
            startAdornment={<FilterAltOutlinedIcon sx={{ mr: 1 }} />}
            sx={{
              borderRadius: "8px",
              bgcolor: "#F8F9FA",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
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
            sx={{
              borderRadius: "8px",
              bgcolor: "#F8F9FA",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
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
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              bgcolor: "#F8F9FA",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <SearchOutlinedIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />

        {/* Reset Filter Button */}
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
                    sx={{
                      color: "#00A76F",
                      "&:hover": {
                        bgcolor: "rgba(0, 167, 111, 0.08)",
                      },
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#FF4842",
                      "&:hover": {
                        bgcolor: "rgba(255, 72, 66, 0.08)",
                      },
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

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Show {(page - 1) * itemsPerPage + 1}-
          {Math.min(page * itemsPerPage, filteredCustomers.length)}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            sx={{
              bgcolor: "#F8F9FA",
              "&:hover": {
                bgcolor: "#F4F6F8",
              },
              "&.Mui-disabled": {
                bgcolor: "#F8F9FA",
              },
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            sx={{
              bgcolor: "#F8F9FA",
              "&:hover": {
                bgcolor: "#F4F6F8",
              },
              "&.Mui-disabled": {
                bgcolor: "#F8F9FA",
              },
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Customer;
