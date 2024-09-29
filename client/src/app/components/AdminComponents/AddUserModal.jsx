import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const roles = ["Admin", "Investor", "Earner"];

const AddUserModal = ({ open, handleClose, handleAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    phoneNo: "",
    email: "",
    location: "",
    role: "",
  });

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddClick = () => {
    handleAddUser(newUser);
    setNewUser({
      name: "",
      phoneNo: "",
      email: "",
      location: "",
      role: "",
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New User
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone No."
          name="phoneNo"
          value={newUser.phoneNo}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={newUser.location}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />

        {/* Role selector and Add button at the bottom, aligned side by side */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <TextField
            select
            label="Role"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            sx={{ width: "50%" }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>

          <Button
            onClick={handleAddClick}
            variant="contained"
            sx={{ bgcolor: "#ff8100", width: "40%" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
