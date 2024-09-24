import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "#888", boxShadow: "none" }}
    >
      <Toolbar className="flex justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "orange" }}>
            Pizza
          </Typography>
        </div>

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

        <Button variant="contained" color="warning" sx={{ fontWeight: "bold" }}>
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
