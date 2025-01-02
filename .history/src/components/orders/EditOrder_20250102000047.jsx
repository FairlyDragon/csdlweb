import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditOrder = ({ open, order, onClose, onAccept, onReject }) => {
  const [note, setNote] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "800px",
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Order
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 8 }}>
          {/* Order Details */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                ID
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {order?.id}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                Name
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {order?.customerName}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                Address
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {order?.address}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                Payment
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {order?.payment}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                Note
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter note here..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F4F6F8",
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Order Menu */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Order Menu
            </Typography>

            {order?.items?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  p: 1,
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#F4F6F8" },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    x{item.quantity}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#FFC107" }}
                >
                  ${item.price}
                </Typography>
              </Box>
            ))}

            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px dashed #DFE3E8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Total</Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#FFC107" }}
              >
                ${order?.total}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button
            variant="contained"
            onClick={() => onReject(order?.id, note)}
            sx={{
              bgcolor: "#FF4842",
              color: "white",
              "&:hover": { bgcolor: "#B72136" },
              textTransform: "none",
            }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={() => onAccept(order?.id, note)}
            sx={{
              bgcolor: "#3366FF",
              color: "white",
              "&:hover": { bgcolor: "#1939B7" },
              textTransform: "none",
            }}
          >
            Accept
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrder;
