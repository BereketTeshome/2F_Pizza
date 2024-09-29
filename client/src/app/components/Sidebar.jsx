"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaRegUserCircle, FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { CiPizza } from "react-icons/ci";
import { changeComponent } from "../../store/ComponentSlice";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Divider,
} from "@mui/material";

const Sidebar = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("orders");

  const sidebarItems = [
    { label: "Orders", icon: <BsBoxSeam />, action: "orders" },
    { label: "Add Menu", icon: <CiPizza />, action: "addMenu" },
    { label: "Role", icon: <FaRegUser />, action: "role" },
    { label: "User", icon: <FaRegUserCircle />, action: "user" },
  ];

  const handleItemClick = (action) => {
    setActiveItem(action);
    dispatch(changeComponent(action)); // dispatch the redux action to change components
  };

  return (
    <Drawer
      variant="persistent"
      open={isSidebarOpen}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Box sx={{ overflow: "auto", marginTop: 8 }}>
        <Box
          sx={{
            background: "#f57f2729",
            py: 4,
          }}
        >
          <Box
            component="img"
            sx={{
              maxWidth: 40,
              height: 40,
              ml: "40%",
            }}
            alt="Dashboard Logo"
            src="/logo.png"
          />
        </Box>
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => handleItemClick(item.action)}
              sx={{
                color: "#000",
                cursor: "pointer",
                position: "relative",
                top: "-10px",
                backgroundColor:
                  activeItem === item.action ? "#ffcc99" : "transparent",
                color: activeItem === item.action ? "#ff8100" : "#333",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "5px", // Adjust to control the gap from top
                  bottom: "5px", // Adjust to control the gap from bottom
                  width: "5px", // Width of the border
                  backgroundColor:
                    activeItem === item.action ? "#ff8100" : "transparent",
                  borderRadius: "10px",
                },
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: "#ff8100", position: "relative", left: "30px" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ width: "100%", mb: 4 }} />
      <Box sx={{ padding: 2 }}>
        <Button
          color="primary"
          startIcon={<FaSignOutAlt />}
          fullWidth
          sx={{
            backgroundColor: "transparent",
            color: "#ff0000",
            "&:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          Log out
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
