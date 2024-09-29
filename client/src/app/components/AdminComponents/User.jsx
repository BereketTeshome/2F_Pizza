import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddUserModal from "./AddUserModal"; // Import the new modal component

const User = () => {
  const [data, setData] = useState([
    {
      name: "John Doe",
      phoneNo: "555-1234",
      email: "john@example.com",
      location: "New York",
      role: "Admin",
      active: true,
    },
    {
      name: "Jane Smith",
      phoneNo: "555-5678",
      email: "jane@example.com",
      location: "California",
      role: "Earner",
      active: false,
    },
  ]);

  const [openAddUser, setOpenAddUser] = useState(false);

  // Handle open/close for adding a new user modal
  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  // Handle adding a new user
  const handleAddUser = (newUser) => {
    const newUserData = { ...newUser, active: true };
    setData([...data, newUserData]);
    setOpenAddUser(false);
  };

  // Handle toggle active status
  const handleToggleActive = (index) => {
    const updatedData = [...data];
    updatedData[index].active = !updatedData[index].active;
    setData(updatedData);
  };

  // Handle deleting a user
  const handleDeleteUser = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "rowNumber",
        header: "No.",
        size: 20,
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "phoneNo",
        header: "Phone No.",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 250,
        Cell: ({ row }) => {
          const index = row.index;
          const isActive = data[index].active;
          return (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                position: "relative",
                left: "-20px",
              }}
            >
              {/* Toggle active/inactive status */}
              <FormControlLabel
                sx={{
                  background: isActive ? "#e6f3e6" : "#f527272e",
                  px: 2,
                  borderRadius: 10,
                  width: "150px",
                  color: isActive ? "green" : "red",
                }}
                control={
                  <Switch
                    checked={isActive}
                    onChange={() => handleToggleActive(index)}
                    sx={{
                      width: "60px",
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: isActive ? "green" : "red",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          bgcolor: isActive ? "#87B689" : "#f5d0d0",
                        },
                      "& .MuiSwitch-track": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                }
                label={isActive ? "Active" : "Inactive"}
                labelPlacement="start"
              />

              {/* Delete user */}
              <IconButton onClick={() => handleDeleteUser(index)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [data]
  );

  return (
    <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: 1, boxShadow: 3, mt: 8 }}>
      <Typography sx={{ marginBottom: 1.2, fontWeight: "bold", color: "#666" }}>
        User Management
      </Typography>

      {/* Add User Button */}
      <Button
        onClick={handleOpenAddUser}
        variant="contained"
        sx={{ bgcolor: "#ff8100", mb: 2 }}
        startIcon={<AddIcon />}
      >
        Add User
      </Button>

      {/* User Management Table */}
      <Box width={"100%"}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnResizing
        />
      </Box>

      {/* Add User Modal */}
      <AddUserModal
        open={openAddUser}
        handleClose={handleCloseAddUser}
        handleAddUser={handleAddUser}
      />
    </Box>
  );
};

export default User;
