import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerData, setCustomerData] = useState({
    orders: [],
    stats: { total_order_quantity: 0, total_purchase: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cả thông tin khách hàng và lịch sử đơn hàng
        const [details, orders] = await Promise.all([
          CustomerService.getCustomerDetails(id),
          CustomerService.getCustomerOrders(id),
        ]);

        setCustomerDetails(details);

        // Xử lý dữ liệu orders như cũ
        const ordersList = orders.filter((item) => item.order_id);
        const stats = orders.find((item) => item.total_order_quantity);
        setCustomerData({ orders: ordersList, stats });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await CustomerService.deleteCustomer(id);
      navigate("/customers");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/customers")}
          sx={{ color: "text.secondary" }}
        >
          Back to Customers
        </Button>
      </Box>

      {/* Customer ID Banner */}
      <Box
        sx={{
          bgcolor: "#E3F2FD",
          p: 2,
          borderRadius: "4px 4px 0 0",
          background: "linear-gradient(to right, #E3F2FD, #FFF8E1)",
        }}
      >
        <Typography variant="h6">C{id}</Typography>
      </Box>

      {/* Customer Info Card */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          position: "relative",
          borderRadius: "0 0 4px 4px",
        }}
      >
        {/* Edit Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          Edit
        </Button>

        {/* Customer Basic Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mr: 2,
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {customerDetails?.name || "N/A"}
            </Typography>
            <Typography color="textSecondary">
              {customerDetails?.email || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Customer Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            mb: 3,
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom>
              Address
            </Typography>
            <Typography
              sx={{
                bgcolor: "#F8F9FA",
                p: 2,
                borderRadius: 1,
              }}
            >
              {customerDetails?.address || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography
              sx={{
                bgcolor: "#F8F9FA",
                p: 2,
                borderRadius: 1,
              }}
            >
              0987654321
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Gender
            </Typography>
            <Typography
              sx={{
                bgcolor: "#F8F9FA",
                p: 2,
                borderRadius: 1,
              }}
            >
              Female
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Date of Birth
            </Typography>
            <Typography
              sx={{
                bgcolor: "#F8F9FA",
                p: 2,
                borderRadius: 1,
              }}
            >
              01/01/2004
            </Typography>
          </Box>

          <Box>
            <Typography color="textSecondary" gutterBottom>
              Created at
            </Typography>
            <Typography
              sx={{
                bgcolor: "#F8F9FA",
                p: 2,
                borderRadius: 1,
              }}
            >
              01/01/2025
            </Typography>
          </Box>
        </Box>

        {/* Delete Button */}
        <Button
          variant="contained"
          color="error"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Paper>

      {/* Order History Section */}
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#40C057',
            mb: 3
          }}
        >
          Order History
        </Typography>

        {/* Stats and Save Report Container */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 3
        }}>
          {/* Stats Cards Container */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Total Order Card */}
            <Paper sx={{ 
              p: 3,
              width: '200px',
              bgcolor: 'white',
              borderRadius: '16px',
              boxShadow: 'none'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box 
                  component="span" 
                  sx={{ 
        {/* Stats Cards */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
          }}
        >
          {/* Total Order Card */}
          <Paper
            sx={{
              p: 3,
              flex: 1,
              bgcolor: "white",
              borderRadius: "16px",
              boxShadow: "none",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                component="span"
                sx={{
                  mr: 1,
                  color: "#4dabf7",
                  fontSize: "16px",
                }}
              >
                ≡
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Order
              </Typography>
            </Box>
            <Typography variant="h4">
              {customerData.stats?.total_order_quantity || 0}
            </Typography>
          </Paper>

          {/* Total Purchase Card */}
          <Paper
            sx={{
              p: 3,
              flex: 1,
              bgcolor: "white",
              borderRadius: "16px",
              boxShadow: "none",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                component="span"
                sx={{
                  mr: 1,
                  color: "#fab005",
                  fontSize: "16px",
                }}
              >
                $
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Purchase
              </Typography>
            </Box>
            <Typography variant="h4">
              ${customerData.stats?.total_purchase || 0}
            </Typography>
          </Paper>
        </Box>

        {/* Save Report Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="outlined"
            endIcon={
              <Box component="span" sx={{ color: "#4dabf7" }}>
                ⬇️
              </Box>
            }
            sx={{
              color: "#4dabf7",
              borderColor: "#4dabf7",
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
            }}
            onClick={() => {
              // Thêm menu cho các định dạng xuất file
              const exportFormats = ["PDF", "Excel", "CSV"];
              // TODO: Implement export functionality
            }}
          >
            save report
          </Button>
        </Box>

        {/* Orders Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "white" }}>
                <TableCell
                  sx={{
                    color: "#495057",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    color: "#495057",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  NAME
                </TableCell>
                <TableCell
                  sx={{
                    color: "#495057",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  ADDRESS
                </TableCell>
                <TableCell
                  sx={{
                    color: "#495057",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  DATE
                </TableCell>
                <TableCell
                  sx={{
                    color: "#495057",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  Food
                </TableCell>
                <TableCell
                  sx={{
                    color: "#495057",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  Payment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerData.orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>Nguyễn Văn A</TableCell>
                  <TableCell>334 Nguyễn Trãi</TableCell>
                  <TableCell>
                    {new Date(order.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>Fried Rice</TableCell>
                  <TableCell>${order.payment_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
