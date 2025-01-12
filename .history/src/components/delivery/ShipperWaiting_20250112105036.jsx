import PropTypes from 'prop-types';
import { Paper, Typography, List, ListItem, Box, Button } from "@mui/material";

export default function ShipperWaiting({
  waitingShippers,
  selectedPair,
  onChooseShipper,
  setOpenDialog,
}) {
  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: "#334155",
        borderRadius: 4,
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
        {waitingShippers.map((shipper) => (
          <ListItem
            key={shipper.shipper_id}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              mb: 1.5,
              p: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                {shipper.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#637381" }}>
                {shipper.shipper_id} | {shipper.address}
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
                borderRadius: 2,
                px: 3,
              }}
            >
              Choose
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

ShipperWaiting.propTypes = {
  waitingShippers: PropTypes.array.isRequired,
  selectedPair: PropTypes.object.isRequired,
  onChooseShipper: PropTypes.func.isRequired,
  setOpenDialog: PropTypes.func.isRequired
};
