                  </TableCell>
                  <TableCell>
                    {order.order_items?.map((item, index) => (
                      <div key={index}>
                        {item.menuitem_id} x{item.quantity} (${item.subtotal})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>${order.payment_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            bgcolor: "#FFFFFF",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <Avatar
            src={customerDetails?.avatar_url}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit Customer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update customer information
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "grid", gap: 3, pt: 1 }}>
            {/* Name và Email */}
            <TextField
              label="Name"
              value={editFormData.name || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Email"
              value={editFormData.email || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
              fullWidth
            />

            {/* Phone và Age trong một grid 2 cột */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
            >
              <TextField
                label="Phone"
                value={editFormData.phone_number || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    phone_number: e.target.value,
                  })
                }
              />
              <TextField
                label="Age"
                value={calculateAge(editFormData.date_of_birth)}
                disabled
                sx={{ bgcolor: "#f5f5f5" }}
              />
            </Box>

            {/* Address */}
            <TextField
              label="Address"
              value={editFormData.address || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, address: e.target.value })
              }
              multiline
              rows={3}
            />

            {/* Gender và Date of Birth trong một grid 2 cột */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
            >
              <TextField
                select
                label="Gender"
                value={editFormData.gender || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, gender: e.target.value })
                }
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>

              <TextField
                type="date"
                label="Date of Birth"
                value={editFormData.date_of_birth?.split("T")[0] || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    date_of_birth: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            borderTop: "1px solid #E5E7EB",
            gap: 1,
          }}
        >
          <Button
            onClick={() => setOpenEditDialog(false)}
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              minWidth: 100,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            sx={{
              bgcolor: "#10B981",
              borderRadius: "8px",
              textTransform: "none",
              minWidth: 100,
              "&:hover": {
                bgcolor: "#059669",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this customer? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              color: "text.secondary",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
