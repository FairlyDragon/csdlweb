import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { format } from "date-fns";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddCustomer from "../components/customer/AddCustomer";
import CustomerService from "../services/CustomerService";

export default function Customer() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [dateSort, setDateSort] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const itemsPerPage = 10;
  const [ageSort, setAgeSort] = useState("all");

  // Fetch customers from API
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await CustomerService.getAllCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      setError("Error fetching customers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  useEffect(() => {
    let result = [...customers];

    // Date sort
    if (dateSort === "newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (dateSort === "oldest") {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    // Age sort
    if (ageSort === "oldest") {
      result.sort(
        (a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth)
      );
    } else if (ageSort === "youngest") {
      result.sort(
        (a, b) => new Date(b.date_of_birth) - new Date(a.date_of_birth)
      );
    }

    // Gender filter
    if (genderFilter !== "all") {
      result = result.filter(
        (customer) =>
          customer.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Search
    if (searchQuery) {
      result = result.filter((customer) => {
        const value = customer[searchType]?.toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredCustomers(result);
  }, [customers, dateSort, ageSort, genderFilter, searchQuery, searchType]);

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCustomers.slice(startIndex, endIndex);
  };

  // Handle add customer
  const handleAddCustomer = async (newCustomer) => {
    try {
      await CustomerService.createCustomer(newCustomer);
      fetchCustomers(); // Refresh list after adding
      setOpenAddDialog(false);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // Reset filters
  const handleResetFilter = () => {
    setDateSort("all");
    setAgeSort("all");
    setGenderFilter("all");
    setSearchQuery("");
    setSearchType("name");
    setFilteredCustomers(customers);
  };

  // Calculate age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "-"; // Return dấu gạch ngang nếu không có ngày sinh

    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    // Kiểm tra ngày hợp lệ
    if (isNaN(birthDate.getTime())) return "-";

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleRowClick = (customerId) => {
    navigate(`/admin/customers/${customerId}`);
  };

  // Thêm hàm xử lý chuyển trang
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 3 }}>{error}</Box>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Customer</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
          sx={{ ml: 2 }}
        >
          Add Customer
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <IconButton
          sx={{
            width: "40px",
            height: "40px",
            border: "1px solid #E5E8EB",
            borderRadius: "8px",
            color: "inherit",
            "&:hover": { backgroundColor: "rgba(99, 115, 129, 0.08)" },
          }}
        >
          <FilterAltOutlinedIcon />
        </IconButton>

        <Select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Dates</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>

        <Select
          value={ageSort}
          onChange={(e) => setAgeSort(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Ages</MenuItem>
          <MenuItem value="youngest">Youngest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>

        <Select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Gender</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>

        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="name">Search by Name</MenuItem>
          <MenuItem value="email">Search by Email</MenuItem>
          <MenuItem value="phone_number">Search by Phone</MenuItem>
          <MenuItem value="address">Search by Address</MenuItem>
        </Select>

        <TextField
          placeholder={`Search by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ color: "#919EAB" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleResetFilter}
          sx={{
            bgcolor: "#FF6B6B",
            color: "white",
            "&:hover": { bgcolor: "#FF4842" },
          }}
        >
          Reset
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  width: "80px",
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                AVATAR
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  width: "180px",
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                NAME
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  maxWidth: "250px",
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                ADDRESS
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                DATE
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                EMAIL
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                PHONE
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                GENDER
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  color: "#637381", 
                  fontWeight: 600, 
                  backgroundColor: "#F8F9FA",
                  borderBottom: "2px solid #E5E7EB",
                  '&:not(:last-child)': {
                    borderRight: "1px solid #E5E7EB"
                  },
                  py: 2
                }}
              >
                AGE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentPageData().map((customer) => (
              <TableRow
                key={customer.customer_id}
                onClick={() => handleRowClick(customer.customer_id)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#F4F6F8" },
                }}
              >
                <TableCell align="center">
                  <Box
                    component="img"
                    src={customer.avatar_url}
                    alt={customer.name}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {customer.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "250px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  {customer.address}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {format(new Date(customer.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {customer.email}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {customer.phone_number}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {customer.gender}
                </TableCell>
                <TableCell align="center">
                  {calculateAge(customer.date_of_birth) || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#40C057",
              "&.Mui-selected": {
                bgcolor: "#40C057",
                color: "white",
                "&:hover": {
                  bgcolor: "#2f9e44",
                },
              },
              "&:hover": {
                bgcolor: "rgba(64, 192, 87, 0.1)",
              },
            },
          }}
        />
      </Box>

      {/* Add Customer Dialog */}
      <AddCustomer
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAdd={handleAddCustomer}
      />
    </Box>
  );
}
