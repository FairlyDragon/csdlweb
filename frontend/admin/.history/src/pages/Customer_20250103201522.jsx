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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem("customers");
    return savedCustomers ? JSON.parse(savedCustomers) : initialCustomers;
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [dateSort, setDateSort] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [ageSort, setAgeSort] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Lưu vào localStorage khi customers thay đổi
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  // Áp dụng bộ lọc
  useEffect(() => {
    let result = [...customers];

    // Lọc theo ngày so với ngày hiện tại
    if (dateSort === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        const today = new Date();
        const diffA = Math.abs(today - dateA);
        const diffB = Math.abs(today - dateB);
        return diffA - diffB;
      });
    } else if (dateSort === "oldest") {
      result.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        const today = new Date();
        const diffA = Math.abs(today - dateA);
        const diffB = Math.abs(today - dateB);
        return diffB - diffA;
      });
    }

    // Lọc theo giới tính
    if (genderFilter !== "all") {
      result = result.filter(
        (customer) =>
          customer.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Tìm kiếm
    if (searchQuery) {
      result = result.filter((customer) => {
        const value = customer[searchType]?.toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredCustomers(result);
  }, [customers, dateSort, genderFilter, ageSort, searchQuery, searchType]);

  // Reset filter
  const handleResetFilter = () => {
    setDateSort("all");
    setGenderFilter("all");
    setAgeSort("none");
    setSearchQuery("");
    setSearchType("name");
    setFilteredCustomers(customers);
    setPage(1);
  };

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCustomers.slice(startIndex, endIndex);
  };

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Thêm các hàm xử lý CRUD
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prev => prev.filter(customer => customer.customer_id !== customerId));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "#212B36", fontSize: "24px", fontWeight: 700 }}
      >
        Customer
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <Select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Dates</MenuItem>
          <MenuItem value="newest">Nearest to Today</MenuItem>
          <MenuItem value="oldest">Farthest from Today</MenuItem>
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
            bgcolor: "#FF4842",
            "&:hover": { bgcolor: "#FF4842" },
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
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                NAME
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                ADDRESS
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                DATE
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                EMAIL
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                GENDER
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentPageData().map((customer) => (
              <TableRow
                key={customer.customer_id}
                sx={{
                  "&:hover": { backgroundColor: "#F4F6F8", cursor: "pointer" },
                }}
              >
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.customer_id}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>{customer.name}</TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.address}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {format(new Date(customer.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.email}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.gender}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#00A76F",
                      "&:hover": { bgcolor: "rgba(0, 167, 111, 0.08)" },
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteCustomer(customer.customer_id)}
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
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
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
          Show {page}-{totalPages}
        </Typography>
      </Box>
    </Box>
  );
};

export default Customer;
