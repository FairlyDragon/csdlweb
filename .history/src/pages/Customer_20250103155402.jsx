import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
    password: "hashedpass3",
    phone_number: "0123456791",
    address: "18 Quan Nhan",
    created_at: new Date("2024-01-23").toISOString(),
    date_of_birth: new Date("1988-03-10").toISOString(),
    gender: "Male",
  },
  {
    customer_id: "00004",
    name: "Tran Minh D",
    email: "customer4@gmail.com",
    password: "hashedpass4",
    phone_number: "0123456792",
    address: "55 Tan Thai Tung",
    created_at: new Date("2024-01-05").toISOString(),
    date_of_birth: new Date("1995-07-22").toISOString(),
    gender: "Male",
  },
  {
    customer_id: "00005",
    name: "Nguyen Van E",
    email: "customer5@gmail.com",
    password: "hashedpass5",
    phone_number: "0123456793",
    address: "36 Truong Chinh",
    created_at: new Date("2024-01-29").toISOString(),
    date_of_birth: new Date("1991-11-30").toISOString(),
    gender: "Male",
  },
  {
    customer_id: "00006",
    name: "Ho Xuan Huong",
    email: "customer6@gmail.com",
    password: "hashedpass6",
    phone_number: "0123456794",
    address: "212 Thai Ha",
    created_at: new Date("2024-01-15").toISOString(),
    date_of_birth: new Date("1993-09-05").toISOString(),
    gender: "Female",
  },
  {
    customer_id: "00007",
    name: "Chu Van An",
    email: "customer7@gmail.com",
    password: "hashedpass7",
    phone_number: "0123456795",
    address: "448 Pham Ngoc Thach",
    created_at: new Date("2024-01-21").toISOString(),
    date_of_birth: new Date("1987-12-15").toISOString(),
    gender: "Male",
  },
];

const Customer = () => {
  const [customers] = useState(initialCustomers);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Customer
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>GENDER</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  {format(new Date(customer.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>
                  <IconButton size="small">
  const [customers, setCustomers] = useState(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      return JSON.parse(storedCustomers);
    }
    localStorage.setItem("customers", JSON.stringify(initialCustomers));
    return initialCustomers;
  });

  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    let filtered = [...customers];

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genderFilter !== "all") {
      filtered = filtered.filter(
        (customer) => customer.gender === genderFilter
      );
    }

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
  }, [customers, searchTerm, dateFilter, genderFilter]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleGenderFilter = (value) => {
    setGenderFilter(value);
    setPage(1);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateFilter("all");
    setGenderFilter("all");
    setPage(1);
  };

  const handleSaveCustomer = (updatedCustomer) => {
    const newCustomers = customers.map((c) =>
      c.customer_id === updatedCustomer.customer_id ? updatedCustomer : c
    );
    setCustomers(newCustomers);
    localStorage.setItem("customers", JSON.stringify(newCustomers));
  };

  const currentCustomers = filteredCustomers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
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
            value={dateFilter}
            onChange={(e) => handleDateFilter(e.target.value)}
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
            value={genderFilter}
            onChange={(e) => handleGenderFilter(e.target.value)}
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
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          size="small"
          placeholder="Search by name or email"
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
                    onClick={() => handleEditClick(customer)}
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
            onClick={() => setPage(page - 1)}
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
            onClick={() => setPage(page + 1)}
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
