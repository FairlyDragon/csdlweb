import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Fetch customer data using id
    // setCustomer(data);
  }, [id]);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Customer Info Card */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            src={customer?.avatar_url}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h5">{customer?.name}</Typography>
            <Typography color="textSecondary">{customer?.email}</Typography>
          </Box>
          <Button variant="contained" sx={{ ml: "auto" }} color="primary">
            Edit
          </Button>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
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
        </Box>
      </Paper>

      {/* Order History */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Order History</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Typography>
                Total Orders: <strong>20</strong>
              </Typography>
              <Typography>
                Total Purchase: <strong>$100</strong>
              </Typography>
            </Box>
          </Box>
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
