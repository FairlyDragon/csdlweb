import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";

const Fee = () => {
  // Dialog states
  const [openAddFeeDialog, setOpenAddFeeDialog] = useState(false);
  const [openShippingDialog, setOpenShippingDialog] = useState(false);
  const [openEditFeeDialog, setOpenEditFeeDialog] = useState(false);
  const [openAddDistrictDialog, setOpenAddDistrictDialog] = useState(false);

  // Form states
  const [newFee, setNewFee] = useState({ name: "", value: "", type: "$" });
  const [newDistrict, setNewDistrict] = useState({ district: "", fee: "" });

  // Data states with localStorage
  const [additionalFees, setAdditionalFees] = useState(() => {
    const saved = localStorage.getItem("additionalFees");
    return saved
      ? JSON.parse(saved)
      : [
          { name: "VAT", value: "10", type: "%" },
          { name: "Service", value: "1", type: "$" },
        ];
  });

  const [shippingFees, setShippingFees] = useState(() => {
    const saved = localStorage.getItem("shippingFees");
    return saved
      ? JSON.parse(saved)
      : [
          { district: "Đống Đa", fee: "1$" },
          { district: "Hà Đông", fee: "1$" },
          { district: "Cầu giấy", fee: "2$" },
          { district: "Hai Bà Trưng", fee: "2$" },
          { district: "Hoàng Mai", fee: "2$" },
          { district: "Ba Đình", fee: "3$" },
          { district: "Nam Từ Liêm", fee: "3$" },
          { district: "Bắc Từ Liêm", fee: "3$" },
        ];
  });

  // Editable copies
  const [editableShippingFees, setEditableShippingFees] = useState([
    ...shippingFees,
  ]);
  const [editableFees, setEditableFees] = useState([...additionalFees]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("shippingFees", JSON.stringify(shippingFees));
  }, [shippingFees]);

  useEffect(() => {
    localStorage.setItem("additionalFees", JSON.stringify(additionalFees));
  }, [additionalFees]);

  // Handlers
  const handleAddDistrict = () => {
    if (newDistrict.district && newDistrict.fee) {
      const updatedFees = [
        ...shippingFees,
        { ...newDistrict, fee: `${newDistrict.fee}$` },
      ];
      setShippingFees(updatedFees);
      setNewDistrict({ district: "", fee: "" });
      setOpenAddDistrictDialog(false);
    }
  };

  const handleSaveShippingChanges = () => {
    setShippingFees(editableShippingFees);
    setOpenShippingDialog(false);
  };

  const handleSaveFeeChanges = () => {
    setAdditionalFees(editableFees);
    setOpenEditFeeDialog(false);
  };

  const handleAddFee = () => {
    if (newFee.name && newFee.value) {
      setAdditionalFees([...additionalFees, newFee]);
      setNewFee({ name: "", value: "", type: "$" });
      setOpenAddFeeDialog(false);
    }
  };

  const handleDeleteFee = (index) => {
    setAdditionalFees(additionalFees.filter((_, i) => i !== index));
  };

  const handleDeleteShipping = (index) => {
    setShippingFees(shippingFees.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 1200, display: "flex", gap: 4 }}>
      {/* Shipping Section - Left Column */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212B36",
            mb: 2,
          }}
        >
          Shipping
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80px 1fr auto",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ color: "#637381" }}>DISTRICT</Typography>
            <Typography sx={{ color: "#637381" }}>DELIVERY CHANGES</Typography>
            <Box sx={{ width: 40 }} /> {/* Spacing for delete button */}
          </Box>

          {shippingFees.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#637381" }}>{item.district}</Typography>
              <TextField
                fullWidth
                size="small"
                value={item.fee}
                disabled
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F4F6F8",
                    maxWidth: "200px",
                  },
                }}
              />
              <IconButton 
                onClick={() => handleDeleteShipping(index)}
                sx={{ 
                  width: 40,
                  height: 40,
                  "&:hover": { 
                    bgcolor: "rgba(145, 158, 171, 0.08)" 
                  } 
                }}
              >
                <CloseIcon sx={{ color: "#637381" }} />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => setOpenShippingDialog(true)}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            Edit Changes
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenAddDistrictDialog(true)}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            + Add Changes
          </Button>
        </Box>
      </Box>

      {/* Addition Fee Section - Right Column */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212B36",
            mb: 2,
          }}
        >
          Addition Fee
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          {additionalFees.map((fee, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography sx={{ width: 80, color: "#637381" }}>
                {fee.name}
              </Typography>
              <TextField
                size="small"
                value={`${fee.value}${fee.type}`}
                sx={{
                  width: "200px",
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F4F6F8",
                  },
                }}
              />
              <IconButton onClick={() => handleDeleteFee(index)}>
                <CloseIcon sx={{ color: "#637381" }} />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => setOpenEditFeeDialog(true)}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            Edit Fee
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenAddFeeDialog(true)}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            + Add Fee
          </Button>
        </Box>

        {/* Dialog for adding new fee */}
        <Dialog
          open={openAddFeeDialog}
          onClose={() => setOpenAddFeeDialog(false)}
          PaperProps={{
            sx: {
              width: "400px",
              maxWidth: "90%",
            },
          }}
        >
          <DialogTitle
            sx={{
              pb: 2,
              color: "#212B36",
              fontWeight: 600,
            }}
          >
            Add New Fee
          </DialogTitle>

          <DialogContent sx={{ pb: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Fee Name"
                value={newFee.name}
                onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  size="small"
                  label="Value"
                  value={newFee.value}
                  onChange={(e) =>
                    setNewFee({ ...newFee, value: e.target.value })
                  }
                  sx={{ flex: 1 }}
                />
                <Select
                  size="small"
                  value={newFee.type}
                  onChange={(e) =>
                    setNewFee({ ...newFee, type: e.target.value })
                  }
                  sx={{ width: "100px" }}
                >
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="%">%</MenuItem>
                </Select>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={() => setOpenAddFeeDialog(false)}
              sx={{ color: "#637381" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddFee}
              sx={{
                bgcolor: "#00AB55",
                "&:hover": { bgcolor: "#007B55" },
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* Add District Dialog */}
      <Dialog
        open={openAddDistrictDialog}
        onClose={() => setOpenAddDistrictDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2, color: "#212B36", fontWeight: 600 }}>
          Add New District
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="District"
              fullWidth
              value={newDistrict.district}
              onChange={(e) =>
                setNewDistrict({ ...newDistrict, district: e.target.value })
              }
            />
            <TextField
              label="Delivery Changes ($)"
              fullWidth
              value={newDistrict.fee}
              onChange={(e) =>
                setNewDistrict({ ...newDistrict, fee: e.target.value })
              }
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenAddDistrictDialog(false)}
            sx={{ color: "#637381" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddDistrict}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Fee Dialog */}
      <Dialog
        open={openEditFeeDialog}
        onClose={() => setOpenEditFeeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2, color: "#212B36", fontWeight: 600 }}>
          Edit Additional Fees
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            {editableFees.map((fee, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Name"
                  value={fee.name}
                  onChange={(e) => {
                    const newFees = [...editableFees];
                    newFees[index].name = e.target.value;
                    setEditableFees(newFees);
                  }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Value"
                  value={fee.value}
                  onChange={(e) => {
                    const newFees = [...editableFees];
                    newFees[index].value = e.target.value;
                    setEditableFees(newFees);
                  }}
                  sx={{ width: "100px" }}
                />
                <Select
                  value={fee.type}
                  onChange={(e) => {
                    const newFees = [...editableFees];
                    newFees[index].type = e.target.value;
                    setEditableFees(newFees);
                  }}
                  sx={{ width: "70px" }}
                >
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="%">%</MenuItem>
                </Select>
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenEditFeeDialog(false)}
            sx={{ color: "#637381" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveFeeChanges}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Shipping Dialog */}
      <Dialog
        open={openShippingDialog}
        onClose={() => setOpenShippingDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2, color: "#212B36", fontWeight: 600 }}>
          Edit Shipping Fees
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            {editableShippingFees.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#637381" }}>
                  {item.district}
                </Typography>
                <TextField
                  size="small"
                  value={item.fee}
                  onChange={(e) => {
                    const newFees = [...editableShippingFees];
                    newFees[index].fee = e.target.value;
                    setEditableShippingFees(newFees);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#F4F6F8",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenShippingDialog(false)}
            sx={{ color: "#637381" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveShippingChanges}
            sx={{
              bgcolor: "#00AB55",
              "&:hover": { bgcolor: "#007B55" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Fee;
