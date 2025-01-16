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
import AddShipper from "../components/shipper/AddShipper";
import ShipperService from "../services/ShipperService";

export default function Shipper() {
  const navigate = useNavigate();
  const [shippers, setShippers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredShippers, setFilteredShippers] = useState([]);
  const [page, setPage] = useState(1);
  const [dateSort, setDateSort] = useState("newest");
  const [genderFilter, setGenderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const itemsPerPage = 10;
  const [amountSort, setAmountSort] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchShippers();
  }, []);

  const fetchShippers = async () => {
    try {
      setLoading(true);
      const data = await ShipperService.getAllShippers();
      const sortedData = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setShippers(sortedData);
      setFilteredShippers(sortedData);
      setPage(1);
    } catch (error) {
      setError("Error fetching shippers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...shippers];

    // Date sort
    if (dateSort === "newest" || dateSort === "all") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (dateSort === "oldest") {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    // Amount sort
    if (amountSort === "highest") {
      result.sort((a, b) => b.total_amount - a.total_amount);
    } else if (amountSort === "lowest") {
      result.sort((a, b) => a.total_amount - b.total_amount);
    }

    // Gender filter
    if (genderFilter !== "all") {
      result = result.filter(
        (shipper) => shipper.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Search
    if (searchQuery) {
      result = result.filter((shipper) => {
        const value = shipper[searchType]?.toLowerCase();
        return value?.includes(searchQuery.toLowerCase());
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (shipper) =>
          shipper.account_status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredShippers(result);
  }, [
    shippers,
    dateSort,
    amountSort,
    genderFilter,
    searchQuery,
    searchType,
    statusFilter,
  ]);

  const getCurrentPageData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredShippers.slice(startIndex, endIndex);
  };

  const handleResetFilter = () => {
    setDateSort("newest");
    setAmountSort("all");
    setGenderFilter("all");
    setStatusFilter("all");
    setSearchQuery("");
    setSearchType("name");
  };

  const handleRowClick = (shipperId) => {
    navigate(`/admin/shippers/${shipperId}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(filteredShippers.length / itemsPerPage);

  const handleAddShipper = async (newShipperData) => {
    try {
      const shipperData = {
        ...newShipperData,
        account_status: 'active',
        amount: '',
        created_at: new Date().toISOString()
      };

      const response = await ShipperService.createShipper(shipperData);
      
      setShippers(prevShippers => [response.data, ...prevShippers]);
      
      setOpenAddDialog(false);
      setSnackbar({
        open: true,
        message: 'Shipper added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding shipper:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error adding shipper',
        severity: 'error'
      });
    }
  };

  const sortedShippers = [...shippers].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 3 }}>{error}</Box>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Shipper</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
          sx={{ ml: 2 }}
        >
          Add Shipper
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
          value={amountSort}
          onChange={(e) => setAmountSort(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Amount</MenuItem>
          <MenuItem value="highest">Highest</MenuItem>
          <MenuItem value="lowest">Lowest</MenuItem>
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
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{
            minWidth: 120,
            height: "40px",
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
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
            <TableRow sx={{ backgroundColor: "#F4F6F8" }}>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600, width: "80px" }}
              >
                AVATAR
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600, width: "180px" }}
              >
                NAME
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600, maxWidth: "250px" }}
              >
                ADDRESS
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600 }}
              >
                DATE
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600 }}
              >
                EMAIL
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600 }}
              >
                PHONE
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600 }}
              >
                GENDER
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600 }}
              >
                STATUS
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#637381", fontWeight: 600 }}
              >
                AMOUNT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentPageData().map((shipper) => (
              <TableRow
                key={shipper.shipper_id}
                onClick={() => handleRowClick(shipper.shipper_id)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#F4F6F8" },
                }}
              >
                <TableCell align="center">
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
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {shipper.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "250px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  {shipper.address}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {format(new Date(shipper.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {shipper.email}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {shipper.phone_number}
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  {shipper.gender}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "inline-block",
                      bgcolor:
                        shipper.account_status === "active"
                          ? "#E8FFF3"
                          : "#FFE7D9",
                      color:
                        shipper.account_status === "active"
                          ? "#00B69B"
                          : "#B72136",
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {shipper.account_status}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ color: "#212B36" }}>
                  ${shipper.total_amount}
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

      {/* Add Shipper Dialog */}
      <AddShipper
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </Box>
  );
}
