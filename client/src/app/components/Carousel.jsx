"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import "../../../CarouselComponent.css"; // Import your CSS file

// Slide content data with different background colors
const slides = [
  {
    id: 1,
    img: "/slide1.png",
    title: "Make your first order and get",
    highlight: "50% off",
    description:
      "Welcome to 2f-pizza, your favorite pizza delivery site! Get fresh, delicious pizza delivered to your doorstep in no time.",
    bgColor: "#2f2f2f",
  },
  {
    id: 2,
    img: "/slide2.png",
    title: "Make your first order and get",
    highlight: "50% off",
    description:
      "Welcome to 2f-pizza, your favorite pizza delivery site! Get fresh, delicious pizza delivered to your doorstep in no time.",
    bgColor: "#50482b",
  },
  {
    id: 3,
    img: "/slide3.png",
    title: "Make your first order and get",
    highlight: "50% off",
    description:
      "Welcome to 2f-pizza, your favorite pizza delivery site! Get fresh, delicious pizza delivered to your doorstep in no time.",
    bgColor: "#296d60",
  },
];

export default function CarouselComponent() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "300px",
                borderRadius: "15px",
                overflow: "hidden",
                backgroundColor: slide.bgColor,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  padding: 2,
                  textAlign: "start",
                  color: "#fff",
                }}
              >
                <Typography sx={{ fontSize: "2rem" }}>
                  {slide.title}{" "}
                  <span style={{ color: "orange" }}>{slide.highlight}</span>
                </Typography>
                <Typography
                  sx={{ fontSize: "0.8rem", my: 2, fontWeight: "lighter" }}
                >
                  {slide.description}
                </Typography>
                <Button
                  component="a"
                  variant="contained"
                  color="warning"
                  sx={{ fontWeight: "bold" }}
                  href="#popularPizzas"
                >
                  Order Now
                </Button>
              </Box>
              <Box
                component="img"
                sx={{
                  flex: 1,
                  maxWidth: "40%",
                  height: "auto",
                  ml: "auto",
                }}
                alt="Header Image"
                src={slide.img}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
