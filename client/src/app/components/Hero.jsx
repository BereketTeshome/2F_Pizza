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
        paddingLeft: { xs: "1px", md: "10px" },
        pb: 10,
        background: "linear-gradient(to bottom, white, #fed2a5, white)", // Gradient background
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ maxWidth: "600px", ml: { xs: 1, sm: 6 } }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            color: "orange",
            fontSize: { xs: "3rem", md: "8rem" },
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
          height: { xs: "45vh", sm: "60vh", md: "85vh" },
          width: "fit-content",
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
