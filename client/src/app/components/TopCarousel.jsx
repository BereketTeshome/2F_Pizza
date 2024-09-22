"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Box, Typography, Avatar } from "@mui/material";
import { SlEnergy } from "react-icons/sl";

// Profile data for the carousel
const profiles = [
  {
    id: 1,
    img: "/profile.png",
    name: "Azmera Pizza",
    desc: "The best restaurant in town, top rated one",
    orders: "2k",
  },
  {
    id: 2,
    img: "/profile.png",
    name: "Azmera Pizza",
    desc: "The best restaurant in town, top rated one",
    orders: "1.5k",
  },
  {
    id: 3,
    img: "/profile.png",
    name: "Azmera Pizza",
    desc: "The best restaurant in town, top rated one",
    orders: "1.2k",
  },
  {
    id: 4,
    img: "/profile.png",
    name: "Azmera Pizza",
    desc: "The best restaurant in town, top rated one",
    orders: "1k",
  },
  {
    id: 5,
    img: "/profile.png",
    name: "Azmera Pizza",
    desc: "The best restaurant in town, top rated one",
    orders: "800",
  },
  {
    id: 6,
    img: "/profile.png",
    name: "Azmera Pizza",
    desc: "The best restaurant in town, top rated one",
    orders: "750",
  },
];

export default function TopCarousel() {
  return (
    <Swiper
      slidesPerView={3} // Reduced the number of visible slides for wider boxes
      centeredSlides={false}
      spaceBetween={40} // Increased space between slides
      grabCursor={true}
      pagination={false} // Disabled pagination bullets
      modules={[Pagination]}
      className="mySwiper"
      style={{
        width: "100%", // Full-width swiper
        padding: "0 20px", // Padding for nicer edges
        borderRadius: "20px",
      }}
    >
      {profiles.map((profile) => (
        <SwiperSlide key={profile.id} style={{ borderRadius: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "20px",
              gap: 1,
              p: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
              width: "100%", // Ensures full width usage
              maxWidth: "380px", // Sets a maximum width for the box
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
                sx={{ fontSize: "0.8rem", color: "gray", textAlign: "start" }}
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
                width: "65%", // Takes up a small percentage of the box
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
                  backgroundColor: "orange", // Light orange color
                  borderRadius: "50%", // Perfect circle
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
                    fontSize: "1.5rem", // Bigger text for orders
                    color: "orange", // Orders count in orange
                    fontWeight: "bold",
                    textAlign: "start",
                  }}
                >
                  {profile.orders}
                </Typography>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
