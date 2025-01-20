import { useState } from "react";
import { useState } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const CreateVoucher = ({ onAddVoucher }) => {
  const [formData, setFormData] = useState({
    code: "",
    start: "",
    end: "",
    discount: "",
    minimum_order_amount: "",
    total_usage: "",
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
      description:
        Number(formData.minimum_order_amount) > 0
          ? `FOR ORDERS ABOVE $${formData.minimum_order_amount}`
          : "FOR WHOLE ORDER",
    });
  };

  return (
    <Dialog 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const CreateVoucher = ({ onAddVoucher }) => {
  const [formData, setFormData] = useState({
    code: "",
    start: "",
    end: "",
    discount: "",
    minimum_order_amount: "",
    total_usage: "",
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
      description:
        Number(formData.minimum_order_amount) > 0
          ? `FOR ORDERS ABOVE $${formData.minimum_order_amount}`
          : "FOR WHOLE ORDER",
    });
  };

  return (
    <Dialog 
      open={true} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{

const CreateVoucher = ({ onAddVoucher }) => {
  const [formData, setFormData] = useState({
    code: "",
    start: "",
    end: "",
    discount: "",
    minimum_order_amount: "",
    total_usage: "",
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
      description:
        Number(formData.minimum_order_amount) > 0
          ? `FOR ORDERS ABOVE $${formData.minimum_order_amount}`
          : "FOR WHOLE ORDER",
    });
  };

  return (
    <Dialog 
      open={true} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
        }
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
      open={true} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
        }
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          color: '#333',
          fontSize: '18px',
        sx: {
          borderRadius: '8px',
        }
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          color: '#333',
          fontSize: '18px',
          fontWeight: 500
        }}
      >
        Create Voucher
        <IconButton 
          onClick={() => onAddVoucher(null)}
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          color: '#333',
          fontSize: '18px',
          fontWeight: 500
        }}
      >
        Create Voucher
        <IconButton 
          onClick={() => onAddVoucher(null)}
          sx={{ 
            color: '#666',
            '&:hover': { color: '#333' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            fullWidth
            placeholder="Code *"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
          fontWeight: 500
        }}
      >
        Create Voucher
        <IconButton 
          onClick={() => onAddVoucher(null)}
          sx={{ 
            color: '#666',
            '&:hover': { color: '#333' }
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Start *"
            type="text"
            onFocus={(e) => e.target.type = 'datetime-local'}
            onBlur={(e) => e.target.type = 'text'}
          sx={{ 
            color: '#666',
            '&:hover': { color: '#333' }
          }}
        >
          <CloseIcon />
        </IconButton>
            value={formData.start}
            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box 
          component="form" 
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="End *"
            type="text"
            onFocus={(e) => e.target.type = 'datetime-local'}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            fullWidth
            onBlur={(e) => e.target.type = 'text'}
            placeholder="Code *"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
            variant="outlined"
            sx={{
            gap: 2
          }}
        >
          <TextField
            fullWidth
            placeholder="Code *"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
            value={formData.end}
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Discount *"
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            required
            InputProps={{
              endAdornment: (
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Start *"
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Start *"
                <InputAdornment position="end">
                  <Box sx={{ color: '#666', pr: 1 }}>%</Box>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
            type="text"
            onFocus={(e) => e.target.type = 'datetime-local'}
            onBlur={(e) => e.target.type = 'text'}
            value={formData.start}
            type="text"
            onFocus={(e) => e.target.type = 'datetime-local'}
            onBlur={(e) => e.target.type = 'text'}
            value={formData.start}
            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
            required
            sx={{
            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
            required
            sx={{
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="Minimum order amount *"
            type="number"
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
            value={formData.minimum_order_amount}
            onChange={(e) => setFormData({ ...formData, minimum_order_amount: e.target.value })}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ color: '#666', pl: 1 }}>$</Box>
                </InputAdornment>
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="End *"
            type="text"
            onFocus={(e) => e.target.type = 'datetime-local'}
              }
            }}
          />

          <TextField
            fullWidth
            placeholder="End *"
            type="text"
            onFocus={(e) => e.target.type = 'datetime-local'}
            onBlur={(e) => e.target.type = 'text'}
            value={formData.end}
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }
            onBlur={(e) => e.target.type = 'text'}
            value={formData.end}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
            }}
          />

          <TextField
            fullWidth
            placeholder="Total usage *"
            type="number"
            value={formData.total_usage}
            onChange={(e) => setFormData({ ...formData, total_usage: e.target.value })}
                backgroundColor: '#f5f5f5'
              }
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <TextField
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
            }}
          />

          <TextField
            fullWidth
            placeholder="Discount *"
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            placeholder="Discount *"
            type="number"
            value={formData.discount}
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: '8px',
              backgroundColor: '#4285f4',
              '&:hover': {
                backgroundColor: '#3367d6'
              },
              textTransform: 'none',
              fontSize: '16px'
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ color: '#666', pr: 1 }}>%</Box>
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
            }}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CreateVoucher.propTypes = {
  onAddVoucher: PropTypes.func.isRequired,
};

export default CreateVoucher;
