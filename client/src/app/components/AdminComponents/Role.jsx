import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RoleModal from "./RoleModal";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const Role = () => {
  const [data, setData] = useState([]);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);
  const [permissions, setPermissions] = useState({
    updateOrderStatus: false,
    seeCustomers: false,
    seeOrders: false,
    addUsers: false,
    createRoles: false,
  });

  // Fetch roles when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Get token from local storage
        const cookie = new Cookies();
        const token =
          cookie.get("user_token") || sessionStorage.getItem("user_token");
        const decodedToken = token ? jwtDecode(token) : "";
        const restaurantname = decodedToken.restaurantname;

        if (restaurantname) {
          // Fetch all roles from the server
          const response = await axios.get("http://localhost:6543/role");

          // Filter roles by owner_name matching the restaurantname
          const filteredData = response.data.filter(
            (role) => role.owner_name === restaurantname
          );

          setData(filteredData);
        } else {
          console.error("No token found!");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Handle open/close modal
  const handleOpenRoleModal = (index) => {
    if (index !== null) {
      const selectedRole = data[index];
      setSelectedRoleIndex(index);
      setNewRoleName(selectedRole.role_name || "");

      // Set permissions from the selected role's data
      const initialPermissions = {
        updateOrderStatus: selectedRole.permissions.includes(
          "Update order status"
        ),
        seeCustomers: selectedRole.permissions.includes("See customers"),
        seeOrders: selectedRole.permissions.includes("See orders"),
        addUsers: selectedRole.permissions.includes("Add users"),
        createRoles: selectedRole.permissions.includes("Create roles"),
      };

      setPermissions(initialPermissions);
    } else {
      // Reset for adding new role
      setNewRoleName("");
      setPermissions({
        updateOrderStatus: false,
        seeCustomers: false,
        seeOrders: false,
        addUsers: false,
        createRoles: false,
      });
    }
    setOpenRoleModal(true);
  };

  const handleCloseRoleModal = () => setOpenRoleModal(false);

  // Handle saving role changes
  const handleSaveRole = async (permissions) => {
    const newRole = {
      role_name: newRoleName,
      status: true, // Defaulting to true
      permissions: Object.keys(permissions).filter((key) => permissions[key]),
    };

    try {
      await axios.post("http://localhost:6543/role", newRole);
      // Fetch updated roles list
      const response = await axios.get("http://localhost:6543/role");
      setData(response.data);
    } catch (error) {
      console.error("Error saving role:", error);
    }

    handleCloseRoleModal();
  };

  // Handle deleting a role based on its ID
  const handleDeleteRole = async (roleId) => {
    try {
      await axios.delete(`http://localhost:6543/role/${roleId}`);
      // Remove the deleted role from the UI
      const updatedData = data.filter((role) => role.id !== roleId);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // Handle toggle active status
  const handleToggleActive = (roleId) => {
    const updatedData = data.map((role) => {
      if (role.id === roleId) {
        return { ...role, status: !role.status };
      }
      return role;
    });
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
        accessorKey: "role_name",
        header: "Role Name",
        size: 200,
        Cell: ({ cell }) => <Typography>{cell.getValue()}</Typography>,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        size: 250,
        Cell: ({ cell }) => (
          <Typography>
            {new Date(cell.getValue()).toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "2-digit",
            })}
          </Typography>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 350,
        Cell: ({ row }) => {
          const roleId = row.original.id; // Use the role's id here
          const isActive =
            data.find((role) => role.id === roleId)?.status ?? false;
          return (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                position: "relative",
                left: "-15px",
              }}
            >
              {/* Toggle active/inactive status */}
              <FormControlLabel
                sx={{
                  background: isActive ? "#e6f3e6" : "#f527272e",
                  px: 2,
                  borderRadius: 10,
                  width: "150px",
                }}
                control={
                  <Switch
                    checked={isActive}
                    onChange={() => handleToggleActive(roleId)}
                    color={isActive ? "success" : "error"}
                  />
                }
                label={isActive ? "Active" : "Inactive"}
                labelPlacement="start"
              />

              {/* Update role */}
              <IconButton onClick={() => handleOpenRoleModal(row.index)}>
                <VisibilityIcon sx={{ color: "#ff8100" }} />
              </IconButton>

              {/* Delete role */}
              <IconButton onClick={() => handleDeleteRole(roleId)}>
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
        Role Management
      </Typography>

      {/* Add Role Button */}
      <Button
        onClick={() => handleOpenRoleModal(null)}
        variant="contained"
        sx={{ bgcolor: "#ff8100", mb: 2 }}
        startIcon={<AddIcon />}
      >
        Add Role
      </Button>

      {/* Role Management Table */}
      <Box width={"100%"}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnResizing
        />
      </Box>

      {/* Role Modal */}
      <RoleModal
        open={openRoleModal}
        handleClose={handleCloseRoleModal}
        roleName={newRoleName}
        setRoleName={setNewRoleName}
        handleSave={handleSaveRole}
        permissions={permissions} // Pass permissions as prop
        setPermissions={setPermissions} // Pass setPermissions function as prop
      />
    </Box>
  );
};

export default Role;
