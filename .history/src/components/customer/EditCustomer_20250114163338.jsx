import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Giả sử có API endpoint /api/customers/:id
        const response = await fetch(`/api/customers/${id}`);
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomerData();
  }, [id]);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header with Back button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate("/customers")} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Customer</Typography>
      </Box>

      {/* Customer ID Banner */}
      <Box
        sx={{
          bgcolor: "#E3F2FD",
          p: 2,
          borderRadius: 1,
          mb: 3,
        }}
      >
        <Typography variant="h6">C{id}</Typography>
      </Box>

      {/* Customer Info Card */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}>
          <Avatar
            src={customer?.avatar_url}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{customer?.name}</Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              {customer?.email}
            </Typography>
          </Box>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Address
            </Typography>
            <Typography>{customer?.address}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography>{customer?.phone_number}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Gender
            </Typography>
            <Typography>{customer?.gender}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Date of Birth
            </Typography>
            <Typography>{customer?.date_of_birth}</Typography>
          </Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Created at
            </Typography>
            <Typography>{customer?.created_at}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Order History Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order History
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
          }}
        >
          <Paper sx={{ p: 2, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 1 }}>
                📋
              </Box>
              <Typography>Total Order</Typography>
            </Box>
            <Typography variant="h5" sx={{ mt: 1 }}>
              20
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 1 }}>
                ��
              </Box>
              <Typography>Total Purchase</Typography>
            </Box>
            <Typography variant="h5" sx={{ mt: 1 }}>
              $100
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="outlined">Save report</Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>FOOD</TableCell>
                <TableCell>PAYMENT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer?.orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.food}</TableCell>
                  <TableCell>${order.payment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
