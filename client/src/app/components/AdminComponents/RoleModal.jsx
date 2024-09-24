import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const RoleModal = ({
  open,
  handleClose,
  roleName,
  setRoleName,
  handleSave,
}) => {
  const [permissions, setPermissions] = useState({
    updateOrderStatus: true,
    seeCustomers: true,
    seeOrders: true,
    addUsers: true,
    createRoles: false,
  });

  // Handle checkbox changes
  const handlePermissionChange = (permission) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 6,
          borderRadius: 4,
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
                onChange={() => handlePermissionChange("updateOrderStatus")}
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="Update order status"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.seeCustomers}
                onChange={() => handlePermissionChange("seeCustomers")}
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="See customers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.seeOrders}
                onChange={() => handlePermissionChange("seeOrders")}
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="See orders"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.addUsers}
                onChange={() => handlePermissionChange("addUsers")}
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="Add users"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.createRoles}
                onChange={() => handlePermissionChange("createRoles")}
                sx={{ color: "#ff8100", "&.Mui-checked": { color: "#ff8100" } }}
              />
            }
            label="Create roles"
          />
        </Box>

        {/* Update Button */}
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={() => handleSave(permissions)}
            sx={{
              bgcolor: "#ff8100",
              "&:hover": { bgcolor: "#ff8100" },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RoleModal;
