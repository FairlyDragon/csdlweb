import { useState } from "react";
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Box,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";

const CreateVoucher = ({ onAddVoucher }) => {
  const [formData, setFormData] = useState({
    code: "",
    start: "",
    end: "",
    discount: "",
    minimum_order_amount: "",
    total_usage: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVoucher({
      code: formData.code,
      start_date: formData.start,
      end_date: formData.end,
      discount_percentage: Number(formData.discount),
      minimum_order_amount: Number(formData.minimum_order_amount),
      total_usage_limit: Number(formData.total_usage),
      description: Number(formData.minimum_order_amount) > 0 
        ? `FOR ORDERS ABOVE $${formData.minimum_order_amount}`
        : "FOR WHOLE ORDER"
    });
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Create Voucher
        <IconButton onClick={() => onAddVoucher(null)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start"
                type="datetime-local"
                value={formData.start}
                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End"
                type="datetime-local"
                value={formData.end}
                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                required
                InputProps={{
                  endAdornment: "%"
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Minimum order amount"
                type="number"
                value={formData.minimum_order_amount}
                onChange={(e) => setFormData({ ...formData, minimum_order_amount: e.target.value })}
                required
                InputProps={{
                  startAdornment: "$"
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Total usage"
                type="number"
                value={formData.total_usage}
                onChange={(e) => setFormData({ ...formData, total_usage: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' },
                  textTransform: 'none'
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CreateVoucher.propTypes = {
  onAddVoucher: PropTypes.func.isRequired,
};

export default CreateVoucher;
