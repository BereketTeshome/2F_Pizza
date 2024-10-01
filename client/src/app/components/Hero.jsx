import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "80vh",
        alignItems: "center",
        paddingLeft: "10px",
        pb: 10,
        background: "linear-gradient(to bottom, white, #fed2a5, white)", // Gradient background
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ maxWidth: "600px", ml: 6 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            color: "orange",
            fontSize: "8rem",
          }}
        >
          Order <span style={{ opacity: 0.5 }}>us</span>
        </Typography>
        <Typography variant="body1" sx={{ my: "26px" }}>
          Welcome to 2f-pizza, your favorite pizza delivery site! Get fresh,
          delicious pizza delivered to your doorstep in no time.
        </Typography>
        <SearchBar />
      </Box>

      <Box
        component="img"
        sx={{
          height: "70%",
          width: "30%",
          position: "relative",
          right: 0,
          top: "1rem",
          ml: "auto",
        }}
        alt="Header Image"
        src="/hero.png"
      />
    </Box>
  );
};

export default Hero;
