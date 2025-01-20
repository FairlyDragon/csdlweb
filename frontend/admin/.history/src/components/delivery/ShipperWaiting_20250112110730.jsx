import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Box,
  Button,
  Pagination,
} from "@mui/material";
import { useState } from "react";

export default function ShipperWaiting({
  waitingShippers,
  selectedPair,
  onChooseShipper,
  setOpenDialog,
}) {
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
    <Paper
      sx={{
        p: 3,
        bgcolor: "#334155",
        borderRadius: "8px 8px 0 0",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "white",
          mb: 3,
          fontWeight: 500,
        }}
      >
        Currently waiting shipper
      </Typography>
      <List sx={{ p: 0 }}>
        {currentShippers.map((shipper) => (
          <ListItem
            key={shipper.shipper_id}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              mb: 1.5,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
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
      {totalPages > 1 && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            bgcolor: "white",
            borderRadius: "0 0 8px 8px",
            p: 1,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Paper>
  );
}

ShipperWaiting.propTypes = {
  waitingShippers: PropTypes.array.isRequired,
  selectedPair: PropTypes.object.isRequired,
  onChooseShipper: PropTypes.func.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};
