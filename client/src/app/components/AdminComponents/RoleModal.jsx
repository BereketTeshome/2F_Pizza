import React from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const RoleModal = ({
  open,
  handleClose,
  roleName,
  setRoleName,
  handleSave,
  permissions, // New prop to hold the permissions state
  setPermissions, // New prop to update the permissions state
}) => {
  // Handle save
  const handleSaveRole = () => {
    handleSave(permissions);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          width: 400,
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mb: 2, color: "#777" }}
        >
          Role
        </Typography>

        {/* Name Input */}
        <TextField
          fullWidth
          label="Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Permissions Title */}
        <Typography variant="subtitle1" sx={{ mb: 1, color: "#555" }}>
          Permissions
        </Typography>

        {/* Permissions Checkboxes */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.updateOrderStatus}
                onChange={() =>
                  setPermissions((prev) => ({
                    ...prev,
                    updateOrderStatus: !prev.updateOrderStatus,
                  }))
                }
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="Update order status"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.seeCustomers}
                onChange={() =>
                  setPermissions((prev) => ({
                    ...prev,
                    seeCustomers: !prev.seeCustomers,
                  }))
                }
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="See customers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.seeOrders}
                onChange={() =>
                  setPermissions((prev) => ({
                    ...prev,
                    seeOrders: !prev.seeOrders,
                  }))
                }
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="See orders"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.addUsers}
                onChange={() =>
                  setPermissions((prev) => ({
                    ...prev,
                    addUsers: !prev.addUsers,
                  }))
                }
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="Add users"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.createRoles}
                onChange={() =>
                  setPermissions((prev) => ({
                    ...prev,
                    createRoles: !prev.createRoles,
                  }))
                }
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="Create roles"
          />
        </Box>

        {/* Save Button */}
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleSaveRole}
            sx={{ bgcolor: "#ff8100", "&:hover": { bgcolor: "#ff8100" } }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RoleModal;
