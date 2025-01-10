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
import AddShipper from "../components/shipper/AddShipper";
import EditShipper from "../components/shipper/EditShipper";

// Sample data structure
const initialShippers = [
  {
    shipper_id: "00001",
    name: "Nguyen Van A",
    phone_number: "0123456789",
    total_amount: 1500000.0,
    email: "shipper1@example.com",
    password: "hashedpass1",
    updated_address: "334 Nguyen Trai",
    created_at: new Date("2024-01-04").toISOString(),
    date_of_birth: new Date("1990-01-15").toISOString(),
    gender: "Male",
    avatar_url: "https://example.com/default-avatar.jpg",
  },
];

const Shipper = () => {
  const [shippers, setShippers] = useState(() => {
    const savedShippers = localStorage.getItem("shippers");
    return savedShippers ? JSON.parse(savedShippers) : initialShippers;
  });

  const [filteredShippers, setFilteredShippers] = useState(shippers);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [dateSort, setDateSort] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [amountSort, setAmountSort] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState(null);

  useEffect(() => {
    setFilteredShippers(shippers);
  }, [shippers]);

  useEffect(() => {
    localStorage.setItem("shippers", JSON.stringify(shippers));
  }, [shippers]);

  useEffect(() => {
    let result = [...shippers];

    if (dateSort === "newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (dateSort === "oldest") {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    if (genderFilter !== "all") {
      result = result.filter(
        (shipper) => shipper.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    if (amountSort !== "none") {
      result.sort((a, b) => {
        return amountSort === "asc"
          ? a.total_amount - b.total_amount
          : b.total_amount - a.total_amount;
      });
    }

    if (searchQuery) {
      result = result.filter((shipper) => {
        const value = shipper[searchType]?.toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    setFilteredShippers(result);
  }, [shippers, dateSort, genderFilter, amountSort, searchQuery, searchType]);

  const handleResetFilter = () => {
    setDateSort("all");
    setGenderFilter("all");
    setAmountSort("none");
    setSearchQuery("");
    setSearchType("name");
    setFilteredShippers(shippers);
  };

  const getLastShipperId = () => {
    if (shippers.length === 0) return "00000";
    const maxId = Math.max(...shippers.map((s) => Number(s.shipper_id)));
    return String(maxId).padStart(5, "0");
  };

  const handleAddShipper = (newShipper) => {
    setShippers((prev) => {
      const updatedShippers = [newShipper, ...prev];

      setPage(1);

      setFilteredShippers(updatedShippers);

      localStorage.setItem("shippers", JSON.stringify(updatedShippers));

      return updatedShippers;
    });
  };

  const handleEditShipper = (editedShipper) => {
    setShippers((prev) =>
      prev.map((shipper) =>
        shipper.shipper_id === editedShipper.shipper_id
          ? { ...editedShipper, created_at: shipper.created_at }
          : shipper
      )
    );
  };

  const handleDeleteShipper = (shipperId) => {
    if (window.confirm("Are you sure you want to delete this shipper?")) {
      setShippers((prev) =>
        prev.filter((shipper) => shipper.shipper_id !== shipperId)
      );
      setOpenEditDialog(false);
    }
  };

  const handleRowClick = (shipper) => {
    setSelectedShipper(shipper);
    setOpenEditDialog(true);
  };

  const getCurrentPageData = (data) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
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
          Shipper
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
          Add Shipper
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
          value={amountSort}
          onChange={(e) => setAmountSort(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="none">Total Amount</MenuItem>
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
          <MenuItem value="updated_address">Search by Address</MenuItem>
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
                AMOUNT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredShippers && filteredShippers.length > 0 ? (
              getCurrentPageData(filteredShippers).map((shipper) => (
                <TableRow
                  key={shipper.shipper_id}
                  onClick={() => handleRowClick(shipper)}
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
                      src={shipper.avatar_url}
                      alt={shipper.name}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {shipper.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "250px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    {shipper.updated_address}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {shipper.created_at
                      ? format(new Date(shipper.created_at), "dd MMM yyyy")
                      : ""}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {shipper.email ? shipper.email : 'N/A'}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {shipper.phone_number}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    {shipper.gender}
                  </TableCell>
                  <TableCell sx={{ color: "#212B36" }}>
                    ${shipper.total_amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No shippers found
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
                Math.ceil(filteredShippers.length / itemsPerPage)
              )
            )
          }
          disabled={page === Math.ceil(filteredShippers.length / itemsPerPage)}
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
          Page {page} of {Math.ceil(filteredShippers.length / itemsPerPage)}
        </Typography>
      </Box>

      <AddShipper
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onAdd={handleAddShipper}
        lastShipperId={getLastShipperId()}
      />

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
    </Box>
  );
};

export default Shipper;
