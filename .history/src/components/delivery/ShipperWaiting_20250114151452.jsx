import PropTypes from "prop-types";
import { Typography, List, ListItem, Box } from "@mui/material";

export default function ShipperWaiting({
  waitingShippers,
  selectedPair,
  onChooseShipper,
}) {
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
          {waitingShippers.map((shipper) => (
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
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "#F4F6F8",
                },
                bgcolor:
                  selectedPair.shipper?.shipper_id === shipper.shipper_id
                    ? "#F4F6F8"
                    : "white",
              }}
              onClick={() => onChooseShipper(shipper)}
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
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

ShipperWaiting.propTypes = {
  waitingShippers: PropTypes.array.isRequired,
  selectedPair: PropTypes.object.isRequired,
  onChooseShipper: PropTypes.func.isRequired,
};
