"use client";
import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { SlEnergy } from "react-icons/sl";
import Restaurants from "../../store/Restaurants";

export default function TopCarousel() {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: "0 20px",
        gap: 2,
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for WebKit browsers
        },
      }}
    >
      {Restaurants.map((profile) => (
        <Box
          key={profile.id}
          sx={{
            display: "flex",
            borderRadius: "20px",
            p: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#f9f9f9",
            minWidth: { xs: "300px", sm: "350px" }, // Width of each card
            marginRight: "20px",
            flex: "0 0 auto",
          }}
        >
          {/* Left side: Profile Info */}
          <Box sx={{ width: "70%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textAlign: "start",
              }}
            >
              <Avatar
                src={profile.img}
                alt="Profile Picture"
                sx={{ width: 48, height: 48 }}
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {profile.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "gray",
                textAlign: "start",
                mr: 3,
              }}
            >
              {profile.desc}
            </Typography>
          </Box>

          {/* Right side: Order Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#28252714",
              borderRadius: "15px",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            {/* Circle with Zap Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                backgroundColor: "orange",
                borderRadius: "50%",
              }}
            >
              <SlEnergy size={20} color="#fff" />
            </Box>

            {/* Order details */}
            <Box>
              <Typography sx={{ fontSize: "0.7rem", color: "gray" }}>
                Number of Orders
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "orange",
                  fontWeight: "bold",
                  textAlign: "start",
                }}
              >
                {profile.orders}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
