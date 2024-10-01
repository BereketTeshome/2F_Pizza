import React, { useState, useEffect, useMemo } from "react";
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
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);

  // Fetch user data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6543/accounts/users"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle open/close for adding a new user modal
  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  // Handle adding a new user
  const handleAddUser = async (newUser) => {
    try {
      await axios.post("http://localhost:6543/accounts/register", newUser);
      setData((prevData) => [...prevData, newUser]);
      setOpenAddUser(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle toggle active status
  const handleToggleActive = (index) => {
    const updatedData = [...data];
    updatedData[index].status = !updatedData[index].status;
    setData(updatedData);
  };

  // Handle deleting a user
  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      // Use userId directly in the delete URL
      await axios.delete(`http://localhost:6543/accounts/users/${userId}`);

      // Remove the deleted user from the UI
      const updatedData = data.filter((user) => user.id !== userId);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
      // {
      //   accessorKey: "adminname",
      //   header: "Name",
      //   size: 150,
      // },
      {
        accessorKey: "phone",
        header: "Phone No.",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 250,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 250,
        Cell: ({ row }) => {
          const userId = row.original.id; // Use the user's id here
          const isActive = data.find((user) => user.id === userId)?.status;
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
                    onChange={() => handleToggleActive(row.index)}
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
              <IconButton onClick={() => handleDeleteUser(userId)}>
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
