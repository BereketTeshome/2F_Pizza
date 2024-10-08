"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, clearAuthToken } from "../../store/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import Cookies from "universal-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(anchorEl);
  const cookie = new Cookies();

  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email); // Get email from Redux
  const isAdmin = useSelector((state) => state.auth.isAdmin); // Get admin status from Redux

  const router = useRouter(); // useRouter to get current route

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken =
        cookie.get("two_access_token") ||
        sessionStorage.getItem("two_access_token");
      if (userToken) {
        dispatch(setAuthToken(userToken)); // Set the token in Redux
      } else {
        dispatch(clearAuthToken()); // Clear token in Redux if none found
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    cookie.remove("two_access_token");
    sessionStorage.removeItem("two_access_token");
    dispatch(clearAuthToken()); // Clear token from Redux on logout
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "#333", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 3 } }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            style={{ width: "auto", height: "auto" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "orange",
              fontFamily: "cursive",
              display: { xs: "none", sm: "block" },
            }}
          >
            2F Pizza
          </Typography>
        </Box>

        {/* Tabs with dynamic active state */}
        <Tabs textColor="inherit" className="flex gap-16">
          <Tab
            label="Home"
            component={Link}
            href="/"
            sx={{
              "&:hover": { color: "orange" },
              color: router.pathname === "/" ? "orange" : "inherit", // Active link color
            }}
          />
          <Tab
            label="Orders"
            component={Link}
            href="/Orders"
            sx={{
              "&:hover": { color: "orange" },
              color: router.pathname === "/Orders" ? "orange" : "inherit", // Active link color
            }}
          />
        </Tabs>

        {email ? (
          <Box sx={{ position: "relative" }}>
            <Button
              sx={{
                textTransform: "capitalize",
                fontSize: "1.7rem",
                backgroundColor: "#2563EB",
                color: "white",
                borderRadius: "50%",
                width: 70,
                height: 70,
                scale: 0.65,
                ":hover": {
                  backgroundColor: "darkblue",
                },
              }}
              onClick={handleMenuClick}
            >
              {email.charAt(0).toUpperCase()}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={isDropdownOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {isAdmin && (
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  href="/Dashboard"
                >
                  Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout} component="a" href="/Login">
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="warning"
            sx={{ fontWeight: "bold" }}
            component="a"
            href="/Login"
          >
            Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
