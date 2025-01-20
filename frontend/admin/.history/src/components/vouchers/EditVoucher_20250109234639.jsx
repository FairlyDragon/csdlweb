import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

const EditVoucher = ({ open, voucher, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    code: "",
    start_date: null,
    end_date: null,
    discount_type: "percentage",
    discount_value: "",
    minimum_order_amount: "",
    total_usage_limit: "",
  });

  const [errors, setErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (voucher) {
      setFormData({
        ...voucher,
        discount_type: voucher.discount_percentage ? "percentage" : "amount",
        discount_value: voucher.discount_percentage || voucher.discount_amount || "",
      });
    }
  }, [voucher]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Code is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    if (!formData.discount_value) newErrors.discount_value = "Discount value is required";
    if (!formData.minimum_order_amount) newErrors.minimum_order_amount = "Minimum order amount is required";
    if (!formData.total_usage_limit) newErrors.total_usage_limit = "Usage limit is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      const updatedVoucher = {
        ...formData,
        discount_percentage: formData.discount_type === "percentage" ? Number(formData.discount_value) : null,
        discount_amount: formData.discount_type === "amount" ? Number(formData.discount_value) : null,
      };
      await onSave(updatedVoucher);
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Edit Voucher
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Voucher Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              error={!!errors.code}
              helperText={errors.code}
              fullWidth
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack direction="row" spacing={2}>
                <DateTimePicker
                  label="Start Date"
                  value={formData.start_date}
                  onChange={(date) => setFormData({ ...formData, start_date: date })}
                  renderInput={(params) => <TextField {...params} error={!!errors.start_date} helperText={errors.start_date} />}
                  fullWidth
                />
                <DateTimePicker
                  label="End Date"
                  value={formData.end_date}
                  onChange={(date) => setFormData({ ...formData, end_date: date })}
                  renderInput={(params) => <TextField {...params} error={!!errors.end_date} helperText={errors.end_date} />}
                  fullWidth
                />
              </Stack>
            </LocalizationProvider>

            <Box>
              <ToggleButtonGroup
                value={formData.discount_type}
                exclusive
                onChange={(e, newValue) => setFormData({ ...formData, discount_type: newValue })}
              >
                <ToggleButton value="percentage">Percentage</ToggleButton>
                <ToggleButton value="amount">Amount</ToggleButton>
              </ToggleButtonGroup>
              <TextField
                label={`Discount ${formData.discount_type === 'percentage' ? '(%)' : '($)'}`}
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                error={!!errors.discount_value}
                helperText={errors.discount_value}
                type="number"
                sx={{ mt: 1 }}
                fullWidth
              />
            </Box>

            <TextField
              label="Minimum Order Amount ($)"
              value={formData.minimum_order_amount}
              onChange={(e) => setFormData({ ...formData, minimum_order_amount: e.target.value })}
              error={!!errors.minimum_order_amount}
              helperText={errors.minimum_order_amount}
              type="number"
              fullWidth
            />

            <TextField
              label="Total Usage Limit"
              value={formData.total_usage_limit}
              onChange={(e) => setFormData({ ...formData, total_usage_limit: e.target.value })}
              error={!!errors.total_usage_limit}
              helperText={errors.total_usage_limit}
              type="number"
              fullWidth
            />
          </Stack>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this voucher?
        </DialogContent>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              onDelete(voucher.voucher_id);
              setConfirmDelete(false);
            }}
          >
            Delete
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

EditVoucher.propTypes = {
  open: PropTypes.bool.isRequired,
  voucher: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditVoucher;
