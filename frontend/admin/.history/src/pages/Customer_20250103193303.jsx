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
import { format } from "date-fns";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import EditCustomer from "../components/customer/EditCustomer";
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
  // State cho form thêm/sửa customer
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem('customers');
    return savedCustomers ? JSON.parse(savedCustomers) : initialCustomers;
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Lưu vào localStorage khi customers thay đổi
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  // Hàm thêm customer mới
  const handleAddCustomer = (newCustomer) => {
    const customerId = String(customers.length + 1).padStart(5, '0');
    const customerWithId = {
      ...newCustomer,
      customer_id: customerId,
      created_at: new Date().toISOString(),
    };
    setCustomers([...customers, customerWithId]);
  };

  // Hàm cập nhật customer
  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer.customer_id === updatedCustomer.customer_id ? updatedCustomer : customer
    ));
  };

  // Hàm xóa customer
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.customer_id !== customerId));
    }
  };

  // Tính tổng số trang
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return customers.slice(startIndex, endIndex);
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
        <Button
          startIcon={<FilterAltOutlinedIcon />}
          sx={{
            minWidth: "auto",
            p: 1,
            color: "inherit",
            border: "1px solid #E5E8EB",
            borderRadius: "8px",
          }}
        />

        <Select
          defaultValue="date"
          size="small"
          sx={{
            minWidth: 120,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E8EB",
            },
          }}
        >
          <MenuItem value="date">Date</MenuItem>
        </Select>

        <Select
          defaultValue="gender"
          size="small"
          sx={{
            minWidth: 120,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E8EB",
            },
          }}
        >
          <MenuItem value="gender">Gender</MenuItem>
        </Select>

        <Select
          defaultValue="age"
          size="small"
          sx={{
            minWidth: 120,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E8EB",
            },
          }}
        >
          <MenuItem value="age">Age</MenuItem>
        </Select>

        <TextField
          placeholder="Search for a user by name or email"
          size="small"
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderColor: "#E5E8EB",
            },
          }}
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
          sx={{
            bgcolor: "#FF4842",
            "&:hover": {
              bgcolor: "#FF4842",
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
                AGE
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
                  "&:hover": {
                    backgroundColor: "#F4F6F8",
                    cursor: "pointer",
                  },
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
                  {customer.date_of_birth}
                </TableCell>
                <TableCell sx={{ color: "#212B36" }}>
                  {customer.gender}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateCustomer(customer)}
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
                    onClick={() => handleDeleteCustomer(customer.customer_id)}
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          gap: 1,
          alignItems: "center"
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
