import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

import Link from "next/link";

const Footer = () => {
  return (
    <Box sx={{ mt: 10 }}>
      {/* Main Footer Section */}
      <Box
        sx={{
          backgroundColor: "#ccb691",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px",
        }}
      >
        {/* Left Side Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Link href="/" passHref>
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "#222",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Home
            </Typography>
          </Link>
          <Link href="/order" passHref>
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "#222",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Order
            </Typography>
          </Link>
        </Box>

        {/* Right Side Logo, Feedback Input, and Send Icon */}
        <Box sx={{}}>
          {/* Logo with Pizza Text */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              m: 1,
              gap: 2,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 40,
                width: 40,
              }}
              alt="Footer Image"
              src="/logo.png"
            />
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#af5901",
              }}
            >
              2f-Pizza
            </Typography>
          </Box>

          {/* Feedback Input */}
          <TextField
            variant="outlined"
            placeholder="Your feedback"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              width: "300px", // Set the desired width
              height: "40px", // Set a specific height
              "& .MuiOutlinedInput-root": {
                paddingRight: 0,
                height: "100%", // Ensure the input takes full height
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&:hover fieldset": {
                  border: "none", // Remove the border on hover
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
                "& input": {
                  padding: "10px", // Adjust padding to control height
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <RiSendPlaneFill color="orange" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Copyright Section */}
      <Box
        sx={{
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        {/* Copyright Text */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography sx={{ color: "#fff", fontSize: "0.9rem" }}>
            © 2024 Pizza All Rights Reserved
          </Typography>

          <Typography sx={{ color: "#fff", fontSize: "0.9rem" }}>
            Terms & Conditions
          </Typography>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton sx={{ color: "#fff", background: "#141414" }}>
            <FaFacebookF size={15} />
          </IconButton>
          <IconButton sx={{ color: "#fff", background: "#141414" }}>
            <FaLinkedinIn size={15} />
          </IconButton>
          <IconButton sx={{ color: "#fff", background: "#141414" }}>
            <FaTwitter size={15} />
          </IconButton>
          <IconButton sx={{ color: "#fff", background: "#141414" }}>
            <FaYoutube size={15} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
