import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function EditOrder({ order, onClose, onAccept, onReject }) {
  if (!order) return null;

  const total = order.order_details?.reduce((sum, item) => sum + item.subtotal, 0) || 0;

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
            borderBottom: "1px solid #DFE3E8"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Order</Typography>
          <IconButton onClick={onClose} sx={{ color: "#637381" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="#637381" gutterBottom>
            ID:
          </Typography>
          <Typography>{order.order_details[0].order_details_id}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="#637381" gutterBottom>
            Name:
          </Typography>
          <Typography>{order.customer?.name}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="#637381" gutterBottom>
            Address:
          </Typography>
          <Typography>{order.customer?.address}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="#637381" gutterBottom>
            Phone:
          </Typography>
          <Typography>{order.customer?.phone_number}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="#637381" gutterBottom>
            Payment:
          </Typography>
          <Typography>{order.payment?.payment_method}</Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" color="#637381" gutterBottom>
            Note:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            defaultValue={order.note}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "& fieldset": {
                  borderColor: "#DFE3E8",
                },
              },
            }}
          />
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Order Menu
        </Typography>

        <List sx={{ mb: 2 }}>
          {order.order_details?.map((item, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                py: 2,
                px: 0,
                borderBottom: index !== order.order_details.length - 1 ? "1px solid #DFE3E8" : "none"
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  variant="rounded"
                  src={item.image_url} 
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.item_name}
                secondary={`x${item.quantity}`}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                }}
              />
              <Typography color="text.secondary">
                +${item.subtotal.toFixed(2)}
              </Typography>
            </ListItem>
          ))}

          <ListItem sx={{ pt: 3, px: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Total
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                ml: "auto", 
                fontWeight: 600,
                color: "#FF4842"
              }}
            >
              ${total.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: "1px solid #DFE3E8" }}>
        <Button
          onClick={() => onReject(order.order_id)}
          variant="outlined"
          sx={{
            minWidth: 120,
            borderColor: "#FF4842",
            color: "#FF4842",
            "&:hover": {
              borderColor: "#B72136",
              bgcolor: "rgba(255, 72, 66, 0.08)",
            },
          }}
        >
          Reject
        </Button>
        <Button
          onClick={() => onAccept(order.order_id)}
          variant="contained"
          sx={{
            minWidth: 120,
            bgcolor: "#00AB55",
            "&:hover": {
              bgcolor: "#007B55",
            },
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditOrder.propTypes = {
  order: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};
