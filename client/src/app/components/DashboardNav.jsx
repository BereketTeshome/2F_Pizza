"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DashboardNav = ({ toggleSidebar }) => {
  // State for the profile dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Dashboard", href: "#" },
    { label: "Settings", href: "#" },
    { label: "Earnings", href: "#" },
    { label: "Log out", href: "#" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 1400,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Toggle Sidebar */}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: "#000",
              display: { xs: "inline-flex" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="a"
            href="#"
            sx={{
              marginLeft: 2,
              color: "#000",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            2F Pizza
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleDropdown} sx={{ p: 0 }}>
            <Avatar
              alt="User Photo"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              mt: 2,
              "& .MuiPaper-root": {
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="body1" fontWeight="bold">
                Bereket Teshome
              </Typography>
              <Typography variant="body2" color="text.secondary">
                bereket@gmail.com
              </Typography>
            </Box>
            {menuItems.map((item) => (
              <MenuItem key={item.label} onClick={handleClose}>
                <Button
                  href={item.href}
                  sx={{ width: "100%", textAlign: "left" }}
                >
                  {item.label}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNav;
