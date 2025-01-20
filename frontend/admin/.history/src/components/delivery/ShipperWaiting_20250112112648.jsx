import PropTypes from "prop-types";
import {
  Typography,
  List,
  ListItem,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function ShipperWaiting({
  waitingShippers,
  selectedPair,
  onChooseShipper,
  setOpenDialog,
}) {
    const [selectedShipper, setSelectedShipper] = useState(null);  
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Tính toán số trang
  const totalPages = Math.ceil(waitingShippers.length / rowsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentShippers = waitingShippers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#376D87",
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
          Currently waiting shipper
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
          {currentShippers.map((shipper) => (
            <ListItem
              key={shipper.shipper_id}
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
                  sx={{ fontWeight: 500, mb: 0.5 }}
                >
                  {shipper.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#637381",
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <span>{shipper.shipper_id}</span>
                  <span>|</span>
                  <span>{shipper.address}</span>
                </Typography>
              </Box>
              <Button
                onClick={() => {
                  onChooseShipper(shipper);
                  if (selectedPair.order) {
                    setOpenDialog(true);
                  }
                }}
                sx={{
                  bgcolor:
                    selectedPair.shipper?.shipper_id === shipper.shipper_id
                      ? "#2E9567"
                      : "#4AEDC4",
                  color:
                    selectedPair.shipper?.shipper_id === shipper.shipper_id
                      ? "white"
                      : "black",
                  "&:hover": {
                    bgcolor:
                      selectedPair.shipper?.shipper_id === shipper.shipper_id
                        ? "#236F4D"
                        : "#3BC5A0",
                  },
                  textTransform: "none",
                  borderRadius: 1,
                  px: 3,
                }}
              >
                Choose
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Pagination - Always show this part */}
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

ShipperWaiting.propTypes = {
  waitingShippers: PropTypes.array.isRequired,
  selectedPair: PropTypes.object.isRequired,
  onChooseShipper: PropTypes.func.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};
