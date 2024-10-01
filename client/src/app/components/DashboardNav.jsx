"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode"; // Remove the braces

const DashboardNav = ({ toggleSidebar }) => {
  // State for the profile dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredToken, setFilteredToken] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState("");

  const cookie = new Cookies();
  const token = cookie.get("user_token");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if we are in the browser
      setFilteredToken(token || sessionStorage?.getItem("user_token"));
    }
  }, [token]);

  useEffect(() => {
    if (filteredToken) {
      const decodedToken = jwtDecode(filteredToken);
      setEmail(decodedToken?.email);
      setLogo(decodedToken?.logo);
    }
  }, [filteredToken]);

  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            href="/"
            sx={{
              marginLeft: 2,
              color: "orange",
              fontWeight: "bold",
              textDecoration: "none",
              fontFamily: "cursive",
            }}
          >
            2F Pizza
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleDropdown} sx={{ p: 0 }}>
            <Avatar
              alt="User Photo"
              src={logo}
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
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNav;
