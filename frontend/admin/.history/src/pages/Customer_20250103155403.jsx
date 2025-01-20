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
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customer;
