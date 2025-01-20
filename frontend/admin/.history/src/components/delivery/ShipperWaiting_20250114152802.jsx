import PropTypes from "prop-types";
import { Typography, List, ListItem, Box, Button } from "@mui/material";
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

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChoose = (shipper) => {
    if (selectedShipper?.shipper_id === shipper.shipper_id) {
      // Nếu click vào shipper đã chọn -> bỏ chọn
      setSelectedShipper(null);
      onChooseShipper(null);
    } else {
      // Nếu click vào shipper mới -> chọn mới
      setSelectedShipper(shipper);
      onChooseShipper(shipper);
      if (selectedPair.order) {
        setOpenDialog(true);
      }
    }
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
                  sx={{
                    fontWeight: 500,
                    mb: 0.5,
                    color: "#212B36",
                  }}
                >
                  Shipper: {shipper.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#637381",
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <span>ID: {shipper.shipper_id}</span>
                  <span>|</span>
                  <span>{shipper.address}</span>
                  <span>|</span>
                  <span>{shipper.phone_number}</span>
                </Typography>
              </Box>
              <Button
                onClick={() => handleChoose(shipper)}
                sx={{
                  bgcolor:
                    selectedShipper?.shipper_id === shipper.shipper_id
                      ? "#376D87"
                      : "#6EC8EF",
                  color:
                    selectedShipper?.shipper_id === shipper.shipper_id
                      ? "white"
                      : "gray",
                  fontSize: 12,
                  fontFamily: "Nunito Sans",
                  fontWeight: 700,
                  wordWrap: "break-word",
                  textTransform: "none",
                  borderRadius: 1,
                  px: 3,
                  "&:hover": {
                    bgcolor:
                      selectedShipper?.shipper_id === shipper.shipper_id
                        ? "#2B5468"
                        : "#3BC5A0",
                  },
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
