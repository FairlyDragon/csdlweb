import PropTypes from "prop-types";
import { Typography, List, ListItem, Box, Button } from "@mui/material";
import { useState } from "react";

export default function OrderWaiting({
  orderManagement,
  selectedPair,
  onChooseOrder,
  setOpenDialog,
}) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(orderManagement.length / rowsPerPage);
  const currentOrders = orderManagement.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChoose = (order) => {
    if (selectedOrder?.order_id === order.order_id) {
      setSelectedOrder(null);
      onChooseOrder(null);
    } else {
      setSelectedOrder(order);
      onChooseOrder(order);
      if (selectedPair.shipper) {
        setOpenDialog(true);
      }
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#854D0E",
          p: 3,
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 500,
          }}
        >
          Order Management
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
        }}
      >
        <List sx={{ p: 0 }}>
          {currentOrders.map((order) => (
            <ListItem
              key={order.order_id}
              sx={{
                bgcolor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 1,
                mb: 1.5,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
              <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    mb: 0.5,
                    color: "#212B36",
                  }}
                >
                  Customer: {order.customer_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#637381",
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <span>ID: {order.order_id}</span>
                  <span>|</span>
                  <span>{shipper.address}</span>
                  <span>|</span>
                  <span>{shipper.phone_number}</span>
                </Typography>
              </Box>
              <Button
                onClick={() => handleChoose(order)}
                sx={{
                  bgcolor:
                    selectedOrder?.order_id === order.order_id
                      ? "#D97706" // Màu nền khi được chọn
                      : "#FEF3C7", // Màu nền mặc định
                  color:
                    selectedOrder?.order_id === order.order_id
                      ? "white" // Màu chữ khi được chọn
                      : "gray", // Màu chữ mặc định
                  fontSize: 12,
                  fontFamily: "Nunito Sans",
                  fontWeight: 700,
                  wordWrap: "break-word",
                  textTransform: "none",
                  borderRadius: 1,
                  px: 3,
                  "&:hover": {
                    bgcolor:
                      selectedOrder?.order_id === order.order_id
                        ? "#B45309"
                        : "#FDE68A",
                  },
                }}
              >
                Choose
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          borderTop: "1px solid #E5E7EB",
          borderRadius: "0 0 8px 8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          onClick={() => handleChangePage(null, Math.max(1, page - 1))}
          disabled={page === 1}
          sx={{
            minWidth: "40px",
            height: "40px",
            p: 0,
            borderRadius: "50%",
            color: "#637381",
          }}
        >
          {"<"}
        </Button>
        <Box
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            bgcolor: "#36B37E",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 500,
          }}
        >
          {page}
        </Box>
        <Button
          onClick={() => handleChangePage(null, Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          sx={{
            minWidth: "40px",
            height: "40px",
            p: 0,
            borderRadius: "50%",
            color: "#637381",
          }}
        >
          {">"}
        </Button>
      </Box>
    </Box>
  );
}

OrderWaiting.propTypes = {
  orderManagement: PropTypes.array.isRequired,
  selectedPair: PropTypes.object.isRequired,
  onChooseOrder: PropTypes.func.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};
