import React, { useState, useMemo } from "react";
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

const Role = () => {
  const [data, setData] = useState([
    { roleName: "Kitchen Manager", createdAt: "2024-09-20", active: true },
    { roleName: "Cashier", createdAt: "2024-09-21", active: false },
    { roleName: "Branch Manager", createdAt: "2024-09-22", active: true },
  ]);

  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);

  // Handle open/close modal
  const handleOpenRoleModal = (index) => {
    setSelectedRoleIndex(index);
    setNewRoleName(data[index]?.roleName || "");
    setOpenRoleModal(true);
  };

  const handleCloseRoleModal = () => setOpenRoleModal(false);

  // Handle saving role changes
  const handleSaveRole = (permissions) => {
    const updatedData = [...data];
    if (selectedRoleIndex !== null) {
      updatedData[selectedRoleIndex] = {
        ...updatedData[selectedRoleIndex],
        roleName: newRoleName,
        permissions,
      };
    } else {
      updatedData.push({
        roleName: newRoleName,
        createdAt: new Date().toLocaleDateString(),
        active: true,
        permissions,
      });
    }
    setData(updatedData);
    handleCloseRoleModal();
  };

  // Handle deleting a role
  const handleDeleteRole = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Handle toggle active status
  const handleToggleActive = (index) => {
    const updatedData = [...data];
    updatedData[index].active = !updatedData[index].active;
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
        accessorKey: "roleName",
        header: "Role Name",
        size: 200,
        Cell: ({ cell }) => <Typography>{cell.getValue()}</Typography>,
      },
      {
        accessorKey: "createdAt",
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
          const index = row.index;
          const isActive = data[index].active;
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
                    onChange={() => handleToggleActive(index)}
                    color={isActive ? "success" : "error"}
                  />
                }
                label={isActive ? "Active" : "Inactive"}
                labelPlacement="start"
              />

              {/* Update role */}
              <IconButton onClick={() => handleOpenRoleModal(index)}>
                <VisibilityIcon sx={{ color: "#ff8100" }} />
              </IconButton>

              {/* Delete role */}
              <IconButton onClick={() => handleDeleteRole(index)}>
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
      />
    </Box>
  );
};

export default Role;
