"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(anchorEl);
  const cookie = new Cookies();
  const token = cookie.get("user_token");
  const filteredToken = token ? token : sessionStorage?.getItem("user_token");
  const decodedToken = filteredToken ? jwtDecode(filteredToken) : "";
  const email = decodedToken?.email;
  const isAdmin = decodedToken?.isAdmin;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (cookie.get("user_token")) {
      cookie.remove("user_token");
      router.push("/Login");
    } else if (sessionStorage.getItem("user_token")) {
      sessionStorage.removeItem("user_token");
      router.push("/Login");
    }
  };

  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "#333", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "orange", fontFamily: "cursive" }}
          >
            2F Pizza
          </Typography>
        </Box>

        <Tabs textColor="inherit" className="flex gap-16">
          <Tab
            label="Home"
            component={Link}
            href="/"
            sx={{ "&:hover": { color: "orange" } }}
          />
          <Tab
            label="Orders"
            component={Link}
            href="/Orders"
            sx={{ "&:hover": { color: "orange" } }}
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
                  component={Link}
                  href="/Dashboard"
                >
                  Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="warning"
            sx={{ fontWeight: "bold" }}
            component={Link}
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
