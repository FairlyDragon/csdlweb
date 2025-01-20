import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { differenceInYears } from "date-fns";
import EditShipper from "../components/shipper/EditShipper";
import AddShipper from "../components/shipper/AddShipper";

const initialShippers = [
  {
    shipper_id: "00001",
    name: "Nguyen Van A",
    phone_number: "0123456789",
    total_amount: 1500000,
    account: "shipper1@gmail.com",
    password: "hashedpass1",
    updated_address: "334 Nguyen Trai",
    created_at: new Date("2024-01-04").toISOString(),
    date_of_birth: new Date("1990-01-15").toISOString(),
    gender: "Male",
    image_url: "https://example.com/default-avatar.jpg",
  },
  // ... thêm các shipper khác
];

const Shipper = () => {
  const [shippers, setShippers] = useState(initialShippers);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // ... các hàm xử lý giống Customer.jsx
  // Chỉ thay customer thành shipper

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          placeholder="Search shipper..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          New Shipper
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F4F6F8" }}>
              <TableCell
                sx={{ color: "#637381", fontWeight: 600, width: "80px" }}
              >
                AVATAR
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                NAME
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                ADDRESS
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                CREATED AT
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                ACCOUNT
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                GENDER
              </TableCell>
              <TableCell sx={{ color: "#637381", fontWeight: 600 }}>
                AGE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{/* ... TableBody giống Customer.jsx */}</TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredShippers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
        />
      </TableContainer>

      <EditShipper
        open={openEditDialog}
        shipper={selectedShipper}
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedShipper(null);
        }}
        onSave={handleEditShipper}
        onDelete={handleDeleteShipper}
      />

      <AddShipper
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAdd={handleAddShipper}
      />
    </Box>
  );
};

export default Shipper;
