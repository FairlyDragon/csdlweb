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
import { format, differenceInYears } from "date-fns";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Ad from "../components/customer/AddCustomer";
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
    image_url: "https://example.com/default-avatar.jpg",
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
    image_url: "https://example.com/default-avatar.jpg",
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
    image_url: "https://example.com/default-avatar.jpg",
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
    image_url: "https://example.com/default-avatar.jpg",
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
    image_url: "https://example.com/default-avatar.jpg",
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
    image_url: "https://example.com/default-avatar.jpg",
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
    image_url: "https://example.com/default-avatar.jpg",
  },
];

const Shipper = () => {
  // 1. Kiểm tra dữ liệu initialCustomers
  console.log("Initial data:", initialCustomers);

  // 2. Khởi tạo và kiểm tra state
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem("customers");
    console.log("Data from localStorage:", savedCustomers);
    return savedCustomers ? JSON.parse(savedCustomers) : initialCustomers;
  });

  // 3. Kiểm tra filteredCustomers
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  console.log("Filtered customers:", filteredCustomers);

  // 4. Đảm bảo cập nhật filteredCustomers khi customers thay đổi
  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  // Lưu vào localStorage khi customers thay đổi
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [dateSort, setDateSort] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [ageSort, setAgeSort] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = (customers) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return customers.slice(startIndex, endIndex);
  };

  // Thêm hàm tính tuổi
  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    try {
      const today = new Date();
      const birthdayDate = new Date(birthDate);
      return differenceInYears(today, birthdayDate);
    } catch {
      return 0;
    }
  };

  // Áp dụng tất cả bộ lọc
  useEffect(() => {
    let result = [...customers];

    // Filter theo DATE
    if (dateSort === "newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (dateSort === "oldest") {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    // Filter theo GENDER
    if (genderFilter !== "all") {
      result = result.filter(
        (customer) =>
          customer.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Filter theo AGE
    if (ageSort !== "none") {
      result.sort((a, b) => {
        const ageA = calculateAge(a.date_of_birth);
        const ageB = calculateAge(b.date_of_birth);
        return ageSort === "asc" ? ageA - ageB : ageB - ageA;
      });
    }

    // Search theo các trường
    if (searchQuery) {
      result = result.filter((customer) => {
        const value = customer[searchType]?.toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredCustomers(result);
  }, [customers, dateSort, genderFilter, ageSort, searchQuery, searchType]);

  // Reset tất cả filter
  const handleResetFilter = () => {
    setDateSort("all");
    setGenderFilter("all");
    setAgeSort("none");
    setSearchQuery("");
    setSearchType("name");
    setFilteredCustomers(customers);
  };

  // Thêm console.log để kiểm tra
  useEffect(() => {
    console.log("Filtered customers:", filteredCustomers);
    console.log("Current date sort:", dateSort);
  }, [filteredCustomers, dateSort]);

  // Hàm lấy customer_id cuối cùng
  const getLastCustomerId = () => {
    if (customers.length === 0) return "00000";
    // Tìm customer_id lớn nhất
    const maxId = Math.max(...customers.map((c) => Number(c.customer_id)));
    return String(maxId).padStart(5, "0");
  };

  // Thêm customer mới
  const handleAddCustomer = (newCustomer) => {
    setCustomers((prev) => {
      // Kiểm tra xem ID đã tồn tại chưa
      const existingIds = new Set(prev.map((c) => c.customer_id));
      if (existingIds.has(newCustomer.customer_id)) {
        // Nếu ID đã tồn tại, tạo ID mới
        const maxId = Math.max(
          ...Array.from(existingIds).map((id) => Number(id))
        );
        newCustomer.customer_id = String(maxId + 1).padStart(5, "0");
      }
      return [
        {
          ...newCustomer,
          image_url: "https://example.com/default-avatar.jpg",
        },
        ...prev,
      ]; // Thêm vào đầu mảng
    });
  };

  // Sửa customer
  const handleEditCustomer = (editedCustomer) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.customer_id === editedCustomer.customer_id
          ? {
              ...editedCustomer,
              created_at: customer.created_at,
            }
          : customer
      )
    );
  };

  // Xóa customer
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) =>
        prev.filter((customer) => customer.customer_id !== customerId)
      );
      setOpenEditDialog(false);
    }
  };

  // Thêm hàm xử lý khi click vào row
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setOpenEditDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
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
            "&:hover": {
              bgcolor: "#2E9567",
            },
            textTransform: "none",
            px: 2,
            py: 1,
          }}
        >
          Add Customer
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <IconButton
          sx={{
            width: "40px",
            height: "40px",
            border: "1px solid #E5E8EB",
            borderRadius: "8px",
            color: "inherit",
            "&:hover": {
              backgroundColor: "rgba(99, 115, 129, 0.08)",
            },
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
          value={ageSort}
          onChange={(e) => setAgeSort(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="none">Age</MenuItem>
          <MenuItem value="desc">High to Low</MenuItem>
          <MenuItem value="asc">Low to High</MenuItem>
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
            "&:hover": {
              bgcolor: "#FF4842",
            },
            "&:active": {
              bgcolor: "#FF4842",
            },
          }}
        >
          Reset
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
                sx={{
                  color: "#637381",
                  fontWeight: 600,
                  maxWidth: "250px",
                }}
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
                GENDER
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                AGE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers && filteredCustomers.length > 0 ? (
              getCurrentPageData(filteredCustomers).map((customer) => (
                <TableRow
                  key={customer.customer_id}
                  onClick={() => handleRowClick(customer)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F4F6F8",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>
                    <Box
                      component="img"
                      src={customer.image_url}
                      alt={customer.name}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {customer.name}
                  </TableCell>
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
                    {customer.created_at
                      ? format(new Date(customer.created_at), "dd MMM yyyy")
                      : ""}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {customer.email}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {customer.gender}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {customer.date_of_birth
                      ? calculateAge(customer.date_of_birth)
                      : 0}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No customers found
                </TableCell>
              </TableRow>
            )}
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

      <AddCustomer
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAdd={handleAddCustomer}
        lastCustomerId={getLastCustomerId()}
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

export default Shipper;
