import { useState, useEffect } from "react";
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
} from "@mui/material";
import { format } from "date-fns";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCustomer from "../components/customer/AddCustomer";
import EditCustomer from "../components/customer/EditCustomer";
import CustomerService from "../services/CustomerService";
import { useNavigate } from 'react-router-dom';

const Customer = () => {
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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const itemsPerPage = 5;
  const [ageSort, setAgeSort] = useState("all");
  const navigate = useNavigate();

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
    } catch (err) {
      setError("Error fetching customers");
      console.error(err);
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
  const getCurrentPageData = (data) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle add customer
  const handleAddCustomer = async (newCustomer) => {
    try {
      const response = await CustomerService.createCustomer(newCustomer);
      setCustomers((prev) => [response, ...prev]);
      setOpenAddDialog(false);
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  // Handle edit customer
  const handleEditCustomer = async (editedCustomer) => {
    try {
      await CustomerService.updateCustomer(
        editedCustomer.customer_id,
        editedCustomer
      );
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.customer_id === editedCustomer.customer_id
            ? editedCustomer
            : customer
        )
      );
      setOpenEditDialog(false);
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  // Handle delete customer
  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await CustomerService.deleteCustomer(customerId);
        setCustomers((prev) =>
          prev.filter((customer) => customer.customer_id !== customerId)
        );
        setOpenEditDialog(false);
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
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
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleRowClick = (customer_id) => {
    navigate(`/customers/${customer_id}`);
  };

  if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 3 }}>{error}</Box>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
        <Typography
          variant="h5"
          sx={{ color: "#212B36", fontSize: "24px", fontWeight: 700 }}
        >
          Customer
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
          sx={{
            bgcolor: "#36B37E",
            color: "white",
            "&:hover": { bgcolor: "#2E9567" },
            textTransform: "none",
            px: 2,
            py: 1,
          }}
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
              <TableCell
                sx={{ color: "#637381", fontWeight: 600, width: "80px" }}
              >
                AVATAR
              </TableCell>
              <TableCell
                sx={{ color: "#637381", fontWeight: 600, width: "180px" }}
              >
                NAME
              </TableCell>
              <TableCell
                sx={{ color: "#637381", fontWeight: 600, maxWidth: "250px" }}
              >
                ADDRESS
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                DATE
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                EMAIL
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                PHONE
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                GENDER
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                AGE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentPageData(filteredCustomers).map((customer) => (
              <TableRow
                key={customer.customer_id}
                onClick={() => {
                  setSelectedCustomer(customer);
                  setOpenEditDialog(true);
                }}
                sx={{
                  "&:hover": { backgroundColor: "#F4F6F8", cursor: "pointer" },
                }}
              >
                <TableCell>
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
                <TableCell sx={{ color: "#212B36" }}>{customer.name}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: "250px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  {customer.address}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {format(new Date(customer.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.email}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.phone_number}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.gender}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {calculateAge(customer.date_of_birth)}
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
          mt: 2,
          gap: 1,
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          sx={{
            minWidth: "32px",
            height: "32px",
            p: 0,
            color: "inherit",
            border: "1px solid #E5E8EB",
            borderRadius: "4px",
          }}
        >
          <KeyboardArrowLeftIcon />
        </Button>
        <Button
          onClick={() =>
            setPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredCustomers.length / itemsPerPage)
              )
            )
          }
          disabled={page === Math.ceil(filteredCustomers.length / itemsPerPage)}
          sx={{
            minWidth: "32px",
            height: "32px",
            p: 0,
            color: "inherit",
            border: "1px solid #E5E8EB",
            borderRadius: "4px",
          }}
        >
          <KeyboardArrowRightIcon />
        </Button>
        <Typography sx={{ color: "#637381", ml: 2 }}>
          Page {page} of {Math.ceil(filteredCustomers.length / itemsPerPage)}
        </Typography>
      </Box>

      {/* Dialogs */}
      <AddCustomer
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAdd={handleAddCustomer}
      />
      <EditCustomer
        open={openEditDialog}
        customer={selectedCustomer}
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedCustomer(null);
        }}
        onSave={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />
    </Box>
  );
};

export default Customer;
